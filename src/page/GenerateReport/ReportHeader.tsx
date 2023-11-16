'use client';

import React, { useState } from 'react';
import styles from './index.module.scss';
import RadioButton from '../../components/RadioButton';
import YearPicker from '../../components/YearPicker';
import MonthPicker from '../../components/MonthPicker';
import QuarterlyPicker from '@/components/QuaterlyPicker';
import { QuarterlyDateFormatter, monthlyDateFormatter } from './utils';
import { useGenerateReportActions } from '../../actions/GenerateReport';
import { useSetRecoilState } from 'recoil';
import {
    selectedDateAtom,
    selectedGroupAtom,
} from '../../state/generateReport';
import SnackbarComponent from '../../components/Snackbar';
import { ReportPageProps } from '@/interfaces';
import { generateReportAtom } from '../../state/generateReport';

interface disabledProps {
    isYearDisabled: boolean;
    isMonthDisabled: boolean;
    isQuarterDisabled: boolean;
}

export function ReportHeader({
    loading,
    setLoading,
    spinner,
    setSpinner,
}: ReportPageProps) {
    const setReportData = useSetRecoilState(generateReportAtom);
    const setSelectedDate = useSetRecoilState(selectedDateAtom);
    const setReportGroup = useSetRecoilState(selectedGroupAtom);
    const [cbnDate, setCbnDate] = useState<string>('');
    const { handleGenerateReport, postReportDate, postCbnDate } =
        useGenerateReportActions();
    const [selectedGroup, setSelectedGroup] = useState<string>('weekly');
    const [currentMonth, setCurrentMonth] = useState<number | undefined>();
    const [selectedYear, setSelectedYear] = useState<string | undefined>();
    const [selectedQuarter, setSelectedQuarter] = useState<
        string | undefined
    >();
    const [disableFields, setDisabledFields] = useState<disabledProps>({
        isYearDisabled: true,
        isMonthDisabled: true,
        isQuarterDisabled: true,
    });
    //snackbar props
    const [isopen, setIsOpen] = useState(false);
    const [SnackbarMessage, setSnackbarMessage] = useState<string>('');

    const handleClose = () => {
        setIsOpen(false);
    };
    const handleGroupChange = (group: string) => {
        let newDisabledFields: disabledProps;

        switch (group) {
            case 'M':
                newDisabledFields = {
                    isQuarterDisabled: true,
                    isMonthDisabled: false,
                    isYearDisabled: false,
                };
                break;
            case 'Y':
                newDisabledFields = {
                    isQuarterDisabled: true,
                    isMonthDisabled: true,
                    isYearDisabled: true,
                };
                break;
            case 'Q':
                newDisabledFields = {
                    isQuarterDisabled: false,
                    isMonthDisabled: true,
                    isYearDisabled: false,
                };
                break;
            case 'W':
                newDisabledFields = {
                    isQuarterDisabled: true,
                    isMonthDisabled: true,
                    isYearDisabled: true,
                };
                break;
            default:
                newDisabledFields = disableFields;
        }

        setDisabledFields({
            ...disableFields,
            ...newDisabledFields,
        });
        setSelectedGroup(group);
        setReportGroup(group);
        setSelectedYear('');
        setSelectedQuarter('');
        setCurrentMonth(0);
        setReportData([]);
        setCbnDate('');
    };

    //year picker component..................................
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const minYear = 1960;
    const maxYear = currentYear;

    const generateReport = async () => {
        let formattedDate;

        switch (selectedGroup) {
            case 'M':
                if (!selectedYear || currentMonth === 0) {
                    setIsOpen(true);
                    setSnackbarMessage('invalid date selected');
                    return;
                }
                formattedDate = monthlyDateFormatter(
                    selectedYear,
                    currentMonth
                );
                break;

            case 'Q':
                if (!selectedYear || !selectedQuarter) {
                    setIsOpen(true);
                    setSnackbarMessage('invalid date selected');
                    return;
                }
                formattedDate = QuarterlyDateFormatter(
                    selectedYear,
                    selectedQuarter
                );
                break;

            default:
                setSnackbarMessage('Please select a valid date');
                setIsOpen(true);
                return;
        }

        setSelectedDate(formattedDate);

        // Post date to server
        const dateResponse = await postReportDate(formattedDate);

        // Only send CBN date if it's selected
        if (cbnDate) {
            const cbnDateResponse = await postCbnDate(cbnDate);
        }

        const response = await handleGenerateReport(selectedGroup);
        setLoading(false);
    };

    const handleYearChange = (e: any) => {
        setSelectedYear(e.target.value);
    };

    const handleCbnDate = (e: any) => {
        // console.log(e.target.value)
        setCbnDate(e.target.value);
    };

    const handleMonthChange = (newMonth: number) => {
        setCurrentMonth(newMonth);
    };

    const handleQuaterlyChange = (quarter: string) => {
        setSelectedQuarter(quarter);
    };

    return (
        <div className={styles['wrapper']}>
            <SnackbarComponent
                handleClose={handleClose}
                isopen={isopen}
                message={SnackbarMessage}
            />
            <div className={styles['reportGroup']}>
                <div className={styles['title']}>{'Select Report Group'}</div>
                <div className={styles['subReportContainer']}>
                    <RadioButton
                        selectedGroup={selectedGroup}
                        onGroupChange={handleGroupChange}
                    />
                </div>
            </div>
            <div className={styles['selectDate']}>
                <div className={styles['title']}>{'Select Date'}</div>
                <div className={styles['selectDateContainer']}>
                    <div className={styles['date-group']}>
                        <div>YEAR</div>
                        <YearPicker
                            selectedYear={selectedYear}
                            onYearChange={handleYearChange}
                            minYear={minYear}
                            maxYear={maxYear}
                            isDisabled={disableFields.isYearDisabled}
                        />
                    </div>

                    <div className={styles['date-group']}>
                        <div>MONTH</div>
                        <MonthPicker
                            selectedMonth={currentMonth}
                            onMonthChange={handleMonthChange}
                            isDisabled={disableFields?.isMonthDisabled}
                        />
                    </div>

                    <div className={styles['date-group']}>
                        <div>QUARTER</div>
                        <QuarterlyPicker
                            selectedQuarter={selectedQuarter}
                            onQuarterChange={handleQuaterlyChange}
                            isDisabled={disableFields.isQuarterDisabled}
                        />
                    </div>
                </div>
            </div>

            <div className={styles['selectDate']}>
                <p className={styles['title']}>CBN DATE</p>
                <div className={styles['date-group']}>
                    <div>Date(only for Report 100)</div>
                    <input
                        name="cbnDate"
                        type="date"
                        placeholder="select date"
                        value={cbnDate}
                        onChange={handleCbnDate}
                    />
                </div>
            </div>

            <div className={styles['reportButton']}>
                <button onClick={generateReport}>Generate Report</button>
            </div>
        </div>
    );
}

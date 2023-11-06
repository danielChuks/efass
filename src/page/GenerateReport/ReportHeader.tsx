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
import { selectedDateAtom } from '../../state/generateReport';
import SnackbarComponent from '../../components/Snackbar';

interface disabledProps {
    isYearDisabled: boolean;
    isMonthDisabled: boolean;
    isQuarterDisabled: boolean;
}
export function ReportHeader() {
    const setSelectedDate = useSetRecoilState(selectedDateAtom);
    const { handleGenerateReport } = useGenerateReportActions();
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
        if (group === 'M') {
            setDisabledFields({
                ...disableFields,
                isQuarterDisabled: true,
                isMonthDisabled: false,
                isYearDisabled: false,
            });
        } else if (group === 'Y') {
            setDisabledFields({
                ...disableFields,
                isQuarterDisabled: true,
                isMonthDisabled: true,
                isYearDisabled: true,
            });
        } else if (group === 'Q') {
            setDisabledFields({
                ...disableFields,
                isQuarterDisabled: false,
                isMonthDisabled: true,
                isYearDisabled: false,
            });
        } else if (group === 'W') {
            setDisabledFields({
                ...disableFields,
                isQuarterDisabled: true,
                isMonthDisabled: true,
                isYearDisabled: true,
            });
        }
        setSelectedGroup(group);
        //empty state
        setSelectedYear('');
        setSelectedQuarter('');
        setCurrentMonth(0);
        console.log(group);
    };

    //year picker component..................................
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const minYear = 1960;
    const maxYear = currentYear;

    //don't generate report if date is not selected
    // loader for api.calls
    //css
    //find way around the report information/ask faith
    const generateReport = async () => {
        //if group = monthly, format month, if group == QUATERLY, call quarterly formatter
        if (selectedGroup === 'M') {
            if (!selectedYear || currentMonth === 0) {
                setIsOpen(true);
                setSnackbarMessage('invalid date selected');
                return;
            }
            console.log(monthlyDateFormatter(selectedYear, currentMonth));
            setSelectedDate(monthlyDateFormatter(selectedYear, currentMonth));
            const response = await handleGenerateReport(selectedGroup);
            console.log(response);
            return;// use response for report table
        } else if (selectedGroup === 'Q') {
            if (!selectedYear || !selectedQuarter) {
                setIsOpen(true);
                setSnackbarMessage('invalid date selected');
                return;
            }
            console.log(QuarterlyDateFormatter(selectedYear, selectedQuarter));
            setSelectedDate(
                QuarterlyDateFormatter(selectedYear, selectedQuarter)
            );
            const response = await handleGenerateReport(selectedGroup);
            console.log(response);
        }
        setSnackbarMessage('Please select a valid date');
        setIsOpen(true);
    };

    const handleYearChange = (e: any) => {
        setSelectedYear(e.target.value);
        console.log(e.target.value);
    };

    const handleMonthChange = (newMonth: number) => {
        console.log(newMonth);
        setCurrentMonth(newMonth);
    };

    const handleQuaterlyChange = (quarter: string) => {
        console.log(quarter);
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
                    <div>YEAR</div>
                    <YearPicker
                        selectedYear={selectedYear}
                        onYearChange={handleYearChange}
                        minYear={minYear}
                        maxYear={maxYear}
                        isDisabled={disableFields.isYearDisabled}
                    />
                </div>
            </div>

            <div className={styles['reportButton']}>
                <button onClick={generateReport}>Generate Report</button>
            </div>
        </div>
    );
}

'use client';
import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import styles from './index.module.scss';
// import MonthPicker from "../../components/MonthPicker";
import Filter from '../../components/FilterBy';
import { ReportData } from '../../interfaces';
import { FaDownload } from 'react-icons/fa';
import { useGenerateReportActions } from '../../actions/GenerateReport';
import { useRecoilValue } from 'recoil';
import {
    generateReportAtom,
    selectedDateAtom,
} from '../../state/generateReport';
import { PaginatedTable } from '@/components/PaginatedTable';
import { mockData } from '../../components/PaginatedTable/mock';
import { SettingsButton } from '@/components/Button';

export const ContentSection = () => {
    const selectedDate = useRecoilValue(selectedDateAtom);
    const reportHistoryData = useRecoilValue(generateReportAtom);
    const { getReportInformation } = useGenerateReportActions();
    const [loading, setLoading] = useState(true);
    
    const handleReportInformation = async () => {
        const response = await getReportInformation('mdfir101', selectedDate);
        console.log(response);
    };

    useEffect(() => {
        handleReportInformation();

        setTimeout(() => {
            setLoading(false);
        }, 4000);
    }, []);

    return (
        <div className={styles['contentContainer']}>
            <div className={styles['contentTopSection']}>
                <SearchBar />
                <Filter />
                <div className={styles['rightSide']}>
                    <div className={styles['reportButton']}>
                        Download Report
                        <FaDownload />
                    </div>
                </div>
            </div>
            <PaginatedTable<ReportData>
                headers={['Report Details', 'Date Generated', 'Action']}
                data={mockData}
                loading={loading}
                columns={[
                    {
                        render: (data, index) => {
                            return data.bank_name;
                        },
                    },
                    {
                        render: (data, index) => {
                            return data.return_name;
                        },
                        width: '20%',
                    },
                    {
                        render: (data, index) => {
                            return (
                                <div>
                                    <button>View</button>
                                </div>
                            );
                        },
                        width: '10%',
                    },
                ]}
            />
        </div>
    );
};

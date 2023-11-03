'use client';
import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import styles from './index.module.scss';
// import MonthPicker from "../../components/MonthPicker";
import Filter from '../../components/FilterBy';
import { Pagination, Report } from '../../interfaces';
import { FaDownload } from 'react-icons/fa';
import { useGenerateReportActions } from '../../actions/GenerateReport';
import { useRecoilValue } from 'recoil';
import {
    generateReportAtom,
    selectedDateAtom,
} from '../../state/generateReport';
import { PaginatedTable } from '@/components/PaginatedTable';
// import { mockData } from '../../components/PaginatedTable/mock';

export const ContentSection = () => {
    const selectedDate = useRecoilValue(selectedDateAtom);
    const reportHistoryData = useRecoilValue(generateReportAtom);
    const { getReportInformation } = useGenerateReportActions();
    const pagination: Pagination = {
        page: 1,
        numOfItemsPerPage: 5,
        itemCount: reportHistoryData.length,
        pageCount: Math.ceil(reportHistoryData.length / 5),
        hasPreviousPage: false,
        hasNextPage: true,
    };

    const handleReportInformation = async () => {
        const response = await getReportInformation('mdfir101', selectedDate);
        console.log(response);
    };

    console.log('this', reportHistoryData);

    useEffect(() => {
        handleReportInformation();
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
            <PaginatedTable<Report>
                headers={['Report Details', 'Date Generated', 'Action']}
                data={reportHistoryData}
                fetchPage={handleReportInformation}
                pagination={pagination}
                // loading
                columns={[
                    {
                        render: (data, index) => {
                            return data.responseCode;
                        },
                    },
                    {
                        render: (data, index) => {
                            return data.responseMessage;
                        },
                    },
                    {
                        render: (data, index) => {
                            return '...';
                        },
                    },
                ]}
            />
        </div>
    );
};

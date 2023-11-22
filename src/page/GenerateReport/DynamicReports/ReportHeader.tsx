'use client';
import {  useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { generateReportAtom } from '../../../state/generateReport';
import { useRecoilValue } from 'recoil';
import { ReportData } from '../../../interfaces';

export default function ReportHeader() {
    const searchParams = useSearchParams();
    const reportId = searchParams.get('reportId');
    const [reportTitle, setReportTitle] = useState<ReportData>();

    //get list of reports and use find to get the data for the report header
    const getReportTitle = () => {
        const listOfReportsString = sessionStorage.getItem('listOfReports');
        if (listOfReportsString) {
            const listOfReports: ReportData[] = JSON.parse(listOfReportsString);
            if (typeof reportId === 'string') {
                // Find the report with the matching sheet_number
                const result = listOfReports.find(
                    (rp) => rp.sheet_number === reportId.toUpperCase()
                );

                console.log(result);
                setReportTitle(result);
            }
        }
    };

    useEffect(() => {
        getReportTitle();
    }, [reportId]);
    return (
        <div className={styles['reportHeader']}>
            <div className={styles['leftSection']}>
                <div className={styles['bankNameCode']}>
                    <div className={styles['displayTitle']}>Bank Name: </div>
                    <div className={styles['displayText']}>
                        {reportTitle?.bank_name}
                    </div>
                </div>
                <div className={styles['bankNameCode']}>
                    <div className={styles['displayTitle']}>Bank Code: </div>
                    <div className={styles['displayText']}>
                        {reportTitle?.bank_code}
                    </div>
                </div>
            </div>

            <div className={styles['rightSection']}>
                <div className={styles['returnNameCode']}>
                    <div className={styles['displayTitle']}>Return name: </div>
                    <div className={styles['displayText']}>
                        {reportTitle?.return_name}
                    </div>
                </div>
                <div className={styles['returnNameCode']}>
                    <div className={styles['displayTitle']}>Return Code: </div>
                    <div className={styles['displayText']}>
                        {reportTitle?.return_code}
                    </div>
                </div>
            </div>
        </div>
    );
}

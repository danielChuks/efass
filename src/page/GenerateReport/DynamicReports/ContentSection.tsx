'use client';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { useRouter } from 'next/navigation';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { PaginatedTable } from '../../../components/PaginatedTable';
import { useGenerateReportActions } from '../../../actions/GenerateReport';
import { generateReportInformationAtom } from '../../../state/generateReport';
import { useRecoilValue } from 'recoil';
import { FaDownload } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { ReportData } from '../../../interfaces';
import { commaSeparatedColumns } from '../utils';
import { formatValueIfNumber } from '../../../utils';

export default function ContentSection() {
    const searchParams = useSearchParams();
    const selectedDate = searchParams.get('selectedDate');
    const reportId = searchParams.get('reportId');
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const { getReportInformation } = useGenerateReportActions();
    const reportInformation = useRecoilValue(generateReportInformationAtom);
    // console.log(reportInformation);

    const handleReportInformation = async () => {
        if (typeof reportId === 'string') {
            const response = await getReportInformation(
                reportId.toLowerCase(),
                selectedDate || ''
            );
            setLoading(false);
        } else {
        }
    };

    const downloadExcelReports = () => {
        const ws = XLSX.utils.json_to_sheet(reportInformation);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
        const blob = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blobData = new Blob([blob], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        saveAs(blobData, reportId?.toString());
    };

    const maxPropsIndex = reportInformation.reduce(
        (maxIndex: any, currentObj: any, currentIndex: any, arr: any) => {
            if (
                Object.keys(currentObj).length >
                Object.keys(arr[maxIndex]).length
            ) {
                return currentIndex;
            } else {
                return maxIndex;
            }
        },
        0
    );

    // console.log(maxPropsIndex);

    useEffect(() => {
        handleReportInformation();
    }, [reportId]);

    return (
        <div className={styles['contentContainer']}>
            <div className={styles['contentTopSection']}>
                <div className={styles['rightSide']}>
                    <div
                        onClick={downloadExcelReports}
                        className={styles['reportButton']}
                    >
                        Download Report
                        <FaDownload />
                    </div>
                    <div
                        className={styles['reportButton']}
                        onClick={router.back}
                    >
                        <AiOutlineArrowLeft
                            size={20}
                            className={styles['back']}
                        />
                        Go Back
                    </div>
                </div>
            </div>

            <div>
                {reportInformation && reportInformation.length > 0 && (
                    <PaginatedTable<any>
                        key={reportId} //update table component if the key changes
                        headers={Object.keys(reportInformation[maxPropsIndex])
                            .filter((val) => val !== 'id')
                            .map((key) => key.replace(/_/g, ' '))}
                        data={reportInformation}
                        loading={loading}
                        columns={Object.keys(reportInformation[maxPropsIndex])
                            .filter((val) => val !== 'id')
                            .map((key) => ({
                                render: (data) => {
                                    const value = (data as any)[key];
                                    const formattedValue =
                                        key.toLowerCase().includes('date') ||
                                        key.toLowerCase() === 'code' ||
                                        key.toLowerCase() === 'customer_code' ||
                                        key.toLowerCase() === 'account_number'
                                        key.toLowerCase() ===
                                            'account_number' ||
                                        key.toLowerCase() === 'cbn_approval'
                                            ? value
                                            : formatValueIfNumber(value);
                                    return formattedValue;
                                },
                                width: '20%',
                            }))}
                    />
                )}
            </div>
        </div>
    );
}

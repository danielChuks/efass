'use client';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import SearchBar from '../../../components/SearchBar';
import Filter from '../../../components/FilterBy';
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
    console.log(reportInformation);

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

    useEffect(() => {
        handleReportInformation();
    }, []);

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
                {reportInformation.length > 0 ? (
                    <PaginatedTable<any>
                        headers={Object.keys(
                            reportInformation[1] || reportInformation[0]
                        ).filter((val) => val !== 'id')}
                        data={reportInformation}
                        loading={loading}
                        columns={Object.keys(
                            reportInformation[1] || reportInformation[0]
                        )
                            .filter((val) => val !== 'id')
                            .map((key) => ({
                                render: (data) => {
                                    const value = (data as any)[key];
                                    const formattedValue =
                                        key.toLowerCase() === 'code'
                                            ? value
                                            : formatValueIfNumber(value);
                                    return formattedValue;
                                },
                                width: '20%',
                            }))}
                    />
                ) : null}
            </div>
        </div>
    );
}

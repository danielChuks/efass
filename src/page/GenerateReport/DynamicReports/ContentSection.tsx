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
export default function ContentSection() {
    // const { reportId } = useParams();
    const searchParams = useSearchParams();
    const selectedDate = searchParams.get('selectedDate');
    const reportId = searchParams.get('reportId');
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const { getReportInformation } = useGenerateReportActions();
    const reportInformation = useRecoilValue(generateReportInformationAtom);

    const handleReportInformation = async () => {
        console.log('checking', reportInformation);
        if (typeof reportId === 'string') {
            const response = await getReportInformation(
                reportId.toLowerCase(),
                selectedDate || ''
            );
            setLoading(false);
        } else {
            // Handle the case where reportId is not a string
        }
    };

    const downloadExcelReports = () => {
        const ws = XLSX.utils.json_to_sheet(reportInformation);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
        const blob = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        // Converted the array to a blob
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
                <SearchBar />
                {/* <Filter options={[]} /> */}
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
                                render: (data, index) => {
                                    return (data as any)[key];
                                },
                                width: '20%',
                            }))}
                    />
                ) : null}
            </div>
        </div>
    );
}


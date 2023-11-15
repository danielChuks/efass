'use client';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import SearchBar from '../../../components/SearchBar';
import Filter from '../../../components/FilterBy';
import { useRouter } from 'next/navigation';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { PaginatedTable } from '../../../components/PaginatedTable';
import { ReportData } from '../../../interfaces';
import { mockData } from '../../../components/PaginatedTable/mock';
import { useGenerateReportActions } from '../../../actions/GenerateReport';
import { generateReportInformationAtom } from '../../../state/generateReport';
import { useRecoilValue } from 'recoil';

export default function ContentSection() {
    const { ['report-id']: reportId } = useParams();
    const searchParams = useSearchParams();
    const selectedDate = searchParams.get('selectedDate');
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
            // Handle the case where reportId is not a string
        }
    };

    useEffect(() => {
        handleReportInformation();
    }, [reportId]);

    // console.log(reportInformation);

    return (
        <div className={styles['contentContainer']}>
            <div className={styles['contentTopSection']}>
                <SearchBar />
                <Filter options={[]} />
                <div className={styles['rightSide']}>
                    <div
                        className={styles['reportButton']}
                        onClick={router.back}
                    >
                        <AiOutlineArrowLeft
                            size={24}
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
                                width: '10%',
                            }))}
                    />
                ) : null}
            </div>
        </div>
    );
}

'use client';
import * as React from 'react';
import BaseLayout from '../../components/BaseLayout';
import styles from './index.module.scss';
import SearchBar from '../../components/SearchBar';
import { DASHBOARD_PAGES } from '../../enums';
import Filter from '../../components/FilterBy';
import { useEffect, useState } from 'react';
import { useReportHistoryActions } from '../../actions/history';
import { useRecoilValue } from 'recoil';
import { reportHistoryAtom } from '../../state/reportHistory';
import { PaginatedTable } from '@/components/PaginatedTable';
import { ReportHistory } from '@/interfaces';
import Card from '../../components/Card/index';
import date from '../../../public/Images/case.png';
import lastActivity from '../../../public/Images/calender.png';
import userAdded from '../../../public/Images/person.png';
import Image from 'next/image';
import { options } from '../../components/FilterBy/dommy';
import { LoadingScreen } from '../../components/LoadingScreen';
import PageContent from '../../components/PageContent';

export const HomePage = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const { handlereportHistory } = useReportHistoryActions();
    const reportHistory = useRecoilValue(reportHistoryAtom);
    const [loading, setLoading] = useState(true);

    const formattedCurrentDate = currentDate.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    useEffect(() => {
        const fetchCurrentDate = () => {
            const now = new Date();
            setCurrentDate(now);
        };

        fetchCurrentDate();
        fetchData();
    }, []);

    const openDeleteModal = (data: ReportHistory) => {};

    const fetchData = async () => {
        try {
            await handlereportHistory();
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? (
                <LoadingScreen />
            ) : (
                <BaseLayout page={DASHBOARD_PAGES.HOME}>
                    <div className={styles.header}>DASHBOARD (Overview)</div>
                    <div className={styles['card-body']}>
                        <Card
                            title={'USER'}
                            content={'0'}
                            image={
                                <Image
                                    src={userAdded}
                                    alt=""
                                    width={30}
                                    height={25}
                                />
                            }
                        />
                        <Card
                            title={'LAST ACTIVITY DATE'}
                            content={'0'}
                            image={
                                <Image
                                    src={date}
                                    alt=""
                                    width={30}
                                    height={25}
                                />
                            }
                        />
                        <Card
                            title={'CURRENT DATE'}
                            content={formattedCurrentDate}
                            image={
                                <Image
                                    src={lastActivity}
                                    alt=""
                                    width={30}
                                    height={25}
                                />
                            }
                        />
                        <Card
                            title={'USER CREATED'}
                            content={'0'}
                            image={
                                <Image
                                    src={userAdded}
                                    alt=""
                                    width={30}
                                    height={25}
                                />
                            }
                        />
                    </div>
                    <div className={styles['table_container']}>
                        <div className="table_header">
                            <div className={styles['title']}>Recent Activity</div>
                        </div>
                        <PageContent>
                            <PaginatedTable<ReportHistory>
                                headers={[
                                    'REPORT DETAILS',
                                    'DATE GENERATED',
                                    'ACTION',
                                ]}
                                data={reportHistory}
                                loading={loading}
                                columns={[
                                    {
                                        render: (data, index) => {
                                            return data.reportDescription;
                                        },
                                        width: '50%',
                                    },
                                    {
                                        render: (data, index) => {
                                            return data.dateDescription;
                                        },
                                        width: '50%',
                                    },
                                    {
                                        render: (data, index) => {
                                            return (
                                                <div
                                                    className={
                                                        styles['viewButton']
                                                    }
                                                    onClick={() => {
                                                        openDeleteModal(data);
                                                    }}
                                                >
                                                    ...
                                                </div>
                                            );
                                        },
                                        width: '10%',
                                    },
                                ]}
                            />
                        </PageContent>
                    </div>
                </BaseLayout>
            )}
        </>
    );
};

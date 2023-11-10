'use client';
import React from 'react';
import styles from './index.module.scss';
import ReportHeader from './ReportHeader';
import ContentSection from './ContentSection';
import BaseLayout from '../../../components/BaseLayout';
import { DASHBOARD_PAGES } from '../../../enums';
import { useRouter} from 'next/navigation';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { getCurrentDateAndTime } from '../utils';

export function DynamicReports() {
    const router = useRouter();
    return (
        <BaseLayout page={DASHBOARD_PAGES.GENERATE_REPORT}>
            <div>
                <div className={styles['topItems']}>
                    <div className={styles['arrowContainer']}>
                        <AiOutlineArrowLeft
                            size={24}
                            onClick={router.back}
                            className={styles['back']}
                        />
                        Report Details
                    </div>
                    <div className={styles['date']}>
                        <div className={styles['currentDate']}>
                            Current Date:
                        </div>
                        <div className={styles['currentDateValue']}>
                            {getCurrentDateAndTime()}
                        </div>
                    </div>
                </div>
                <ReportHeader />
                <ContentSection />
            </div>
        </BaseLayout>
    );
}

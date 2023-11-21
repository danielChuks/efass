'use client';

import React, { useState } from 'react';
import BaseLayout from '../../components/BaseLayout/index';
import styles from './index.module.scss';
import { DASHBOARD_PAGES } from '../../enums';
import { ReportHeader } from './ReportHeader';
import { ContentSection } from './ContentSection';
import { getCurrentDateAndTime } from './utils';
import { LoadingScreen } from '../../components/LoadingScreen';

export const GenerateReport = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [spinner, setSpinner] = useState<boolean>(false);
    return (
        <>
            {loading ? (
                <LoadingScreen />
            ) : (
                <BaseLayout page={DASHBOARD_PAGES.GENERATE_REPORT}>
                    <div className={styles['topNav']}>
                        <div>Generate Report</div>
                        <div className={styles['timeContainer']}>
                            {/* <div>Current Date:</div> */}
                            <div>{getCurrentDateAndTime()}</div>
                        </div>
                    </div>
                    <ReportHeader
                        spinner={spinner}
                        setSpinner={setSpinner}
                        loading={loading}
                        setLoading={setLoading}
                    />
                    <ContentSection
                        spinner={spinner}
                        setSpinner={setSpinner}
                        loading={loading}
                        setLoading={setLoading}
                    />
                </BaseLayout>
            )}
        </>
    );
};

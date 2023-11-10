"use client";

import React, { useState } from 'react';
import BaseLayout from "../../components/BaseLayout/index";
import styles from "./index.module.scss";
import { DASHBOARD_PAGES } from "../../enums";
import { ReportHeader } from "./ReportHeader";
import { ContentSection } from "./ContentSection";
import { getCurrentDateAndTime } from './utils';

interface GenerateReportProps {
    date: string;
}
export const GenerateReport = () => {
    const [loading, setLoading] = useState<boolean>(true);
    return (
        <BaseLayout page={DASHBOARD_PAGES.GENERATE_REPORT}>
            <div className={styles['topNav']}>
                <div>Generate Report</div>
                <div className={styles['timeContainer']}>
                    <div>Current Date:</div>
                    <div>{getCurrentDateAndTime()}</div>
                </div>
            </div>
            <ReportHeader loading={loading} setLoading={setLoading} />
            <ContentSection loading={loading} setLoading={setLoading} />
        </BaseLayout>
    );
};

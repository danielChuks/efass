"use client";

import BaseLayout from "../../components/BaseLayout/index";
import styles from "./index.module.scss";
import { DASHBOARD_PAGES } from "../../enums";
import { ReportHeader } from "./ReportHeader";
import { ContentSection } from "./ContentSection";

interface GenerateReportProps {
    date: string;
}
export const GenerateReport = () => {
    // const date = new Date().toLocaleString();
    return (
        <BaseLayout page={DASHBOARD_PAGES.GENERATE_REPORT}>
            <div className={styles["topNav"]}>
                <div>Generate Report (Overview)</div>
                <div className={styles["timeContainer"]}>
                    <div>Current Date:</div>
                    <div>{"20/10/2023"}</div>
                </div>
            </div>
            <ReportHeader />
            <ContentSection />
        </BaseLayout>
    );
};

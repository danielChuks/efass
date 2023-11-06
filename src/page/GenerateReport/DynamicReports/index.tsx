import React from "react";
import styles from "./index.module.scss";
import ReportHeader from "./ReportHeader";
import ContentSection from "./ContentSection";

export function DynamicReports() {
    return (
        <div className={styles["wrapper"]}>
            <ReportHeader />
            <ContentSection />
        </div>
    );
}

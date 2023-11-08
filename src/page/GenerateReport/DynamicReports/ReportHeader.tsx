import React from "react";
import styles from "./index.module.scss";

export default function ReportHeader() {
    return (
        <div className={styles["reportHeader"]}>
            <div className={styles["leftSection"]}>
                <div className={styles["bankNameCode"]}>
                    <div className={styles["displayTitle"]}>Bank Name: </div>
                    <div className={styles["displayText"]}>{"union Bank "}</div>
                </div>
                <div className={styles["bankNameCode"]}>
                    <div className={styles["displayTitle"]}>Bank Code: </div>
                    <div className={styles["displayText"]}>{"00000"}</div>
                </div>
            </div>

            <div className={styles["rightSection"]}>
                <div className={styles["returnNameCode"]}>
                    <div className={styles["displayTitle"]}>Return name: </div>
                    <div className={styles["displayText"]}>{"union Bank "}</div>
                </div>
                <div className={styles["returnNameCode"]}>
                    <div className={styles["displayTitle"]}>Return Code: </div>
                    <div className={styles["displayText"]}>{"00000"}</div>
                </div>
            </div>
        </div>
    );
}

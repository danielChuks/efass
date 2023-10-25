"use client";

import React, { useState } from "react";
import styles from "./index.module.scss";
import RadioButton from "../../components/RadioButton";
import YearPicker from "../../components/YearPicker";
import MonthPicker from "../../components/MonthPicker";
export function ReportHeader() {
    const [selectedGroup, setSelectedGroup] = useState<string>("weekly");
    const [currentMonth, setCurrentMonth] = useState<number | undefined>();
    const [selectedYear, setSelectedYear] = useState<string | undefined>();

    const handleGroupChange = (group: string) => {
        setSelectedGroup(group);
    };

    //year picker component...................................
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const minYear = 2010;
    const maxYear = currentYear;

    const handleYearChange = (e: any) => {
        setSelectedYear(e.target.value);
    };

    const handleMonthChange = (newMonth: number) => {
        setCurrentMonth(newMonth);
    };

    return (
        <div className={styles["contianier"]}>
            <div className={styles["wrapper"]}>
                <div className={styles["reportGroup"]}>
                    <div className={styles["title"]}>
                        {"Select Report Group"}
                    </div>

                    <div className={styles["subReportContainer"]}>
                        <RadioButton
                            selectedGroup={selectedGroup}
                            onGroupChange={handleGroupChange}
                        />
                        <div className={styles["borderLine"]}></div>
                    </div>
                </div>
                <div className={styles["selectDate"]}>
                    <div className={styles["title"]}>{"Select Date"}</div>

                    <div className={styles["selectDateContainer"]}>
                        <YearPicker
                            selectedYear={selectedYear}
                            onYearChange={handleYearChange}
                            minYear={minYear}
                            maxYear={maxYear}
                        />
                        <MonthPicker
                            selectedMonth={currentMonth}
                            onMonthChange={handleMonthChange}
                        />
                        <YearPicker
                            selectedYear={selectedYear}
                            onYearChange={handleYearChange}
                            minYear={minYear}
                            maxYear={maxYear}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

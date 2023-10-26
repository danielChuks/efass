import React from "react";
import styles from "./index.module.scss";

interface YearPickerProps {
    selectedYear: string | undefined;
    onYearChange: any;
    minYear: number;
    maxYear: number;
}

const YearPicker = ({
    selectedYear,
    onYearChange,
    minYear,
    maxYear,
}: YearPickerProps) => {
    const years = [];

    for (let year: number = maxYear; year >= minYear; year--) {
        years.push(year);
    }

    return (
        <div className={styles["select-container"]}>
            <select value={selectedYear} onChange={onYearChange}>
                {years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default YearPicker;

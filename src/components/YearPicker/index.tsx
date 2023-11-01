import React from "react";
import styles from "./index.module.scss";

interface YearPickerProps {
    selectedYear: string | undefined;
    onYearChange: any;
    minYear: number;
    maxYear: number;
    isDisabled?:boolean;
}

const YearPicker = ({
    selectedYear,
    onYearChange,
    minYear,
    maxYear,
    isDisabled
}: YearPickerProps) => {
    const years = [];

    for (let year: number = maxYear; year >= minYear; year--) {
        years.push(year);
    }

    return (
        <div className={styles["select-container"]}>
            <select disabled={isDisabled} value={selectedYear} onChange={onYearChange}>
            <option value=''>select</option>
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

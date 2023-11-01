import React from "react";
import styles from "./index.module.scss";

interface MonthPickerProps {
    selectedMonth: number | undefined;
    onMonthChange: (month: number) => void;
    isDisabled?:boolean;
}

const MonthPicker: React.FC<MonthPickerProps> = ({
    selectedMonth,
    onMonthChange,
    isDisabled,
}) => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    return (
        <div className={styles["select-container"]}>
            <select
                id='month'
                name='month'
                value={selectedMonth}
                onChange={(e) => onMonthChange(Number(e.target.value))}
                disabled={isDisabled}
            >
                <option value=''>select</option>
                {months.map((month, index) => (
                    <option key={index} value={index + 1}>
                        {month}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default MonthPicker;

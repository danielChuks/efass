import React from "react";
import styles from "./index.module.scss";

interface RadioButtonProps {
    selectedGroup: string;
    onGroupChange: (value: string ) => void;
}



export default function RadioButton({selectedGroup, onGroupChange}: RadioButtonProps) {

    const handleGroupChange = (e: any) => {
        onGroupChange(e.target.value)
    }

    
    return (
        <div className={styles["reportItemContainer"]}>
            <label className={styles["weekly"]}>
                <input
                    type='radio'
                    name='reportGroup'
                    value='weekly'
                    checked={selectedGroup === "weekly"}
                    onChange={handleGroupChange}
                />
                Weekly
            </label>
            <label className={styles["monthly"]}>
                <input
                    type='radio'
                    name='reportGroup'
                    value='monthly'
                    checked={selectedGroup === "monthly"}
                    onChange={handleGroupChange}
                />
                Monthly
            </label>
            <label className={styles["quarterly"]}>
                <input
                    type='radio'
                    name='reportGroup'
                    value='quarterly'
                    checked={selectedGroup === "quarterly"}
                    onChange={handleGroupChange}
                />
                Quarterly
            </label>
            <label className={styles["yearly"]}>
                <input
                    type='radio'
                    name='reportGroup'
                    value='yearly'
                    checked={selectedGroup === "yearly"}
                    onChange={handleGroupChange}
                />
                Yearly
            </label>
        </div>
    );
}

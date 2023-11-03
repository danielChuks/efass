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
                    value='W'
                    checked={selectedGroup === "W"}
                    onChange={handleGroupChange}
                />
                Weekly
            </label>
            <label className={styles["monthly"]}>
                <input
                    type='radio'
                    name='reportGroup'
                    value='M'
                    checked={selectedGroup === "M"}
                    onChange={handleGroupChange}
                />
                Monthly
            </label>
            <label className={styles["quarterly"]}>
                <input
                    type='radio'
                    name='reportGroup'
                    value='Q'
                    checked={selectedGroup === "Q"}
                    onChange={handleGroupChange}
                />
                Quarterly
            </label>
            <label className={styles["yearly"]}>
                <input
                    type='radio'
                    name='reportGroup'
                    value='Y'
                    checked={selectedGroup === "Y"}
                    onChange={handleGroupChange}
                />
                Yearly
            </label>
        </div>
    );
}

//to-do efass
// login loader
// data fetching loader
// home and user mgt

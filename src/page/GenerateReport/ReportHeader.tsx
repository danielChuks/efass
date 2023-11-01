"use client";

import React, { useState } from "react";
import styles from "./index.module.scss";
import RadioButton from "../../components/RadioButton";
import YearPicker from "../../components/YearPicker";
import MonthPicker from "../../components/MonthPicker";
import QuarterlyPicker from "@/components/QuaterlyPicker";
export function ReportHeader() {
    // return this.http.get(`${environment.baseApi}/tableList/${this.reportGroup}`)
	const [selectedGroup, setSelectedGroup] = useState<string>("weekly");
	const [currentMonth, setCurrentMonth] = useState<number | undefined>();
	const [selectedYear, setSelectedYear] = useState<string | undefined>();
	const [selectedQuarter, setSelectedQuarter] = useState<string | undefined>();
	//create interface
	const [disableFields, setDisabledFields] = useState({
		isYearDisabled: true,
		isMonthDisabled: true,
		isQuarterDisabled: true,
	});

	const handleGroupChange = (group: string) => {
		if (group === "M") {
			setDisabledFields({
				...disableFields,
				isQuarterDisabled: true,
				isMonthDisabled: false,
				isYearDisabled: false,
			});
		} else if (group === "Y") {
			setDisabledFields({
				...disableFields,
				isQuarterDisabled: true,
				isMonthDisabled: true,
				isYearDisabled: true,
			});
		} else if (group === "Q") {
			setDisabledFields({
				...disableFields,
				isQuarterDisabled: false,
				isMonthDisabled: true,
				isYearDisabled: false,
			});
		} else if (group === "W") {
			setDisabledFields({
				...disableFields,
				isQuarterDisabled: true,
				isMonthDisabled: true,
				isYearDisabled: true,
			});
		}
		setSelectedGroup(group);
		console.log(group);
	};

	//year picker component..................................
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const minYear = 1960;
	const maxYear = currentYear;

	const handleYearChange = (e: any) => {
		setSelectedYear(e.target.value);
		console.log(e.target.value);
	};

	const handleMonthChange = (newMonth: number) => {
		console.log(newMonth);
		setCurrentMonth(newMonth);
	};

	const handleQuaterlyChange = (quarter: string) => {
		console.log(quarter);
		setSelectedQuarter(quarter);
	};

	const generateReport = () => {
		console.log("generate");
	};

	return (
		<div className={styles["contianier"]}>
			<div className={styles["wrapper"]}>
				<div className={styles["reportGroup"]}>
					<div className={styles["title"]}>{"Select Report Group"}</div>

					<div className={styles["subReportContainer"]}>
						<RadioButton
							selectedGroup={selectedGroup}
							onGroupChange={handleGroupChange}
						/>
						{/* <div className={styles["borderLine"]}></div> */}
					</div>
				</div>
				<div className={styles["selectDate"]}>
					<div className={styles["title"]}>{"Select Date"}</div>
					<div className={styles["selectDateContainer"]}>
						<div className={styles["date-group"]}>
							<div>YEAR</div>
							<YearPicker
								selectedYear={selectedYear}
								onYearChange={handleYearChange}
								minYear={minYear}
								maxYear={maxYear}
								isDisabled={disableFields.isYearDisabled}
							/>
						</div>

						<div className={styles["date-group"]}>
							<div>MONTH</div>
							<MonthPicker
								selectedMonth={currentMonth}
								onMonthChange={handleMonthChange}
								isDisabled={disableFields?.isMonthDisabled}
							/>
						</div>

						<div className={styles["date-group"]}>
							<div>QUARTER</div>
							<QuarterlyPicker
								selectedQuarter={selectedQuarter}
								onQuarterChange={handleQuaterlyChange}
								isDisabled={disableFields.isQuarterDisabled}
							/>
						</div>
					</div>
				</div>

				<div className={styles["selectDate"]}>
					<p className={styles["title"]}>CBN DATE</p>
					<div className={styles["date-group"]}>
						<div>YEAR</div>
						<YearPicker
							selectedYear={selectedYear}
							onYearChange={handleYearChange}
							minYear={minYear}
							maxYear={maxYear}
							isDisabled={disableFields.isYearDisabled}
						/>
					</div>
				</div>

				<div className={styles["reportButton"]}>
					<button onClick={generateReport}>Generate Report</button>
				</div>
			</div>
		</div>
	);
}

import React from "react";
import styles from "./index.module.scss";

interface QuarterlyPickerProps {
	selectedQuarter: string | undefined;
	onQuarterChange: (quarter:string) => void;
	isDisabled?:boolean;
}

const QuarterlyPicker = ({
	selectedQuarter,
	onQuarterChange,
	isDisabled
}: QuarterlyPickerProps) => {
	const quarters = [
		"Q1(Jan-Mar)",
		"Q2(April-June)",
		"Q3(July-Sept)",
		"Q4(Oct-Dec)",
	];

	return (
		<div className={styles["select-container"]}>
			<select
				id='quarter'
				name='quarter'
				value={selectedQuarter}
				onChange={(e) => onQuarterChange(e.target.value)}
				disabled={isDisabled}
			>
				<option value=''>select</option>
				{quarters.map((quarter) => (
					<option key={quarter} value={quarter}>
						{quarter}
					</option>
				))}
			</select>
		</div>
	);
};

export default QuarterlyPicker;

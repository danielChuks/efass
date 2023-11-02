import React from 'react';
import styles from './index.module.scss';

interface QuarterlyPickerProps {
    selectedQuarter: string | undefined;
    onQuarterChange: (quarter: string) => void;
    isDisabled?: boolean;
}

interface quarters {
    name: string;
    value: string;
}

const QuarterlyPicker = ({
    selectedQuarter,
    onQuarterChange,
    isDisabled,
}: QuarterlyPickerProps) => {
    const quarters: quarters[] = [
        { name: 'Q1(Jan-Mar)', value: '01-01' },
        { name: 'Q2(April-June)', value: '04-01' },
        { name: 'Q3(July-Sept)', value: '07-01' },
        { name: 'Q4(Oct-Dec)', value: '10-01' },
    ];

    return (
        <div className={styles['select-container']}>
            <select
                id="quarter"
                name="quarter"
                value={selectedQuarter}
                onChange={(e) => onQuarterChange(e.target.value)}
                disabled={isDisabled}
            >
                <option value="">select</option>
                {quarters.map((quarter) => (
                    <option key={quarter.value} value={quarter.value}>
                        {quarter.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default QuarterlyPicker;

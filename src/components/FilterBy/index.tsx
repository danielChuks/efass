'use client';

import React, { useState } from 'react';
import styles from './index.module.scss';

interface FilterOption {
    value: string;
    label: string;
}

interface FilterProps {
    options: FilterOption[];
    defaultOption?: string;
    onSelect?: (selectedValue: string) => void;
}

export default function Filter({
    options,
    defaultOption = '',
    onSelect,
}: FilterProps) {
    const [selectedValue, setSelectedValue] = useState(defaultOption);

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setSelectedValue(selectedValue);

        if (onSelect) {
            onSelect(selectedValue);
        }
    };

    return (
        <div className={styles['selectContainer']}>
            <label>Filter by</label>
            <select value={selectedValue} onChange={handleSelect}>
                {options?.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

'use client';
import React, { useState } from 'react';
import PaginationTable from '../../components/PaginationTable';
import { data } from './data';
import { Pagination } from '../../interfaces';
import SearchBar from '../../components/SearchBar';
import styles from './index.module.scss';
import MonthPicker from '../../components/MonthPicker';

export const ContentSection = () => {
    const pagination: Pagination = {
        page: 1,
        numOfItemsPerPage: 5,
        itemCount: data.length,
        pageCount: Math.ceil(data.length / 10),
        hasPreviousPage: false,
        hasNextPage: true,
    };

    return (
        <div className={styles['contentContainer']}>
            <div className={styles['contentTopSection']}>
                <SearchBar />
                <div className={styles['selectContainer']}>
                    <label>Filter by</label>
                    <select>
                        <option value="">Most recent</option>
                    </select>
                </div>
            </div>
            <PaginationTable pagination={pagination} reports={data} />
        </div>
    );
};

"use client";
import React, { useState } from "react";
import PaginationTable from "../../components/PaginationTable";
import { data } from "./data";
import { Pagination } from "../../interfaces";
import SearchBar from "../../components/SearchBar";
import styles from "./index.module.scss";
import MonthPicker from "../../components/MonthPicker";
import Filter from "../../components/FilterBy";
import { Report } from "../../interfaces";

export const ContentSection = () => {
    const pagination: Pagination = {
        page: 1,
        numOfItemsPerPage: 5,
        itemCount: data.length,
        pageCount: Math.ceil(data.length / 10),
        hasPreviousPage: false,
        hasNextPage: true,
    };

    const handleRowClick = (report: Report) => {
        console.log(report);
    };

    return (
        <div className={styles["contentContainer"]}>
            <div className={styles["contentTopSection"]}>
                <SearchBar />
                <Filter />
            </div>
            <PaginationTable
                pagination={pagination}
                reports={data}
                onRowClick={handleRowClick}
            />
        </div>
    );
};

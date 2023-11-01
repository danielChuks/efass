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
import { FaDownload } from "react-icons/fa";

export const ContentSection = () => {
    const pagination: Pagination = {
        page: 1,
        numOfItemsPerPage: 5,
        itemCount: data.length,
        pageCount: Math.ceil(data.length / 5),
        hasPreviousPage: true,
        hasNextPage: true,
    };

    const handleRowClick = (report: Report) => {
        console.log(report);
    };

    const generateReport = () => {};

    return (
        <div className={styles["contentContainer"]}>
            <div className={styles["contentTopSection"]}>
                <SearchBar />
                <Filter />
                <div className={styles["rightSide"]}>
                    <div
                        className={styles["reportButton"]}
                        onClick={generateReport}
                    >
                        Download Report
                        <FaDownload />
                    </div>
                </div>
            </div>
            <PaginationTable
                pagination={pagination}
                reports={data}
                onRowClick={handleRowClick}
            />
        </div>
    );
};

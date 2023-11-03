"use client";
import React, { useState } from "react";
import { data } from "./data";
import SearchBar from "../../components/SearchBar";
import styles from "./index.module.scss";
// import MonthPicker from "../../components/MonthPicker";
import Filter from "../../components/FilterBy";
import { Pagination, Report } from "../../interfaces";
import { FaDownload } from "react-icons/fa";
import { useGenerateReportActions } from "../../actions/GenerateReport";
import { useRecoilValue } from "recoil";
import { selectedDateAtom } from "../../state/generateReport";
import { PaginatedTable } from "@/components/PaginatedTable";
import { mockData } from "../../components/PaginatedTable/mock";

export const ContentSection = () => {
    const selectedDate = useRecoilValue(selectedDateAtom);
    const { getReportInformation } = useGenerateReportActions();
    const pagination: Pagination = {
        page: 1,
        numOfItemsPerPage: 5,
        itemCount: data.length,
        pageCount: Math.ceil(data.length / 5),
        hasPreviousPage: false,
        hasNextPage: true,
    };

    const handleReportInformation = async () => {
        const response = await getReportInformation("mdfir101", selectedDate);
        console.log(response);
    };

    return (
        <div className={styles["contentContainer"]}>
            <div className={styles["contentTopSection"]}>
                <SearchBar />
                <Filter />
                <div className={styles["rightSide"]}>
                    <div className={styles["reportButton"]}>
                        Download Report
                        <FaDownload />
                    </div>
                </div>
            </div>
            <PaginatedTable<Report>
                headers={["Report Details", "Date Generated", "Action"]}
                data={data}
                fetchPage={handleReportInformation}
                pagination={pagination}
                // loading
                columns={[
                    {
                        render: (data, index) => {
                            return data.responseCode;
                        },
                    },
                    {
                        render: (data, index) => {
                            return data.responseMessage;
                        },
                    },
                    {
                        render: (data, index) => {
                            return "...";
                        },
                    },
                ]}
            />
        </div>
    );
};

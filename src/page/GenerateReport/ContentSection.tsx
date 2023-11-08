"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import styles from "./index.module.scss";
// import MonthPicker from "../../components/MonthPicker";
import Filter from "../../components/FilterBy";
import { ReportData } from "../../interfaces";
import { FaDownload } from "react-icons/fa";
import { useGenerateReportActions } from "../../actions/GenerateReport";
import { useRecoilValue } from "recoil";
import {
    generateReportAtom,
    selectedDateAtom,
} from "../../state/generateReport";
import { PaginatedTable } from "@/components/PaginatedTable";
// import { mockData } from '../../components/PaginatedTable/mock';
// import { SettingsButton } from '@/components/Button';
import { useRouter } from 'next/navigation';
import { ReportPageProps } from '@/interfaces';

export const ContentSection = ({ loading, setLoading }: ReportPageProps) => {
    const selectedDate = useRecoilValue(selectedDateAtom);
    const { push } = useRouter();
    const reportData = useRecoilValue(generateReportAtom);
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
            <PaginatedTable<ReportData>
                headers={["Report Code", "Report Description", "Action"]}
                data={reportData}
                loading={loading}
                columns={[
                    {
                        render: (data, index) => {
                            return data.return_code;
                        },
                    },
                    {
                        render: (data, index) => {
                            return data.bank_name;
                        },
                        width: "50%",
                    },
                    {
                        render: (data, index) => {
                            return (
                                <div
                                    className={styles["viewButton"]}
                                    onClick={() =>
                                        push(
                                            `/generate-report/${data.return_code}?selectedDate=${selectedDate}`
                                        )
                                    }
                                >
                                    View
                                </div>
                            );
                        },
                        width: "10%",
                    },
                ]}
            />

            {/* <PaginatedTable<ReportData>
                headers={Object.keys(mockData[0]).filter(
                    (val) => val !== 'serial_number'
                )}
                data={mockData}
                loading={loading}
                columns={Object.keys(mockData[0])
                    .filter((val) => val !== 'serial_number')
                    .map((key) => ({
                        render: (data, index) => {
                            return (data as any)[key];
                        },
                    }))}
            /> */}
        </div>
    );
};

"use client";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import SearchBar from "../../../components/SearchBar";
import Filter from "../../../components/FilterBy";
import { useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { PaginatedTable } from "../../../components/PaginatedTable";
import { ReportData } from "../../../interfaces";
import { mockData } from "../../../components/PaginatedTable/mock";

export default function ContentSection() {
    const { ["report-id"]: reportId } = useParams();
    const searchParams = useSearchParams();
    const selectedDate = searchParams.get("selectedDate");
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log(reportId);
        console.log(selectedDate);
    }, [reportId, selectedDate]);

    return (
        <div className={styles["contentContainer"]}>
            <div className={styles["contentTopSection"]}>
                <SearchBar />
                <Filter />
                <div className={styles["rightSide"]}>
                    <div
                        className={styles["reportButton"]}
                        onClick={router.back}
                    >
                        <AiOutlineArrowLeft
                            size={30}
                            className={styles["back"]}
                        />
                        Go Back
                    </div>
                </div>
            </div>
            <PaginatedTable<ReportData>
                headers={Object.keys(mockData[0]).filter(
                    (val) => val !== "serial_number"
                )}
                data={mockData}
                loading={!loading}
                columns={Object.keys(mockData[0])
                    .filter((val) => val !== "serial_number")
                    .map((key) => ({
                        render: (data, index) => {
                            return (data as any)[key];
                        },
                    }))}
            />
        </div>
    );
}

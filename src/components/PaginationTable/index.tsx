import React, { useState, useEffect } from "react";
import { Pagination } from "../../interfaces";
import { Report } from "../../interfaces";
import styles from "./index.module.scss";
import { TbMathGreater, TbMathLower } from "react-icons/tb";

interface PaginationTableProps {
    pagination: Pagination;
    reports: Report[];
    onRowClick?: any;
}

const PaginationTable = ({
    pagination,
    reports,
    onRowClick,
}: PaginationTableProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = pagination.numOfItemsPerPage;
    const itemCount = pagination.itemCount;

    useEffect(() => {
        setCurrentPage(1);
    }, [reports]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= pagination.pageCount) {
            setCurrentPage(page);
        }
    };

    const handlePageNumberChange = () => {};

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedReports = reports.slice(startIndex, endIndex);

    const handleRowClick = (report: Report) => {
        onRowClick(report);
    };

    return (
        <div className={styles["tableContainer"]}>
            <table className={styles["custom-table"]}>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Report Code</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedReports.map((report, index) => (
                        <tr
                            key={report.userId}
                            className={index % 2 === 0 ? "even-row" : "odd-row"}
                            onClick={() => handleRowClick(report)}
                        >
                            <td>{report.userId}</td>
                            <td>{report.reportCode}</td>
                            <td>{report.description}</td>
                            <td>
                                <button
                                    className={styles["actionButton"]}
                                    onClick={() => handleRowClick(report)}
                                >
                                    {report.action}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles["paginationSection"]}>
                <div>
                    Showing {endIndex} of {itemCount}
                </div>
                <div className={styles["buttonContainer"]}>
                    <div className={styles["buttonItemAlign"]}>
                        <TbMathLower color={"#6c757d"} />
                        <button
                            className={styles["button"]}
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={!pagination.hasPreviousPage}
                        >
                            Prev
                        </button>
                    </div>
                    <div className={styles["countDisplay"]}>
                        <div
                            className={styles["count"]}
                        >{`${currentPage}`}</div>
                        <div
                            className={styles["count"]}
                        >{`${pagination.pageCount}`}</div>
                    </div>
                    <div className={styles["buttonItemAlign"]}>
                        <button
                            className={styles["button"]}
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={!pagination.hasNextPage}
                        >
                            Next
                        </button>
                        <TbMathGreater color={"#6c757d"} size={15} />
                    </div>
                </div>
                <div className={styles["itemNumber"]}>
                    Items per page
                    <select
                        value='pageNumber'
                        onChange={handlePageNumberChange}
                    >
                        <option value='5'>{itemsPerPage}</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default PaginationTable;

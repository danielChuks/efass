import React, { useState, useEffect } from 'react';
import { Pagination } from '../../interfaces';
import { Report } from '../../interfaces';
import styles from './index.module.scss';
import { TbMathGreater, TbMathLower } from 'react-icons/tb';

interface PaginationTableProps {
    pagination: Pagination;
    reports: Report[];
}

const PaginationTable = ({ pagination, reports }: PaginationTableProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = pagination.numOfItemsPerPage;

    useEffect(() => {
        setCurrentPage(1);
    }, [reports]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= pagination.pageCount) {
            setCurrentPage(page);
        }
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedReports = reports.slice(startIndex, endIndex);

    return (
        <div className={styles['tableContainer']}>
            <table className={styles['custom-table']}>
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
                            key={index}
                            className={index % 2 === 0 ? 'even-row' : 'odd-row'}
                        >
                            <td>{report.userId}</td>
                            <td>{report.reportCode}</td>
                            <td>{report.description}</td>
                            <td>
                                <button className={styles['actionButton']}>
                                    {report.action}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles['paginationSection']}>
                <div>Showing 10 of 320</div>
                <div className={styles['buttonContainer']}>
                    <div className={styles['buttonItemAlign']}>
                        <TbMathLower color={'#343A40'} />
                        <button
                            className={styles['button']}
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={!pagination.hasPreviousPage}
                        >
                            Prev
                        </button>
                    </div>
                    <div className={styles['countDisplay']}>
                        <span>{`${currentPage}`}</span>
                        <span>{`${pagination.pageCount}`}</span>
                    </div>
                    <div className={styles['buttonItemAlign']}>
                        <button
                            className={styles['button']}
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={!pagination.hasNextPage}
                        >
                            Next
                        </button>
                        <TbMathGreater color={'#343A40'} size={15} />
                    </div>
                </div>
                <div className={styles['itemNumber']}>
                    Items per page
                    <select value="pageNumber">
                        <option value="5">5</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default PaginationTable;

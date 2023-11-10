/* eslint-disable @next/next/no-img-element */
import { PaginatedTableColumn, Pagination } from "@/interfaces";
import styles from "./index.module.scss";
import Skeleton from "react-loading-skeleton";

interface Props<T = any> {
    columns: PaginatedTableColumn<T>[];
    data?: T[];
    loading?: boolean;
    rowClickHandler?: (data: T) => any;
    pagination: Pagination;
}

export function TableBody<T = any>({
    columns,
    data = [],
    loading = false,
    rowClickHandler = () => null,
    pagination,
}: Props<T>) {
    const {
        page,
        numOfItemsPerPage,
    } = pagination;

    console.log(loading);

    return (
        <div className={styles["body"]}>
            {!loading &&
                data.map((row, index) => (
                    <tr className={styles["body-row"]} key={index}>
                        <td 
                            className={styles["body-column"]}
                            style={{
                                flex: 'unset',
                                width: 80,
                            }}
                        >
                            {((page - 1) * numOfItemsPerPage) + 1 + index}
                        </td>
                        {columns.map((column, idx) => (
                            <td
                                className={styles["body-column"]}
                                key={idx}
                                onClick={() => {
                                    column?.disableClick
                                        ? null
                                        : rowClickHandler(row);
                                }}
                                style={{
                                    cursor: column?.disableClick
                                        ? "default"
                                        : "pointer",
                                    width: column?.width,
                                    flex: column?.width ? 'unset' : undefined,
                                }}
                            >
                                {column.render(row, idx)}
                            </td>
                        ))}
                    </tr>
                ))}

            {loading &&
                Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className={styles["loader-row"]}>
                        <Skeleton height={25} />
                    </div>
                ))}
        </div>
    );
}

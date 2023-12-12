/* eslint-disable @next/next/no-img-element */
import { PaginatedTableColumn, Pagination } from '@/interfaces';
import styles from './index.module.scss';
import Skeleton from 'react-loading-skeleton';
import { BeatLoader } from 'react-spinners';

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
    const { page, numOfItemsPerPage } = pagination;

    const formatAmount = (value: any, isCommaSeparated: any) => {
        return isCommaSeparated
            ? value?.toLocaleString('en-US')
            : value;
    };


    return (
        <div className={styles['body']}>
        {!loading &&
            data.map((row, index) => (
                <div className={styles['body-row']} key={index}>
                    <div
                        className={styles['body-column']}
                        style={{
                            flex: 'unset',
                            width: 150,
                        }}
                    >
                        {(page - 1) * numOfItemsPerPage + 1 + index}
                    </div>
                    {columns.map((column, idx) => (
                        <div
                            className={styles['body-column']}
                            key={idx}
                            onClick={() => {
                                column?.disableClick
                                    ? null
                                    : rowClickHandler(row);
                            }}
                            style={{
                                cursor: column?.disableClick
                                    ? 'default'
                                    : 'pointer',
                                width: column?.width,
                                flex: column?.width ? 'unset' : undefined,
                                textAlign: column.isCommaSeparated
                                    ? 'right'
                                    : undefined,
                            }}
                        >
                            {formatAmount(
                                column.render(row, idx),
                                column.isCommaSeparated
                            )}
                        </div>
                    ))}
                </div>
            ))}

        <div className={styles['loader-row']}>
            {loading && <BeatLoader color="#006c33" />}
        </div>
    </div>
    );
}

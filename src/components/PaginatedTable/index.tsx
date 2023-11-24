/* eslint-disable @next/next/no-img-element */
import { PaginatedTableColumn } from '@/interfaces';
import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';
import { TablePagination } from './TablePagination';
import styles from './index.module.scss';
import { useTable } from '@/hooks/useTable';

interface Props<T> {
    headers: string[];
    columns: PaginatedTableColumn<T>[];
    data?: T[];
    loading?: boolean;
    rowClickHandler?: (data: T) => any;
}

export function PaginatedTable<T>({
    headers,
    columns,
    data = [],
    loading,
    rowClickHandler,
}: Props<T>) {
    const {
        pagination,
        goToPage,
        tableData,
        changeItemsPerPage,
    } = useTable<T>({ data });

    return (
        
        <div className={styles['table-wrapper']}>
            <div className={styles['table-container']}>
                <table className={styles['header-and-body']}>
                    {data.length === 0 || loading ? 
                        null : (
                            <TableHeader 
                                headers={headers}
                                columns={columns}
                            />
                        )
                    }
                    <TableBody 
                        columns={columns}
                        data={tableData}
                        loading={loading}
                        rowClickHandler={rowClickHandler}
                        pagination={pagination} 
                    />
                </table>

                {data.length === 0 && !loading && (
                    <div className={styles["no-data"]}>
                        <img alt='Empty data' src='/empty.png' />
                        <p>No data found</p>
                    </div>
                )}
            </div>
            {data.length === 0 || loading ? 
                null : (
                    <TablePagination 
                        pagination={pagination}   
                        goToPage={goToPage}   
                        changeItemsPerPage={changeItemsPerPage}
                    />
                )
            }
        </div>
    )
}

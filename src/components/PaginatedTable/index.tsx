import { PaginatedTableColumn, Pagination } from '@/interfaces';
import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';
import { TablePagination } from './TablePagination';
import styles from './index.module.scss';;

interface Props<T> {
    headers: string[];
    columns: PaginatedTableColumn<T>[];
    data?: T[];
    loading?: boolean;
    rowClickHandler?: (data: T) => any;
    pagination: Pagination;
    fetchPage: (page: number) => any;
}

export function PaginatedTable<T>({
    headers,
    columns,
    data = [],
    loading,
    rowClickHandler,
    pagination,
    fetchPage,
}: Props<T>) {
    return (
        <div className={styles['table-wrapper']}>
            {data.length === 0 && !loading ? 
                null : (
                    <TableHeader 
                        headers={headers}
                    />
                )
            }
            <TableBody 
                columns={columns}
                data={data}
                loading={loading}
                rowClickHandler={rowClickHandler}
            />
            {data.length === 0 && !loading ? 
                null : (
                    <TablePagination 
                        pagination={pagination}   
                        goToPage={fetchPage}   
                    />
                )
            }
        </div>
    )
}

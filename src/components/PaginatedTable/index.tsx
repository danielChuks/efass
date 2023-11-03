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

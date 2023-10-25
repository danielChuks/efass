import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';
import styles from './index.module.scss';
import { TableColumn, TableHeaderColumn } from '../../interfaces/index';

interface TableProps {
    headers: string[] | TableHeaderColumn[];
    columns: TableColumn[];
    data: object[];
    corporate?: boolean;
    rowClickHandler?: (rowData: any) => void;
}

export function Table({
    headers,
    columns,
    data,
    rowClickHandler,
    corporate,
}: TableProps) {
    return (
        <table className={styles['table']}>
            {data.length === 0 ? (
                <p className={styles['empty-table']}>No Data To Display</p>
            ) : (
                <>
                    <TableHeader corporate={corporate} headers={headers} />
                    <TableBody
                        columns={columns}
                        data={data}
                        headers={headers}
                        rowClickHandler={rowClickHandler}
                    />
                </>
            )}
        </table>
    );
}

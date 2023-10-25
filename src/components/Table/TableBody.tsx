import { TableColumn, TableHeaderColumn } from '../../interfaces';
import styles from './index.module.scss';

interface TableBodyProps {
    columns: TableColumn[];
    data: any[];
    rowClickHandler?: (rowData: object) => void;
    headers: string[] | TableHeaderColumn[];
}

export function TableBody({
    columns,
    data,
    rowClickHandler = () => null,
    headers,
}: TableBodyProps) {
    return (
        <tbody>
            {data.map((row, index) => (
                <tr
                    className={styles['table-row']}
                    key={index}
                    onClick={() => rowClickHandler(row)}
                >
                    {columns.map((column, index) => (
                        <td
                            key={index}
                            className={styles['col']}
                            data-label={headers[index]}
                            style={{ ...column.style }}
                        >
                            {column.render(row[column.key], row, index)}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
}

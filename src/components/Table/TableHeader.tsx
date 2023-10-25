import { TableHeaderColumn } from '../../interfaces';
import styles from './index.module.scss';

interface TableHeaderProps {
    headers: string[] | TableHeaderColumn[];
    corporate?: boolean;
}

export function TableHeader({ headers }: TableHeaderProps) {
    return (
        <thead>
            <tr className={`${styles['table-header']} `}>
                {headers.map((item, index) => {
                    if (typeof item === 'string') {
                        return (
                            <td className={styles['col']} key={index}>
                                {item}
                            </td>
                        );
                    } else {
                        return (
                            <td
                                className={styles['col']}
                                key={index}
                                style={{ ...item.style }}
                            >
                                {item.value}
                            </td>
                        );
                    }
                })}
            </tr>
        </thead>
    );
}

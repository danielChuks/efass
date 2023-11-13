import { PaginatedTableColumn } from '@/interfaces';
import styles from './index.module.scss';
import { capitaliseText } from '@/utils';

interface TableHeaderProps {
    headers?: string[];
    columns?: PaginatedTableColumn[];
}

export function TableHeader({ headers = [], columns = [] }: TableHeaderProps) {
    return (
        <thead className={styles['header-row']}>
            <th 
                className={styles['header-column']}
                style={{
                    flex: 'unset',
                    width: 80,
                }}
            >
                S/NO
            </th>
            {headers.map((item, index) => (
                <th
                    className={styles['header-column']} 
                    key={index}
                    style={
                        columns[index]?.width ? {
                            width: columns[index].width,
                            flex: 'unset',
                        } : {}
                    }
                    title={capitaliseText(item)}
                >
                    {item}
                </th>
            ))}
        </thead>
    );
}

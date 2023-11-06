import { PaginatedTableColumn } from '@/interfaces';
import styles from './index.module.scss';

interface TableHeaderProps {
    headers?: string[];
    columns?: PaginatedTableColumn[];
}

export function TableHeader({ headers = [], columns = [] }: TableHeaderProps) {
    return (
        <div className={styles['header-row']}>
            <div 
                className={styles['header-column']}
                style={{
                    flex: 'unset',
                    width: 80,
                }}
            >
                S/NO
            </div>
            {headers.map((item, index) => (
                <div 
                    className={styles['header-column']} 
                    key={index}
                    style={
                        columns[index]?.width ? {
                            width: columns[index].width,
                            flex: 'unset',
                        } : {}
                    }
                >
                    {item}
                </div>
            ))}
        </div>
    );
}

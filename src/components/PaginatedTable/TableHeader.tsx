import styles from './index.module.scss';

interface TableHeaderProps {
    headers?: string[];
}

export function TableHeader({ headers = [] }: TableHeaderProps) {
    return (
        <div className={styles['header-row']}>
            <div className={styles['header-column']}>S/NO</div>
            {headers.map((item, index) => (
                <div className={styles['header-column']} key={index}>{item}</div>
            ))}
        </div>
    );
}

import BaseLayout from '../../components/BaseLayout';
import styles from './index.module.scss';
import { DASHBOARD_PAGES } from '../../enums';

export const HomePage = () => {
    return (
        <BaseLayout page={DASHBOARD_PAGES.HOME}>
            <div className={styles.header}>DASHBOARD (Overview)</div>
            <div className={styles['card-body']}>
                <div className={styles['card-container']}>
                    <h3>User:</h3>
                    <p>0</p>
                </div>
                <div className={styles['card-container']}>
                    <h3>Last activity date:</h3>
                    <p>0</p>
                </div>
                <div className={styles['card-container']}>
                    <h3>Current Date:</h3>
                    <p>0</p>
                </div>
                <div className={styles['card-container']}>
                    <h3>Users Created:</h3>
                    <p>0</p>
                </div>
            </div>

            <div className={styles['table_container']}>
                <div className="table_header">
                    <h4 className="title">Recent Activity</h4>
                </div>
                <div className={styles['table_body']}></div>
            </div>
        </BaseLayout>
    );
};

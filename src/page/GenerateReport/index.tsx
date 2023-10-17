import BaseLayout from '../../components/BaseLayout/index';
import styles from './index.module.scss';

export const GenerateReport = () => {
    return (
        <BaseLayout>
            <div className={styles['headerContainer']}>
                <div>Generate Report (Overview)</div>
                <div className={styles['timeContainer']}>
                    <div>Current Date:</div>
                    <div>July 12, 2023, 12:23 pm</div>
                </div>
            </div>
        </BaseLayout>
    );
};

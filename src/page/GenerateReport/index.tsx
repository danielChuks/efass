import BaseLayout from '../../components/BaseLayout/index';
import styles from './index.module.scss';
import { DASHBOARD_PAGES } from '../../enums';
import { ReportHeader } from './ReportHeader';

export const GenerateReport = () => {
    return (
        <BaseLayout page={DASHBOARD_PAGES.GENERATE_REPORT}>
            <div className={styles['topNav']}>
                <div>Generate Report (Overview)</div>
                <div className={styles['timeContainer']}>
                    <div>Current Date:</div>
                    <div>July 12, 2023, 12:23 pm</div>
                </div>
            </div>
                <ReportHeader />
        </BaseLayout>
    );
};

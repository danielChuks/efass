// import { Modal } from 'antd';
import styles from './index.module.scss';

export const LoadingScreen = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles['loader']}>
                <div className={styles['loader-square']}></div>
                <div className={styles['loader-square']}></div>
                <div className={styles['loader-square']}></div>
                <div className={styles['loader-square']}></div>
                <div className={styles['loader-square']}></div>
                <div className={styles['loader-square']}></div>
                <div className={styles['loader-square']}></div>
            </div>
        </div>
    );
};

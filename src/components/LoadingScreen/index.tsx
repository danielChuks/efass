import styles from './index.module.scss';

export const LoadingScreen = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.loader}></div>
        </div>
    );
};

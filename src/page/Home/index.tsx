import BaseLayout from "../../components/BaseLayout";
import styles from "./index.module.scss";

export const HomePage = () => {
  return (
    <BaseLayout>
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
    </BaseLayout>
  );
};

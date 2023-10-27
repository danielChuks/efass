import React from 'react';
import styles from './index.module.scss';


export default function Filter() {
  return (
    <div>
      <div className={styles['selectContainer']}>
                    <label>Filter by</label>
                    <select>
                        <option value="">Most recent</option>
                    </select>
                </div>
    </div>
  )
}


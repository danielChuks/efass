'use client';
import React from 'react';
import styles from './index.module.scss';
import logo from '../../../public/AltLogo.png';
import Image from 'next/image';

interface AccountInfoProps {
    value: number;
    index: number;
}
function AccountInformation({ value, index }: AccountInfoProps) {
    return (
        <main
            role="tabpanel"
            hidden={value !== index}
            id={`account-information-tabpanel`}
            aria-labelledby={`account-information-tab`}
            className={styles['account_information']}
        >
            {value === index && (
                <>
                    <Image className="" src={logo} alt="logo" />
                    <div>
                        <h4>BANK OF INDUSTRY(BOI)</h4>
                        <div className={styles['content']}>
                            <p className={styles['title']}>Username:</p>
                            <p>Timi</p>
                        </div>
                        <div className={styles['content']}>
                            <p className={styles['title']}>Role:</p>
                            <p>User</p>
                        </div>
                    </div>
                </>
            )}
        </main>
    );
}

export default AccountInformation;

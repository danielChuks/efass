'use client';
import React from 'react';
import InputGroup from '@/components/Input';
import { SettingsButton } from '@/components/Button/index';
import styles from './index.module.scss';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Otp from './Otp';
import NewPassword from './NewPassword';

interface ChangePasswordProps {
    value: number;
    index: number;
}
function ChangePassword({ value, index }: ChangePasswordProps) {
    const searchParams = useSearchParams();
    const tab = searchParams.get('tab');
    const router = useRouter();
    const [data, setData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const handleInputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const handleChangePassword = () => {
        setError(true);
        setErrorText('Cannot update password, please try again');
    };

    return (
        <main
            role="tabpanel"
            hidden={value !== index}
            id={`change-password-tabpanel`}
            aria-labelledby={`change-password-tab`}
            className={styles['change_password']}
        >
            {value === index && tab === null ? (
                <>
                    <p className={styles['title']}>
                        Verify it’s you by entering your old password and new
                        password
                    </p>
                    <div className={styles['content']}>
                        <InputGroup
                            type="text"
                            label="Old password"
                            placeholder="enter old password"
                            value={data.oldPassword}
                            name="oldPassword"
                            handleChange={handleInputchange}
                        />
                        <InputGroup
                            type="text"
                            label="New Password"
                            value={data.newPassword}
                            name="newPassword"
                            placeholder="Enter new Password"
                            handleChange={handleInputchange}
                        />

                        <InputGroup
                            type="text"
                            label="Confirm Password"
                            value={data.confirmPassword}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            handleChange={handleInputchange}
                        />

                        <SettingsButton
                            text={'Continue'}
                            handleAction={handleChangePassword}
                            error={error}
                            errorText={errorText}
                        />
                    </div>
                </>
            ) : value === index && tab === 'otp' ? (
                <Otp />
            ) : (
                <NewPassword />
            )}
        </main>
    );
}

export default ChangePassword;

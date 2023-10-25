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
    // console.log(tab);
    const router = useRouter();
    const [data, setData] = useState({ email: '', password: '' });
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const handleInputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const navigateOtp = () => {
        setError(true);
        setErrorText('Invalid email or password');
        router.push('settings?tab=otp');
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
                        Verify it’s you by entering your email and current
                        password
                    </p>
                    <div className={styles['content']}>
                        <InputGroup
                            type="email"
                            label="Email Address"
                            placeholder="enter valid email"
                            value={data.email}
                            name="email"
                            handleChange={handleInputchange}
                        />
                        <InputGroup
                            type="password"
                            label="Current Password"
                            value={data.password}
                            name="password"
                            placeholder=""
                            handleChange={handleInputchange}
                        />

                        <SettingsButton
                            text={'Continue'}
                            handleAction={navigateOtp}
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

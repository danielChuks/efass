'use client';

import styles from './index.module.scss';
import { useRecoilValue } from 'recoil';
import { settingsAtom } from '../../state/settings';
import { useSettingsActions } from '../../actions/settings';
import { useEffect, useState } from 'react';
import BaseLayout from '../../components/BaseLayout';
import InputGroup from '@/components/Input';
import { useRouter, useSearchParams } from 'next/navigation';
import Otp from './Otp';
import NewPassword from './NewPassword';
import { DASHBOARD_PAGES } from '../../enums';
import { SettingsButton } from '../../components/Button';

export const Settings = () => {
    const { getSettings } = useSettingsActions();
    const [activeTab, setActiveTab] = useState('account_information');
    const darkMode = useRecoilValue(settingsAtom);
    const [data, setData] = useState({ email: '', password: '' });
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const searchParams = useSearchParams();
    const tab = searchParams.get('tab');
    // console.log(tab);
    // console.log(pathname)
    const router = useRouter();

    const handleInputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const navigateOtp = () => {
        setError(true);
        setErrorText('Invalid email or password');
        // console.log("otp");
        router.push('settings?tab=otp');
    };

    //temporary till i switch to material ui tabs
    const setAccountInformation = () => {
        setActiveTab('account_information');
        router.push('settings');
    };

    const setChangePassword = () => {
        setActiveTab('change_password');
        router.push('settings');
    };

    useEffect(() => {
        getSettings();
    }, [getSettings]);

    console.log(darkMode);
    return (
        <BaseLayout page={DASHBOARD_PAGES.SETTINGS}>
            <div className={styles['container']}>
                <h4>SETTINGS</h4>
                <div className={styles['settings_card']}>
                    <header className={styles['header']}>
                        <p onClick={setAccountInformation}>
                            Account Information
                        </p>
                        <p onClick={setChangePassword}>Change Password</p>
                    </header>
                    <hr />

                    {/* //switching to material ui tabs */}
                    {activeTab === 'account_information' && (
                        <main className={styles['account_information']}>
                            <img className="" src="../logo.png" alt="logo" />
                            <div>
                                <h4>BUI MICROFINANCE BANK</h4>
                                <div className={styles['content']}>
                                    <p className={styles['title']}>Username:</p>
                                    <p>Timi</p>
                                </div>
                                <div className={styles['content']}>
                                    <p className={styles['title']}>
                                        Email Address:
                                    </p>
                                    <p>timi@gmail.com</p>
                                </div>
                            </div>
                        </main>
                    )}
                    {activeTab === 'change_password' && tab === null ? (
                        <>
                            <main className={styles['change_password']}>
                                <p className={styles['title']}>
                                    Verify it’s you by entering your email and
                                    current password
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
                            </main>
                        </>
                    ) : null}
                    {tab === 'otp' && activeTab === 'change_password' ? (
                        <Otp />
                    ) : null}
                    {tab === 'new_password' &&
                    activeTab === 'change_password' ? (
                        <NewPassword />
                    ) : null}
                </div>
            </div>
        </BaseLayout>
    );
};

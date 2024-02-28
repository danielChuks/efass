'use client';
import React from 'react';
import InputGroup from '@/components/Input';
import { SettingsButton } from '@/components/Button/index';
import styles from './index.module.scss';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Otp from './Otp';
import NewPassword from './NewPassword';
import { useSettingsActions } from '../../actions/settings';
import { checkUser } from '../../utils';

interface ChangePasswordProps {
    value: number;
    index: number;
}
function ChangePassword({ value, index }: ChangePasswordProps) {
    const ispageActive = { isPageActive: true };
    const { changePassword } = useSettingsActions();
    const searchParams = useSearchParams();
    const tab = searchParams.get('tab');
    const router = useRouter();
    const [data, setData] = useState({
        username: checkUser()?.username,
        old_password: '',
        password: '',
        confirm_password: '',
    });
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [success, setSuccess] = useState(false);
    const [successText, setSuccessText] = useState('');
    const [passwordErrorText, setPasswordErrorText] = useState('');
    const [PasswordError, setPasswordError] = useState<boolean>();
    const handleInputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
        // if (e.target.name === 'confirm_password') {
        //     validatePasswords();
        // }
    };
    const handleChangePassword = async (e: MouseEvent) => {
        e.preventDefault();
        if (validateFields()) {
            try {
                const response = await changePassword(data);
                // console.log(response);
                if (response.responseCode === 0) {
                    // console.log(response);
                    setSuccess(true);
                    setSuccessText('Password Updated Successfully');
                    sessionStorage.setItem(
                        'isPageActive',
                        JSON.stringify(ispageActive)
                    );
                    setTimeout(() => {
                        router.push('/dashboard');
                    }, 1000);
                }
                if (response.responseCode !== 0) {
                    // console.log(response);
                    setError(true);
                    setErrorText(response?.responseMessage);
                }
            } catch (err) {
                setError(true);
                setErrorText(
                    'Cannot update password at the moment, please try again later'
                );
                console.log(err);
            }
        }
    };

    //check if all fields have been filled
    const validateFields = () => {
        if (!data.old_password || !data.password || !data.confirm_password) {
            setError(true);
            setErrorText('Please ensure that you fill all required fields');
            return false;
        } else return true;
    };

    //check if passwords match
    const validatePasswords = () => {
        if (data.password !== data.confirm_password || !data.confirm_password) {
            setPasswordError(true);
            setPasswordErrorText('Passwords do not match!');
        } else {
            setPasswordError(false);
            setPasswordErrorText('');
        }
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
                    <form className={styles['content']}>
                        <InputGroup
                            type="text"
                            label="Old password"
                            placeholder="enter old password"
                            value={data.old_password}
                            name="old_password"
                            required={true}
                            handleChange={handleInputchange}
                        />

                        <InputGroup
                            type="text"
                            label="New Password"
                            value={data.password}
                            name="password"
                            required={true}
                            placeholder="Enter new Password"
                            handleChange={handleInputchange}
                        />

                        <InputGroup
                            type="text"
                            label="Confirm Password"
                            value={data.confirm_password}
                            name="confirm_password"
                            required={true}
                            placeholder="Confirm Password"
                            handleChange={handleInputchange}
                            isError={PasswordError}
                            errorText={passwordErrorText}
                        />

                        <SettingsButton
                            type="submit"
                            text={'Continue'}
                            handleAction={(e) => handleChangePassword(e)}
                            error={error}
                            errorText={errorText}
                            success={success}
                            successText={successText}
                        />
                    </form>
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

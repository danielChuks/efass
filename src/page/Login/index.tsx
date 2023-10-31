'use client';
import styles from './index.module.scss';
import EfassLogo from '../../../public/Images/Frame.png';
import NeptuneLogo from '../../../public/Images/Neptunelogo.png';
import Image from 'next/image';
import InputGroup from '@/components/Input/index';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SettingsButton } from '../../components/Button';
import { useAuthActions } from '../../actions/auth';

interface LoginProps {
    username: string;
    password: string;
}

export const Login = () => {
    const { login } = useAuthActions();
    const [data, setData] = useState<LoginProps>({
        username: '',
        password: '',
    });
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');

    const router = useRouter();

    const handleInputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const validateInput = () => {
        if (!data.username && !data.password) {
            setError(true);
            setErrorText('Please enter both username and password.');
            return false;
        }
        setError(false);
        setErrorText('');
        return true;
    };

    const onSubmit = async () => {
        if (validateInput()) {
            const response = await login(data.username, data.password);
            if (response.responseCode === 0) {
                router.push('/dashboard');
            } else if (response.responseCode !== 0) {
                setError(true);
                router.push('/login');
                setErrorText('Invalid username or password. Please try again.');
            } else {
                setError(true);
                router.push('/login');
                setErrorText('An error occurred. Please try again later.');
            }
        }
    };
    return (
        <div className={styles['background']}>
            <div className={styles['login-logo']}>
                <Image
                    src={EfassLogo}
                    alt="efass logo"
                    width={245}
                    height={136}
                />
            </div>

            <div className="login-layout">
                <div className={styles['login-field']}>
                    <Image
                        className={styles['form-logo']}
                        src={NeptuneLogo}
                        alt="Neptune logo"
                        width={198}
                        height={64}
                    />
                    <div className={styles['form']}>
                        <div className={styles['header']}>Log In</div>
                        <InputGroup
                            type="text"
                            label="Username"
                            placeholder=""
                            value={data.username}
                            name="username"
                            handleChange={handleInputchange}
                        />
                        <InputGroup
                            type="password"
                            label="Password"
                            value={data.password}
                            name="password"
                            placeholder=""
                            handleChange={handleInputchange}
                        />
                        <SettingsButton
                            text="Login"
                            error={error}
                            errorText={errorText}
                            handleAction={onSubmit}
                            type="submit"
                        />
                    </div>
                </div>
                <div className={styles['footer']}>
                    2023 &copy; eFASS by Neptune Software Group.
                </div>
            </div>
        </div>
    );
};

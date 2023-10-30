'use client';
import styles from './index.module.scss';
import EfassLogo from '../../../public/Images/Frame.png'
import NeptuneLogo from '../../../public/Images/Neptunelogo.png';
import Image from 'next/image';
import InputGroup from '@/components/Input/index';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SettingsButton } from '../../components/Button';
import { useAuthActions } from '../../actions/auth';
interface LoginState {
    email: string;
    password: string;
}

export const Login = () => {
    const { login } = useAuthActions();
    const [data, setData] = useState<LoginState>({
        email: '',
        password: '',
    });
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');

    const router = useRouter();

    const handleInputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const navigateOtp = async (e: FormEvent) => {
        e.preventDefault();
        if (!data.email || !data.password) {
            setError(true);
            setErrorText('Input email or password');
        } else {
            setError(false);
            setErrorText('');
            const response = await login(data.email, data.password);
            router.push('/dashboard');
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
                    <form className={styles['form']}>
                        <div className={styles['header']}>Log In</div>
                        <InputGroup
                            type="text"
                            label="Username"
                            placeholder=""
                            value={data.email}
                            name="email"
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
                            handleAction={navigateOtp}
                            type="submit"
                        />
                    </form>
                </div>
                <div className={styles['footer']}>
                    2023 &copy; eFASS by Neptune Software Group.
                </div>
            </div>
        </div>
    );
};

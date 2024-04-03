'use client';
import styles from './index.module.scss';
import EfassLogo from '../../../public/Images/Frame.png';
import NeptuneLogo from '../../../public/Images/Neptunelogo.png';
import BoiLogo from '../../../public/logo.png';
import Image from 'next/image';
import InputGroup from '@/components/Input/index';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SettingsButton } from '../../components/Button';
import { useAuthActions } from '../../actions/auth';
import { LoadingScreen } from '../../components/LoadingScreen';
import useEnterKey from '../../hooks/useKeyDown';

//  if (validateInput()) {
//      const response = await login(data.username, data.password);
//      // console.log(response);
//      //check if user has logged in before(PasswordUpdated is true)
//      if (response.responseCode === 0 && response.user?.passwordUpdated) {
//          router.push('/dashboard');
//          sessionStorage.setItem('user', JSON.stringify(response.user));
//          sessionStorage.setItem(
//              'isPageActive',
//              JSON.stringify({ isPageActive: true })
//          );
//          setSuccess(true);
//      }
//      //check if user is entering the application for the first time(passwordUpdated is false)
//      else if (response.responseCode === 0 && !response.user?.passwordUpdated) {
//          sessionStorage.setItem(
//              'isPageActive',
//              JSON.stringify({ isPageActive: false })
//          );
//          router.push('/settings');
//          sessionStorage.setItem('user', JSON.stringify(response.user));
//          setSuccess(true);
//      } else if (response.responseCode !== 0) {
//          setError(true);
//          setLoading(false);
//          router.push('/login');
//          setErrorText('Invalid username or password. Please try again.');
//      } else {
//          setError(true);
//          router.push('/login');
//          setErrorText('An error occurred. Please try again later.');
//      }
//  }

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
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const router = useRouter();

    const handleInputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const validateInput = () => {
        if (!data.username && !data.password) {
            setError(true);
            setLoading(false);
            setErrorText('Please enter both username and password.');
            return false;
        }
        setError(false);
        setErrorText('');
        return true;
    };

    //enter when the user click the enter keyboard
    const handleEnterKey = () => {
        onSubmit();
    };

    useEnterKey(handleEnterKey);

    const onSubmit = async () => {
        setLoading(true);
        if (validateInput()) {
            const response = await login(data.username, data.password);
            // console.log(response);
            //check if user has logged in before(PasswordUpdated is true)
            if (response.responseCode === 0) {
                router.push('/dashboard');
                sessionStorage.setItem('user', JSON.stringify(response.user));
                //   sessionStorage.setItem(
                //       'isPageActive',
                //       JSON.stringify({ isPageActive: true })
                //   );
                setSuccess(true);
            }
            //check if user is entering the application for the first time(passwordUpdated is false)
            // else if (
            //     response.responseCode === 0 &&
            //     !response.user?.passwordUpdated
            // ) {
            //     sessionStorage.setItem(
            //         'isPageActive',
            //         JSON.stringify({ isPageActive: false })
            //     );
            //     router.push('/settings');
            //     sessionStorage.setItem('user', JSON.stringify(response.user));
            //     setSuccess(true);
            // }
            else if (response.responseCode !== 0) {
                setError(true);
                setLoading(false);
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
        <>
            {loading ? (
                <LoadingScreen />
            ) : success ? null : (
                <div className={styles['background']}>
                    <div className={styles['login-logo']}>
                        <Image
                            src={EfassLogo}
                            alt="efass logo"
                            width={225}
                            height={126}
                        />
                    </div>

                    <div className="login-layout">
                        <div className={styles['login-field']}>
                            <Image
                                className={styles['form-logo']}
                                src={BoiLogo}
                                alt="logo"
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
                                    loading={loading}
                                />
                            </div>
                        </div>
                        <div className={styles['footer']}>
                            2024 &copy; eFASS by Neptune Software Group.
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

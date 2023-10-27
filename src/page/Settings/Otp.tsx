'use client';
import { useState } from 'react';
import styles from './index.module.scss';
import InputGroup from '@/components/Input';
import { SettingsButton } from '@/components/Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
function Otp() {
    const router = useRouter();
    const [data, setData] = useState({ otp: '' });
    const handleInputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const verifyOtp = () => {
        router.push('settings?tab=new_password');
    };
    return (
        <main className={styles['change_password']}>
            <header>
                <Link href="/settings">
                    <MdOutlineKeyboardBackspace
                        style={{ color: '#0d1740' }}
                        size={24}
                    />
                </Link>
                <p className={styles['title']}>
                    Kindly Input the verification code that was sent to your
                    email
                </p>
            </header>

            <div className={styles['content']}>
                <InputGroup
                    type="number"
                    label="OTP Verification  Code"
                    value={data.otp}
                    name="otp"
                    placeholder=""
                    handleChange={handleInputchange}
                />

                <SettingsButton
                    text={'Verify'}
                    handleAction={verifyOtp}
                    // error={error}
                    // errorText={errorText}
                />
            </div>
        </main>
    );
}

export default Otp;

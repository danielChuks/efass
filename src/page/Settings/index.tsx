'use client';
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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AccountInformation from './AccountInformation';
import ChangePassword from './ChangePassword';


export const Settings = () => {
    const { getSettings } = useSettingsActions();
    const darkMode = useRecoilValue(settingsAtom);
    const [value, setValue] = useState(0);
    useEffect(() => {
        getSettings();
    }, [getSettings]);

    //accessibility prop for screen readers
    function a11yProps(index: number) {
        return {
            id: `settings-tab-${index}`,
            'aria-controls': `settings-tabpanel-${index}`,
        };
    }
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <BaseLayout page={DASHBOARD_PAGES.SETTINGS}>
            <Box
                sx={{
                    width: '100%',
                    backgroundColor: '#fff',
                    borderRadius: '0.5rem',
                    height: ' 32.5rem',
                }}
            >
                <Box
                    sx={{
                        borderBottom: 1,
                        borderColor: '#0D1740',
                        borderWidth: '1px',
                    }}
                >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="settings tabs"
                        TabIndicatorProps={{
                            style: { background: '#0D1740', bottom: '-1px' },
                        }}
                        textColor="inherit"
                    >
                        <Tab
                            sx={{
                                fontFamily: 'baloo 2',
                                color: '#6C757D',
                                textTransform: 'Capitalize',
                            }}
                            label="Account Information"
                            {...a11yProps(0)}
                        />
                        <Tab
                            sx={{
                                fontFamily: 'baloo 2',
                                color: '#6C757D',
                                textTransform: 'Capitalize',
                            }}
                            label="Change Password"
                            {...a11yProps(1)}
                        />
                    </Tabs>
                </Box>
                <AccountInformation value={value} index={0} />
                <ChangePassword value={value} index={1} />
            </Box>        
      </BaseLayout>
    );
};

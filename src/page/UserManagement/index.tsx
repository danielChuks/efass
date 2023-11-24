'use client';
import { useRecoilValue } from 'recoil';
import { settingsAtom } from '../../state/settings';
import { useSettingsActions } from '../../actions/settings';
import { useEffect, useState } from 'react';
import BaseLayout from '../../components/BaseLayout';
import Card from '../../components/Card/index';
import { BsPlusLg } from 'react-icons/bs';
import { DASHBOARD_PAGES } from '../../enums';
import { useUserListActions } from '../../actions/userManagement';
import { userAtom } from '../../state/userList';
import { PaginatedTable } from '@/components/PaginatedTable';
// import { userData } from "./data";
import { User } from '@/interfaces';
import styles from './index.module.scss';
import { options } from '../../components/FilterBy/dommy';
import Image from 'next/image';
import users from '../../../public/Images/users.png';
import date from '../../../public/Images/case.png';
import lastActivity from '../../../public/Images/calender.png';
import userAdded from '../../../public/Images/person.png';
import { LoadingScreen } from '../../components/LoadingScreen';
import PageContent from '../../components/PageContent';
import { UserDialog } from '../../components/Dialog';
import SnackbarComponent from '../../components/Snackbar';

export const UserManagement = () => {
    
    
    const { create } = useUserListActions();
    const { getSettings } = useSettingsActions();
    const [loading, setLoading] = useState(true);
    const [openModalDialog, setModalDialog] = useState(false);
    const [modalHeader, setModalHeader] = useState('Create User');
    //use to determine if current function is add or edit
    const [status, setStatus] = useState(true)
    // const [modalAction, setModalAction] = useState(() => handleCreateUser);
    //form data
    const [data, setData] = useState({
        username: '',
        password: '',
    });
    const [SnackbarMessage, setSnackbarMessage] = useState<string>('');
    const [snackBarColor, setSnackbarColor] = useState<string>('');
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const { handleuserList } = useUserListActions();
    const userData = useRecoilValue(userAtom);


    const CreateUser = async() => {
        const response = await create(data);
        console.log(response)
        try {
            if (response && response.responseCode === 0) {
                setIsSnackbarOpen(true);
                // console.log('added successfully');
                setSnackbarMessage(response.responseMessage);
                setSnackbarColor('#006c33');
                setModalDialog(false);
                setTimeout(() => {
                    setIsSnackbarOpen(false);
                }, 10000);
            } else {
                setSnackbarMessage('An error occurred, please try again later');
                setSnackbarColor('');
                setTimeout(() => {
                    setIsSnackbarOpen(false);
                }, 7000);
            }
        } catch (error) {
            setSnackbarMessage('An error occurred, please try again later');
            setSnackbarColor('');
            setTimeout(() => {
                setIsSnackbarOpen(false);
            }, 7000);
        }
    };

    const openAddModal = () => {
        setStatus(true)
        setModalHeader('Create User');
        setModalDialog(true);
        setData({ username: '', password: ''});
    };

    useEffect(() => {
        getSettings();
        fetchData();
    }, [getSettings]);
    const fetchData = async () => {
        try {
            await handleuserList();
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };
    const handleInputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const openEditModal = (data: User) => {
        setStatus(false)
        setModalHeader('Edit User');
        setData({
            username: data.username,
            password: data.password,
        });
        console.log(data);
        setModalDialog(true);
    };
    const handleEditUser = async () => {
        // const response = await create(data);
        // console.log(response)
        // try {
        //     if (response && response.responseCode === 0) {
        //         setIsSnackbarOpen(true);
        //         // console.log('added successfully');
        //         setSnackbarMessage(response.responseMessage);
        //         setSnackbarColor('#006c33');
        //         setModalDialog(false);
        //         setTimeout(() => {
        //             setIsSnackbarOpen(false);
        //         }, 10000);
        //     } else {
        //         setSnackbarMessage('An error occurred, please try again later');
        //         setSnackbarColor('');
        //         setTimeout(() => {
        //             setIsSnackbarOpen(false);
        //         }, 7000);
        //     }
        // } catch (error) {
        //     setSnackbarMessage('An error occurred, please try again later');
        //     setSnackbarColor('');
        //     setTimeout(() => {
        //         setIsSnackbarOpen(false);
        //     }, 7000);
        // }
    };

    const handleClose = () => {
        setIsSnackbarOpen(false);
    };


    // console.log(darkMode);
    return (
        <>
                    {loading ? (
                <LoadingScreen />
            ) : (
                <BaseLayout page={DASHBOARD_PAGES.USER_MANAGEMENT}>
                    {openModalDialog && (
                        <UserDialog
                            openModal={openModalDialog}
                            setOpenModal={setModalDialog}
                            handleAction={status ? CreateUser : handleEditUser}
                            header={modalHeader}
                            data={data}
                            setData={setData}
                            handleInputchange={handleInputchange}
                            error={error}
                            errorText={errorText}
                            handleCreateUser={CreateUser}
                        />
                    )}
                    <SnackbarComponent
                handleClose={handleClose}
                isopen={isSnackbarOpen}
                message={SnackbarMessage}
                color={snackBarColor}
            />
                    <div className={styles['container']}>
                        <h4>USER MANAGEMENT</h4>
                    </div>
                    <div className={styles['card-body']}>
                        <Card
                            title={'USERS CREATED'}
                            content={userData?.length.toString()}
                            image={
                                <Image
                                    src={users}
                                    alt=""
                                    width={30}
                                    height={25}
                                />
                            }
                        />
                        <Card
                            title={'ACTIVE USERS'}
                            content={userData?.length.toString()}
                            image={
                                <Image
                                    src={userAdded}
                                    alt=""
                                    width={30}
                                    height={25}
                                />
                            }
                        />

                        <Card
                            title={'INACTIVE USERS'}
                            content={'0'}
                            image={
                                <Image
                                    src={lastActivity}
                                    alt=""
                                    width={30}
                                    height={25}
                                />
                            }
                        />
                    </div>
                    <div className={styles['contentContainer']}>
                                <PageContent>
                                <div className={styles['righSide']}>
                                    <div className={styles['rightSide']}>
                                        <div
                                            className={styles['reportButton']}
                                            onClick={openAddModal}
                                        >
                                            Create User
                                            <BsPlusLg
                                                size={22}
                                                color={'#fff'}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <PaginatedTable<User>
                                headers={[
                                    'USERNAME',
                                    'PASSWORD',
                                    'ACTION',
                                ]}
                                data={userData}
                                loading={loading}
                                columns={[
                                    {
                                        render: (data, index) => {
                                            return data.username;
                                        },
                                        width: '30%',
                                    },
                                    {
                                        render: (data, index) => {
                                            return <p>********</p>;
                                        },
                                        width: '50%',
                                    },
                                    {
                                        render: (data, index) => {
                                            return (
                                                <div
                                                    className={
                                                        styles['viewButton']
                                                    }
                                                    onClick={() => {
                                                        openEditModal(data);
                                                    }}
                                                >
                                                    ...
                                                </div>
                                            );
                                        },
                                        width: '10%',
                                    },
                                ]}
                            />
                                </PageContent>
                    </div>
                </BaseLayout>
                           )}
        </>
    );
};

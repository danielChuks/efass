import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import toast from 'react-hot-toast';
import { BsThreeDots } from 'react-icons/bs';
// import { Button } from '../Buttons';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

interface TableExtensionProps {
    goTo: (page: number) => void;
    increasePage: () => void;
    decreasePage: () => void;
    currentPage: number;
    totalPages: number;
}

export function TableExtension({
    goTo,
    currentPage,
    totalPages,
    increasePage,
    decreasePage,
}: TableExtensionProps) {
    const [toGo, setToGo] = useState(currentPage);
    const [error, setError] = useState('');
    const [openGoto, setOpenGoto] = useState(false);
    const [leftPages, setLeftPages] = useState<number[]>([]);
    const [rightPages, setRightPages] = useState<number[]>([]);

    useEffect(() => {
        setToGo(currentPage);
    }, [currentPage]);

    useEffect(() => {
        if (totalPages > 5 && totalPages < 10) {
            const startRight = 6;
            const rightPages: number[] = [];

            for (let i = startRight; i <= totalPages; i++) {
                rightPages.push(i);
            }
            setRightPages(rightPages);
        } else if (totalPages > 5) {
            const startRight = totalPages - 4;
            const rightPages: number[] = [];

            for (let i = startRight; i <= totalPages; i++) {
                rightPages.push(i);
            }
            setRightPages(rightPages);
        }
    }, [totalPages]);

    useEffect(() => {
        const leftPageArray: number[] = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                leftPageArray.push(i);
            }
        } else if (totalPages > 5 && totalPages <= 10) {
            for (let i = 1; i <= 5; i++) {
                leftPageArray.push(i);
            }
        } else if (currentPage >= totalPages - 5 && totalPages >= 10) {
            for (let i = totalPages - 9; i <= totalPages - 5; i++) {
                leftPageArray.push(i);
            }
        } else if (currentPage >= 5) {
            for (let i = currentPage - 4; i <= currentPage; i++) {
                leftPageArray.push(i);
            }
        } else {
            for (let i = 1; i <= 5; i++) {
                leftPageArray.push(i);
            }
        }

        setLeftPages(leftPageArray);
    }, [currentPage, totalPages]);

    const handleInputKeyPress = (
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key === 'Enter' && document.activeElement === event.target) {
            // Check if the input value is a valid page number
            const pageNumber = Number(toGo);
            if (
                !isNaN(pageNumber) &&
                pageNumber >= 1 &&
                pageNumber <= totalPages
            ) {
                goTo(pageNumber);
            } else {
                toast.error(`Maximum page number is ${totalPages}`);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (isNaN(value)) {
            setError('Please enter a valid number.');
        } else {
            if (value < 1 || value > totalPages) {
                setError('Number must not exceed page limit.');
            } else {
                setError('');
            }
        }

        setToGo(value);
    };

    return (
        <>
            {totalPages > 1 && (
                <div className={styles['table-extension']}>
                    {openGoto && (
                        <input
                            className={styles['page-input']}
                            type="number"
                            value={toGo}
                            min={'1'}
                            max={totalPages.toString()}
                            onChange={handleChange}
                            onKeyPress={handleInputKeyPress}
                        />
                    )}
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <div className={styles['container']}>
                        <button
                            onClick={decreasePage}
                            className={styles['button']}
                            disabled={currentPage == 1}
                        >
                            <AiOutlineArrowLeft size={20} />
                            Prev
                        </button>
                        <div className={styles['pagination-content']}>
                            <div className={styles['left']}>
                                {leftPages.map((page) => (
                                    <div
                                        key={page}
                                        onClick={() => goTo(page)}
                                        className={`${styles.page} ${
                                            currentPage === page
                                                ? styles['active-page']
                                                : styles['page']
                                        }`}
                                    >
                                        {page}
                                    </div>
                                ))}
                            </div>
                            {totalPages > 5 && (
                                <div>
                                    <BsThreeDots
                                        size={16}
                                        cursor={'pointer'}
                                        onClick={() =>
                                            setOpenGoto((prev) => !prev)
                                        }
                                    />
                                </div>
                            )}
                            <div className={styles['right']}>
                                {rightPages.map((page) => (
                                    <div
                                        key={page}
                                        onClick={() => goTo(page)}
                                        className={`${styles.page} ${
                                            currentPage === page
                                                ? styles['active-page']
                                                : styles['page']
                                        }`}
                                    >
                                        {page}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button
                            onClick={increasePage}
                            className={styles['button']}
                            disabled={currentPage == totalPages}
                        >
                            Next
                            <AiOutlineArrowRight size={20} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

import { Pagination } from "@/interfaces";
import styles from "./index.module.scss";
import { MdOutlineArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import classNames from "classnames";
import { ReactNode, useState } from "react";

interface Props {
    pagination: Pagination;
    loading?: boolean;
    goToPage?: (page: number) => any;
}

export function TablePagination({
    pagination,
    loading,
    goToPage = () => null,
}: Props) {
    const {
        page,
        numOfItemsPerPage,
        itemCount,
        pageCount,
        hasPreviousPage,
        hasNextPage,
    } = pagination;

    const renderPageNumbers = () => {
        const pageDivs: ReactNode[] = [];
        const numAhead = pageCount - page + 1;
        const numBehind = pageCount - numAhead;

        if (numAhead < 6 && numBehind > 0) {
            const offset = 6 - numAhead;
            const firstIndexOffset = offset > numBehind ? numBehind : offset;
            const firstIndex = page - firstIndexOffset;

            for (let i = firstIndex; i <= pageCount; i++) {
                pageDivs.push(
                    <PageDiv
                        ispage={i === page}
                        key={i}
                        value={i}
                        onSelect={() => goToPage(i)}
                        loading={loading}
                    />
                );
            }
        } else if (numAhead <= 6) {
            for (let i = page; i <= pageCount; i++) {
                pageDivs.push(
                    <PageDiv
                        ispage={i === page}
                        key={i}
                        value={i}
                        onSelect={() => goToPage(i)}
                        loading={loading}
                    />
                );
            }
        } else {
            for (let i = 0; i < 3; i++) {
                pageDivs.push(
                    <PageDiv
                        ispage={i + page === page}
                        key={i}
                        value={i + page}
                        onSelect={() => goToPage(i + page)}
                        loading={loading}
                    />
                );
            }

            pageDivs.push(
                <PageDiv
                    ispage={false}
                    key={3}
                    value={"..."}
                    onSelect={() => goToPage(page + 3)}
                    loading={loading}
                />
            );

            for (let i = pageCount - 2; i <= pageCount; i++) {
                pageDivs.push(
                    <PageDiv
                        ispage={i === page}
                        key={i}
                        value={i}
                        onSelect={() => goToPage(i)}
                        loading={loading}
                    />
                );
            }
        }

        return pageDivs;
    };

    return (
        <div className={styles["pagination-wrapper"]}>
            <div className={styles["showing"]}>
                Showing {numOfItemsPerPage * page} of {itemCount}
            </div>
            <div className={styles.pagination}>
                <button disabled={!hasPreviousPage}>
                    <MdOutlineArrowBackIosNew />
                    Prev
                </button>
                <div className={styles["page-numbers"]}>
                    {renderPageNumbers()}
                </div>
                <button disabled={!hasNextPage}>
                    Next
                    <MdArrowForwardIos />
                </button>
            </div>
            <div className={styles["items-per-page"]}>
                <div className={styles.text}>Items per page</div>
                <select value={numOfItemsPerPage}>
                    {Array.from({ length: 10 }).map((_, idx) => (
                        <option key={idx} value={(idx + 1) * 5}>
                            {(idx + 1) * 5}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

interface PageDivProps {
    ispage: boolean;
    onSelect: () => any;
    value: number | string;
    loading?: boolean;
}

const PageDiv = ({ ispage, onSelect, value, loading }: PageDivProps) => {
    return (
        <div
            className={classNames(
                styles["number"],
                ispage ? styles.selected : "",
                loading ? styles.loading : ""
            )}
            onClick={() => {
                if (!ispage && !loading) {
                    onSelect();
                }
            }}
        >
            {value}
        </div>
    );
};

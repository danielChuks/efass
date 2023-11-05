import { Pagination } from "@/interfaces";
import { useEffect, useState } from "react";

interface Props<T = any> {
    numOfItemsPerPage?: number;
    data: T[];
}

export function useTable<T = any>({ numOfItemsPerPage = 5, data }: Props) {
    const [compiledData, setCompiledData] = useState<Record<number, T[]>>({});
    const [pagination, setPagination] = useState<Pagination>({
        page: 1,
        numOfItemsPerPage,
        itemCount: data.length,
        pageCount: Math.ceil(data.length / numOfItemsPerPage),
        hasPreviousPage: false,
        hasNextPage: Math.ceil(data.length / numOfItemsPerPage) > 1,
    });

    const { page, numOfItemsPerPage: itemsPerPage, pageCount } = pagination;

    const goToPage = (page: number) => {
        if (compiledData[page]) {
            setPagination((old) => ({
                ...old,
                page,
                hasPreviousPage: page > 1,
                hasNextPage: !!compiledData[page + 1],
            }));
        }
    };

    const generateCompiledData = () => {
        const newCompiledData: Record<number, T[]> = {};

        for (let i = 1; i <= pageCount; i++) {
            const pageData: T[] = [];
            const initial = itemsPerPage * (i - 1);
            const upperLimit = initial + itemsPerPage;

            inner: for (let j = initial; j < upperLimit; j++) {
                if (j >= data.length) {
                    break inner;
                }

                pageData.push(data[j]);
            }
            newCompiledData[i] = pageData;
        }

        setCompiledData(newCompiledData);
    };

    const changeItemsPerPage = (num: number) => {
        if (num <= 0) return;

        setPagination((old) => ({
            ...old,
            numOfItemsPerPage: num,
            page: 1,
        }));
    };

    useEffect(() => {
        generateCompiledData();
    }, [itemsPerPage, pageCount]);

    useEffect(() => {
        const newPageCount = Math.ceil(data.length / itemsPerPage);
        setPagination((old) => ({
            ...old,
            pageCount: newPageCount,
            itemCount: data.length,
        }));
    }, [data, itemsPerPage]);

    useEffect(() => {
        setTimeout(() => {
            goToPage(1);
        }, 1000);
    }, []);

    const tableData = compiledData[page] || [];

    return {
        pagination,
        goToPage,
        changeItemsPerPage,
        tableData,
    };
}

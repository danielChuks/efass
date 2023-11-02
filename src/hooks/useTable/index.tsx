import { Pagination } from "@/interfaces";
import { useState } from "react";

interface Props {
    fetchData: (page: number) => any;
}

export function useTable<T>({
    fetchData,
}: Props) {
    const [pagination, setPagination] = useState<Pagination>({
        page: 1,
        numOfItemsPerPage: 10,
        itemCount: 0,
        pageCount: 1,
        hasPreviousPage: false,
        hasNextPage: true,
    });

    return {
        pagination,
        setPagination,
    }
}
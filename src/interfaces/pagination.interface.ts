import { LoadingStatus } from "../enums";

export interface PaginationResponse<T> {
    data: T[];
    pagination: Pagination;
}

export interface Pagination {
    page: number;
    numOfItemsPerPage: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: number;
    hasNextPage: number;
}

export interface PaginationPage<T> {
    number: number;
    content: T[];
}

export interface PaginationTable<T> {
    pages: PaginationPage<T>[];
    size: number;
    status: LoadingStatus;
    totalPages: number;
    totalElements: number;
}

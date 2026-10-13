import type { ReactNode } from "react";
import type { PaginationProps } from "./Pagination";

export interface TableColumn<T> {
    header: string;
    accessor: keyof T;
    cell?: (row: T) => ReactNode;
    className?: string;
}

export interface TableProps<T> {
    columns: TableColumn<T>[];
    data: T[];
    rowKey: keyof T;
    onRowClick?: (row: T) => void;
    pagination?: PaginationProps;
    pageSize?: number;
    emptyMessage?: string;
}

"use client";

import { useState, type ReactNode } from "react";
import type { TableProps } from "../../types/Table";
import Chevron from "./Chevron";
import Pagination from "./Pagination";

export default function Table<T>({
    columns,
    data,
    rowKey,
    onRowClick,
    pagination,
    pageSize,
    emptyMessage = "No data found",
}: TableProps<T>) {
    const [page, setPage] = useState(1);

    const totalPages = pageSize ? Math.max(1, Math.ceil(data.length / pageSize)) : 1;
    const currentPage = Math.min(page, totalPages);
    const rows = pageSize && !pagination
        ? data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        : data;

    const paginationProps = pagination ?? (pageSize
        ? { page: currentPage, pageSize, total: data.length, onPageChange: setPage }
        : undefined);

    return (
        <div className="flex w-full flex-col items-start overflow-hidden rounded-2xl border-[0.8px] border-[#E2E8F0] bg-white">
            <div className="w-full overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs">
                    <thead>
                        <tr className="border-b-[0.8px] border-[#E2E8F0]">
                            {columns.map((column) => (
                                <th
                                    key={String(column.accessor)}
                                    className={`h-10 px-3 font-medium whitespace-nowrap text-[#64748B] ${column.className ?? ""}`}
                                >
                                    {column.header}
                                </th>
                            ))}
                            {onRowClick && <th className="w-12" />}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length + (onRowClick ? 1 : 0)}
                                    className="h-24 text-center text-[#64748B]"
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            rows.map((row) => (
                                <tr
                                    key={String(row[rowKey])}
                                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                                    className={`h-12 border-b-[0.8px] border-[#E2E8F0] ${
                                        onRowClick ? "cursor-pointer hover:bg-[#F8FAFC]" : ""
                                    }`}
                                >
                                    {columns.map((column, i) => (
                                        <td
                                            key={String(column.accessor)}
                                            className={`px-3 whitespace-nowrap ${
                                                i === 0 ? "font-semibold text-[#0F172A]" : "text-[#64748B]"
                                            } ${column.className ?? ""}`}
                                        >
                                            {column.cell ? column.cell(row) : (row[column.accessor] as ReactNode)}
                                        </td>
                                    ))}
                                    {onRowClick && (
                                        <td className="px-3 text-[#0F172A]">
                                            <Chevron direction="right" />
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {paginationProps && <Pagination {...paginationProps} />}
        </div>
    );
}

import type { PaginationProps } from "../../types/Pagination";
import Chevron from "./Chevron";

function getPages(current: number, totalPages: number): (number | "…")[] {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (current <= 3) return [1, 2, 3, "…", totalPages];
    if (current >= totalPages - 2) return [1, "…", totalPages - 2, totalPages - 1, totalPages];
    return [1, "…", current - 1, current, current + 1, "…", totalPages];
}

const format = (n: number) => n.toLocaleString("en-US");

export default function Pagination({ page, pageSize, total, onPageChange }: PaginationProps) {
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
    const to = Math.min(page * pageSize, total);

    return (
        <div className="flex w-full items-center justify-between px-3 py-4 text-xs">
            <span className="text-[#64748B]">
                Showing {format(from)}–{format(to)} of {format(total)}
            </span>
            <div className="flex items-center gap-1 font-semibold text-[#64748B]">
                <button
                    type="button"
                    disabled={page <= 1}
                    onClick={() => onPageChange(page - 1)}
                    className="flex size-6 cursor-pointer items-center justify-center rounded-md hover:bg-[#F1F5F9] disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Previous page"
                >
                    <Chevron direction="left" />
                </button>
                {getPages(page, totalPages).map((item, i) =>
                    item === "…" ? (
                        <span key={`gap-${i}`} className="px-1">
                            …
                        </span>
                    ) : (
                        <button
                            key={item}
                            type="button"
                            onClick={() => onPageChange(item)}
                            aria-current={item === page ? "page" : undefined}
                            className={`h-6 min-w-6 cursor-pointer rounded-md px-1 ${
                                item === page ? "bg-[#EFFBFF] text-[#28C5F4]" : "hover:bg-[#F1F5F9]"
                            }`}
                        >
                            {format(item)}
                        </button>
                    )
                )}
                <button
                    type="button"
                    disabled={page >= totalPages}
                    onClick={() => onPageChange(page + 1)}
                    className="flex size-6 cursor-pointer items-center justify-center rounded-md hover:bg-[#F1F5F9] disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Next page"
                >
                    <Chevron direction="right" />
                </button>
            </div>
        </div>
    );
}

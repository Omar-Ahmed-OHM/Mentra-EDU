import type { Status as StatusProps } from "../../types/Stauts";

const variants: Record<StatusProps["status"], { classes: string; label: string }> = {
    success: { classes: "bg-[#EFFBFF] text-[#28C5F4]", label: "Active" },
    loading: { classes: "bg-[#FFF8EB] text-[#9A5B00]", label: "Pending" },
    error: { classes: "bg-[#FEF2F2] text-[#EF4444]", label: "Inactive" },
};

export default function Status({ status, label }: StatusProps) {
    const variant = variants[status];

    return (
        <span
            className={`inline-flex h-7 w-fit shrink-0 items-center gap-1.5 rounded-[14px] px-3 text-xs font-medium whitespace-nowrap ${variant.classes}`}
        >
            <span className="size-1.5 rounded-full bg-current" />
            {label ?? variant.label}
        </span>
    );
}

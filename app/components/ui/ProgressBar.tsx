import type { ProgressBarProps } from "../../types/ProgressBar";

export default function ProgressBar({ value, color = "#16A34A", label }: ProgressBarProps) {
    const percent = Math.min(100, Math.max(0, value));

    return (
        <div className="flex w-full flex-col gap-2">
            {label && (
                <span className="text-sm font-semibold text-[#475569]">
                    {label} · {Math.round(percent)}%
                </span>
            )}
            <div
                role="progressbar"
                aria-valuenow={percent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={label}
                className="flex h-1.5 w-full overflow-hidden rounded-[3px] bg-[#F1F5F9]"
            >
                <div
                    className="h-full rounded-[3px] transition-[width] duration-300"
                    style={{ width: `${percent}%`, backgroundColor: color }}
                />
            </div>
        </div>
    );
}

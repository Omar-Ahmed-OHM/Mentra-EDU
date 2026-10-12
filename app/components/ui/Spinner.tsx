import type { SpinnerProps } from "../../types/Spinner";

const sizeClasses = {
    sm: "size-4",
    md: "size-6",
    lg: "size-10",
    xl: "size-14",
};

const colorClasses = {
    current: "text-current",
    primary: "text-primary",
    white: "text-white",
};

export default function Spinner({ size = "sm", color = "current", label = "Loading" }: SpinnerProps) {
    return (
        <span role="status" className={`inline-flex shrink-0 ${sizeClasses[size]} ${colorClasses[color]}`}>
            <svg className="size-full animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="3" className="opacity-20" />
                <circle
                    cx="12"
                    cy="12"
                    r="9.5"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="60"
                    strokeDashoffset="42"
                />
            </svg>
            <span className="sr-only">{label}</span>
        </span>
    );
}

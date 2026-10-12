"use client";

import type { ButtonProps } from "../../types/Button";
import Spinner from "./Spinner";

const variantClasses = {
    form: "flex-none grow-0 p-0 w-[418.4px] h-12 rounded-xl bg-primary text-white hover:bg-primary-dark",
    primary: "h-12 px-5 rounded-xl bg-primary text-white hover:bg-primary-dark",
    outline: "h-12 px-5 rounded-xl bg-white text-[#334155] border border-[#CBD5E1] hover:bg-[#F8FAFC]",
};

export default function Button({
    children,
    variant = "form",
    isLoading = false,
    icon,
    type = "button",
    disabled,
    ...rest
}: ButtonProps) {
    return (
        <button
            {...rest}
            type={type}
            disabled={disabled || isLoading}
            aria-busy={isLoading}
            className={`flex flex-row items-center justify-center gap-2 font-semibold transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${variantClasses[variant]}`}
        >
            {isLoading ? <Spinner /> : icon && <span className="flex shrink-0 items-center">{icon}</span>}
            {children}
        </button>
    );
}

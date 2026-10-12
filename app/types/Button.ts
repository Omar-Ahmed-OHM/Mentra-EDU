import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
    variant?: "form" | "primary" | "outline";
    isLoading?: boolean;
    icon?: ReactNode;
}

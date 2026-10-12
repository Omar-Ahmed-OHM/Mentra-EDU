import type { InputHTMLAttributes, ReactNode, Ref } from "react";
import type { ZodType } from "zod";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
    name: string;
    label?: string;
    icon?: ReactNode;
    schema?: ZodType<string>;
    error?: string | null;
    onValueChange?: (value: string, isValid: boolean) => void;
    ref?: Ref<HTMLInputElement>;
}

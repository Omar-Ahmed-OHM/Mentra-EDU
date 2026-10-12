"use client";

import { useId, useState } from "react";
import { validateField } from "../../lib/validation";
import type { InputProps } from "../../types/Input";

export default function Input({
    id: idProp,
    type = "text",
    label,
    icon,
    schema,
    error: externalError,
    onValueChange,
    onChange,
    onBlur,
    ...rest
}: InputProps) {
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const errorId = `${id}-error`;

    const [schemaError, setSchemaError] = useState<string | null>(null);
    const [touched, setTouched] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;
    const error = externalError ?? (touched ? schemaError : null);

    const validate = (value: string) => {
        if (!schema) return true;
        const message = validateField(schema, value);
        setSchemaError(message);
        return message === null;
    };

    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label htmlFor={id} className="text-sm text-foreground">
                    {label}
                </label>
            )}

            <div
                className={`box-border flex flex-row items-center px-3.5 gap-2.5 w-[418.4px] h-12 bg-white border-[0.8px] border-solid rounded-xl flex-none grow-0 ${
                    error ? "border-red-500" : "border-[#CBD5E1] focus-within:border-primary"
                }`}
            >
                {icon && <span className="flex shrink-0 items-center text-[#94A3B8]">{icon}</span>}

                <input
                    {...rest}
                    id={id}
                    type={inputType}
                    aria-invalid={!!error}
                    aria-describedby={error ? errorId : undefined}
                    onChange={(e) => {
                        const isValid = validate(e.target.value);
                        onValueChange?.(e.target.value, isValid);
                        onChange?.(e);
                    }}
                    onBlur={(e) => {
                        setTouched(true);
                        validate(e.target.value);
                        onBlur?.(e);
                    }}
                    className="flex-1 min-w-0 h-full bg-transparent outline-none text-foreground placeholder:text-[#94A3B8]"
                />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="flex shrink-0 items-center text-[#94A3B8] hover:text-foreground"
                    >
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                )}
            </div>

            {error && (
                <p id={errorId} className="text-xs text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}

function EyeIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}

function EyeOffIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M10.7 5.1A10.9 10.9 0 0 1 12 5c6.5 0 10 7 10 7a17.6 17.6 0 0 1-2.2 3.2M6.6 6.6A17.4 17.4 0 0 0 2 12s3.5 7 10 7a10.6 10.6 0 0 0 5.4-1.6" />
            <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
            <path d="m2 2 20 20" />
        </svg>
    );
}

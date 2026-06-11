"use client";

import { Button } from "antd";
import { ReactNode } from "react";
import clsx from "clsx";

type ButtonVariant =
    | "save"
    | "reset"
    | "back"
    | "approve"
    | "reject"
    | "cancel"
    | "search"
    | "add";

interface Props {
    children: ReactNode;
    icon?: ReactNode;
    onClick?: () => void;
    loading?: boolean;
    disabled?: boolean;
    className?: string;
    variant?: ButtonVariant;
    htmlType?: "button" | "submit" | "reset";
}

const variantClasses: Record<ButtonVariant, string> = {
    add: `
        !bg-green-600
        !text-white
        !border-green-600
        hover:!bg-green-700
        hover:!border-green-700
        hover:!text-white
    `,

    search: `
        !bg-[#1C2D6B]
        !text-white
        !border-[#1C2D6B]
        hover:!bg-[#253A85]
        hover:!border-[#253A85]
        hover:!text-white
    `,

    save: `
        !bg-blue-600
        !text-white
        !border-blue-600
        hover:!bg-blue-950
        hover:!border-blue-950
        hover:!text-white
    `,

    approve: `
        !bg-emerald-600
        !text-white
        !border-emerald-600
        hover:!bg-emerald-700
        hover:!border-emerald-700
        hover:!text-white
    `,

    reject: `
        !bg-red-600
        !text-white
        !border-red-600
        hover:!bg-red-700
        hover:!border-red-700
        hover:!text-white
    `,

    cancel: `
        !bg-slate-500
        !text-white
        !border-slate-500
        hover:!bg-slate-600
        hover:!border-slate-600
        hover:!text-white
    `,

    back: `
        !bg-slate-600
        !text-white
        !border-slate-600
        hover:!bg-slate-700
        hover:!border-slate-700
        hover:!text-white
    `,

    reset: `
        !bg-blue-50
        !text-[#1C2D6B]
        !border-gray-300
        hover:!bg-[#1C2D6B]
        hover:!text-white
        hover:!border-[#1C2D6B]
    `,
};

export default function AppButton({
    children,
    icon,
    onClick,
    loading,
    disabled,
    className,
    variant = "save",
    htmlType = "button",
}: Props) {
    return (
        <Button
            htmlType={htmlType}
            onClick={onClick}
            loading={loading}
            disabled={disabled}
            className={clsx(
                "h-9 min-w-32.5 rounded-md font-medium flex items-center justify-center gap-2",
                variantClasses[variant],
                className
            )}
        >
            {icon}
            {children}
        </Button>
    );
}
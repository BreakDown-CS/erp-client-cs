"use client";

import { Form, Input } from "antd";
import {
    Control,
    Controller,
    FieldValues,
    Path,
} from "react-hook-form";

interface Props<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    placeholder: string;
    type?: string;
    disabled?: boolean;
}

export default function FormInput<T extends FieldValues>({
    name,
    control,
    placeholder,
    type = "text",
    disabled,
}: Props<T>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Form.Item
                    style={{ margin: 0 }}
                    validateStatus={
                        fieldState.error ? "error" : ""
                    }
                    help={fieldState.error?.message}
                >
                    <div className="relative">
                        {placeholder && (
                            <span className="absolute right-3 top-2 z-10 bg-white px-1 text-xs text-gray-500">
                                {placeholder}
                            </span>
                        )}
                        <Input
                            {...field}
                            type={type}
                            disabled={disabled}
                        />
                    </div>
                </Form.Item>
            )}
        />
    );
}
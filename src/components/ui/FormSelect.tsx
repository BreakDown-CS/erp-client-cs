"use client";

import { Form, Select } from "antd";
import {
    Control,
    Controller,
    FieldValues,
    Path,
} from "react-hook-form";

interface Option {
    label: string;
    value: string | number | boolean;
}

interface Props<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    placeholder: string;
    options: Option[];
}

export default function FormSelect<T extends FieldValues>({
    name,
    control,
    placeholder,
    options,
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

                        <Select
                            value={field.value ?? undefined}
                            onChange={field.onChange}
                            options={options}
                            placeholder={placeholder}
                            style={{ width: "100%" }}
                        />
                    </div>
                </Form.Item>
            )}
        />
    );
}
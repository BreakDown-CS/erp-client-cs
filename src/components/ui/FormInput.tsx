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
}

export default function FormInput<T extends FieldValues>({
    name,
    control,
    placeholder,
    type = "text",
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
                    <Input
                        {...field}
                        type={type}
                        placeholder={placeholder}
                    />
                </Form.Item>
            )}
        />
    );
}
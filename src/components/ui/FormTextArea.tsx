"use client";

import { Form, Input } from "antd";
import {
    Control,
    Controller,
    FieldValues,
    Path,
} from "react-hook-form";

const { TextArea } = Input;

interface Props<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    placeholder: string;
    rows?: number;
    maxLength?: number;
}

export default function FormTextArea<
    T extends FieldValues
>({
    name,
    control,
    placeholder,
    rows = 4,
    maxLength,
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
                    <TextArea
                        {...field}
                        rows={rows}
                        placeholder={placeholder}
                        maxLength={maxLength}
                    />
                </Form.Item>
            )}
        />
    );
}
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
    value: string | number;
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
                    <Select
                        // value={field.value}
                        placeholder={placeholder}
                        options={options}
                        onChange={field.onChange}
                    />
                </Form.Item>
            )}
        />
    );
}
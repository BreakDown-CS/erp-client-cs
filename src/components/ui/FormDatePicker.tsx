"use client";

import dayjs from "dayjs";
import { DatePicker, Form } from "antd";
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
}

export default function FormDatePicker<
    T extends FieldValues
>({
    name,
    control,
    placeholder,
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
                        <DatePicker
                            style={{ width: "100%" }}
                            format="DD/MM/YYYY"
                            value={
                                field.value
                                    ? dayjs(
                                        field.value as string
                                    )
                                    : null
                            }
                            onChange={(date) =>
                                field.onChange(
                                    date
                                        ? date.format(
                                            "YYYY-MM-DD"
                                        )
                                        : ""
                                )
                            }
                        />
                    </div>
                </Form.Item>
            )}
        />
    );
}
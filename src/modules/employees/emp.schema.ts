import { z } from "zod";

export const ListStaffSchema = z.object({
    username: z
        .string(),

    em_code: z
        .string(),

    branches_id: z
        .string(),

    full_name: z
        .string(),

    status: z
        .string(),

    department_id: z
        .string(),
});

export type ListStaffForm = z.infer<typeof ListStaffSchema>;

export const SaveStaffSchema = z
    .object({
        username: z.string().trim(),
        password: z.string().min(8, "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร"),
        password_confirm: z.string(),
        first_name_th: z.string().min(1, "กรุณากรอกชื่อ"),
        last_name_th: z.string().min(1, "กรุณากรอกนามสกุล"),
        branch_id: z.string().min(1, "กรุณาเลือกสาขา"),
        department_id: z.string().min(1, "กรุณาเลือกแผนก"),
        position_id: z.string().min(1, "กรุณาเลือกตำแหน่ง"),
        status_id: z.string().min(1, "กรุณาเลือกสถานะ"),
        email: z.string().email("รูปแบบอีเมลไม่ถูกต้อง").or(z.literal("")),
        phone: z.string().or(z.literal("")),
        em_code: z.string(),
        first_name_en: z.string(),
        last_name_en: z.string(),
        nickname: z.string(),
        gender: z.string(),
        birthday: z.string(),
        remark: z.string(),
    })
    .refine((data) => data.password === data.password_confirm, {
        path: ["password_confirm"],
        message: "รหัสผ่านไม่ตรงกัน",
    });

export type SaveStaffForm = z.infer<typeof SaveStaffSchema>;
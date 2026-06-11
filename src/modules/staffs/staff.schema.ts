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

export const SaveStaffSchema = z.object({
    username: z
        .string(),
    em_code: z
        .string(),
    status: z
        .string(),
    branches_id: z
        .number(),
    password: z
        .string(),
    password_confirm: z
        .string(),
    start_work: z
        .string(),
    end_work: z
        .string(),
    card_id: z
        .string(),
    work_type: z
        .string(),
    department_id: z
        .number(),
    full_name: z
        .string(),
    nickname: z
        .string(),
    tel: z
        .string(),
    email: z
        .string(),
    birthday: z
        .string(), 
    bank_no: z
        .string(),
    bank_id: z
        .number(),
    address: z
        .string(),
});

export type SaveStaffForm = z.infer<typeof SaveStaffSchema>;
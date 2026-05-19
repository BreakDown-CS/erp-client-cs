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
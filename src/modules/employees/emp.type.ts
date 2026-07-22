export type PayloadDropDown = {
    label: string;
    value: string | number | boolean;
}

export type PayloadListStaff = {
    username?: string;
    employee_code?: string;
    branch_id?: string | null;
    full_name?: string;
    status_id?: string | null;
    department_id?: string | null;
    page: number;
    limit: number;
}

export type StaffList = {
    employee_id: string;
    employee_code: string;
    username: string;
    full_name: string
    nick_name: string
    branch_name: string;
    department_name: string;
    position_name: string;
    employee_status: string;
}

export type PayloadSaveStaff = {
    em_code: string;
    first_name_th: string;
    last_name_th: string;
    first_name_en: string;
    last_name_en: string;
    nickname: string;
    gender: string;
    birthday: string;
    email: string;
    phone: string;
    branch_id: string;
    department_id: string;
    position_id: string;
    status_id: string;
    username: string;
    password: string;
    remark: string;
}
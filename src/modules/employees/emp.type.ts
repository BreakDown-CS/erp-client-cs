export type PayloadDropDown = {
    label: string;
    value: string | number | boolean;
}

export type PayloadListStaff = {
    username: string;
    em_code: string;
    branches_id: string;
    full_name: string;
    status: string;
    department_id: string;
    page: number;
    limit: number;
}

export type StaffList = {
    id: string;
    employee_code: string;
    first_name: string;
    last_name: string;
    username: string;
    branch_name: string;
    department_name: string;
    position_name: string;
    status: string;
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
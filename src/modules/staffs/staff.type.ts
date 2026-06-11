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
    username: string;
    em_code: string;
    status: string;
    branches_id: number;
    password: string;
    password_confirm: string;
    start_work: string;
    end_work: string;
    card_id: string;
    work_type: string;
    department_id: number;
    full_name: string;
    nickname: string;
    tel: string;
    email: string;
    birthday: string;
    bank_no: string;
    bank_id: number;
    address: string;
}
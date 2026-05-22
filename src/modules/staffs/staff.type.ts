export type PayloadListStaff = {
    username: string;
    em_code: string;
    branches_id: string;
    full_name: string;
    status: string;
    department_id: string;
    page: number;
    limit: number;
};

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
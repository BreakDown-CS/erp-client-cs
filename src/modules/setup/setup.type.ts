export type SetupOption = {
    label: string;
    value: string | number | boolean;
}

export type FormSetupForSaveEmployees = {
    branches: SetupOption[];
    employees_status: SetupOption[];
    employees_department: SetupOption[];
    positions: SetupOption[];
}
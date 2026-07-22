"use client";

import { useEffect, useState } from "react";
import { Form, Space, Table } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ListRestart, Search, UserRoundPlus } from "lucide-react";
import AppButton from "@/components/ui/AppButton";
import FormInput from "@/components/ui/FormInput";
import FormSelect from "@/components/ui/FormSelect";
import {
    ListStaffForm,
    ListStaffSchema,
} from "@/modules/employees/emp.schema";
import { PayloadListStaff, StaffList } from "@/modules/employees/emp.type";
import { StaffListColumns } from "./columns_staff_list";
import SaveStaffPage from "../save/page";
import { GetBranchesList, GetDepartmentList, GetEmployeeStatusList, GetPositionsList, GetStaffList } from "@/modules/employees/emp.service";
import { FormSetupForSaveEmployees } from "@/modules/setup/setup.type";

export default function StaffListPage() {
    const [opneDrawerNewStaff, setOpenDrawerNewStaff] = useState<boolean>(false);
    const [staffEditId, setStaffEditId] = useState<string>("")
    const [staffList, setStaffList] = useState<StaffList[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [total, setTotal] = useState(0);
    const [searchForm, setSearchForm] = useState<ListStaffForm>({
        username: "",
        employee_code: "",
        branches_id: "",
        full_name: "",
        status_id: "",
        department_id: "",
    });
    const [setUpOption, setSetUpOption] = useState<FormSetupForSaveEmployees>({
        branches: [],
        employees_department: [],
        employees_status: [],
        positions: []
    });

    const { control, handleSubmit, reset } = useForm<ListStaffForm>({
        resolver: zodResolver(ListStaffSchema),
        defaultValues: {
            username: "",
            employee_code: "",
            branches_id: "",
            full_name: "",
            status_id: "",
            department_id: "",
        },
    });

    const onSubmit = async (form: ListStaffForm) => {
        setSearchForm(form);
        loadStaff(currentPage, pageSize, form);
    };

    const loadStaff = async (page = currentPage, limit = pageSize, form = searchForm) => {
        const payload: PayloadListStaff = {
            username: form.username,
            employee_code: form.employee_code,
            branch_id: form.branches_id || null,
            department_id: form.department_id || null,
            status_id: form.status_id || null,
            full_name: form.full_name,
            page,
            limit,
        };

        const result = await GetStaffList(payload);

        switch (result.code) {
            case 200:
                setStaffList(result.result);
                setTotal(result.meta.total);
                setCurrentPage(result.meta.page);
                setPageSize(result.meta.limit);
                break;
            default:
                break;
        }
    };

    const handleReset = () => {
        reset();
    };

    const handleEditStaff = (staffId: string) => {
        setStaffEditId(staffId)
        setOpenDrawerNewStaff(true)
    }

    useEffect(() => {
        const fetchData = async () => {
            const [branchOptions, departmentOptions, statusOptions, positionsOptions] = await Promise.all([
                GetBranchesList(),
                GetDepartmentList(),
                GetEmployeeStatusList(),
                GetPositionsList(),
            ]);
            setSetUpOption({
                branches: branchOptions.result,
                employees_department: departmentOptions.result,
                employees_status: statusOptions.result,
                positions: positionsOptions.result
            })
        };

        void fetchData();
    }, []);

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold">รายการพนักงาน</h1>

                <Space>
                    <AppButton
                        variant="back"
                        icon={<UserRoundPlus size={16} />}
                        onClick={() => setOpenDrawerNewStaff(true)}
                    >
                        เพิ่มพนักงาน
                    </AppButton>

                    <AppButton
                        variant="save"
                        icon={<Search size={16} />}
                        onClick={handleSubmit(onSubmit)}
                    >
                        ค้นหารายการ
                    </AppButton>

                    <AppButton
                        variant="reset"
                        icon={<ListRestart size={16} />}
                        onClick={handleReset}
                    >
                        รีเซ็ตฟอร์ม
                    </AppButton>
                </Space>
            </div>

            <Form
                layout="vertical"
                onFinish={handleSubmit(onSubmit)}
            >
                <div className="grid grid-cols-6 gap-3">
                    <FormInput<ListStaffForm>
                        name="username"
                        control={control}
                        placeholder="ชื่อผู้ใช้งาน"
                    />

                    <FormInput<ListStaffForm>
                        name="employee_code"
                        control={control}
                        placeholder="EM CODE"
                    />

                    <FormSelect<ListStaffForm>
                        name="branches_id"
                        control={control}
                        placeholder="เลือกสาขา"
                        options={setUpOption.branches}
                    />

                    <FormInput<ListStaffForm>
                        name="full_name"
                        control={control}
                        placeholder="ชื่อเต็ม"
                    />

                    <FormSelect<ListStaffForm>
                        name="status_id"
                        control={control}
                        placeholder="เลือกสถานะ"
                        options={setUpOption.employees_status}
                    />

                    <FormSelect<ListStaffForm>
                        name="department_id"
                        control={control}
                        placeholder="เลือกแผนก"
                        options={setUpOption.employees_department}
                    />
                </div>
            </Form>

            <Table<StaffList>
                rowKey="employee_id"
                className="mt-4"
                columns={StaffListColumns(handleEditStaff)}
                dataSource={staffList}
                pagination={{
                    current: currentPage,
                    pageSize,
                    total,
                    showSizeChanger: true,
                    pageSizeOptions: [10, 25, 50, 100],
                    onChange: (page, size) => {
                        loadStaff(page, size);
                    },
                }}
                scroll={{ y: 550 }}
                size="small"
            />

            <SaveStaffPage staffId={staffEditId} setupOption={setUpOption} opneDrawerStaff={opneDrawerNewStaff} setOpenDrawerNewStaff={setOpenDrawerNewStaff} />
        </>
    );
}
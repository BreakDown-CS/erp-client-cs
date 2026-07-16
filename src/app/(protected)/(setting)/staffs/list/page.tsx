"use client";

import { useMemo, useState } from "react";
import { Form, Space, Table } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ListRestart, Search, UserRoundPlus } from "lucide-react";

import AppButton from "@/components/ui/AppButton";
import FormInput from "@/components/ui/FormInput";
import FormSelect from "@/components/ui/FormSelect";

import {
    branchOptions,
    departmentOptions,
    statusOptions,
} from "@/modules/staffs/staff.constants";

import {
    ListStaffForm,
    ListStaffSchema,
} from "@/modules/staffs/staff.schema";

import { StaffList } from "@/modules/staffs/staff.type";

import { StaffListColumns } from "./columns_staff_list";
import SaveStaffPage from "../save/page";

export default function StaffListPage() {
    const [opneDrawerNewStaff, setOpenDrawerNewStaff] = useState<boolean>(false);
    
    const { control, handleSubmit, reset } = useForm<ListStaffForm>({
        resolver: zodResolver(ListStaffSchema),
        defaultValues: {
            username: "",
            em_code: "",
            branches_id: "",
            full_name: "",
            status: "",
            department_id: "",
        },
    });

    /**
     * Mock Data
     */
    const mockData = useMemo<StaffList[]>(
        () =>
            Array.from({ length: 100 }, (_, index) => ({
                id: String(index + 1),
                employee_code: `EMP${String(index + 1).padStart(4, "0")}`,
                first_name: `FirstName${index + 1}`,
                last_name: `LastName${index + 1}`,
                username: `user${index + 1}`,
                branch_name: ["Bangkok", "Chiang Mai", "Khon Kaen", "Phuket"][
                    index % 4
                ],
                department_name: ["IT", "HR", "Finance", "Sales"][index % 4],
                position_name: [
                    "Developer",
                    "Manager",
                    "Officer",
                    "Supervisor",
                ][index % 4],
                status: index % 2 === 0 ? "ACTIVE" : "INACTIVE",
            })),
        []
    );

    const [staffList, setStaffList] = useState<StaffList[]>(mockData);

    /**
     * Search
     */
    const onSubmit = (form: ListStaffForm) => {
        const result = mockData.filter((item) => {
            const fullName = `${item.first_name} ${item.last_name}`.toLowerCase();

            return (
                (!form.username ||
                    item.username
                        .toLowerCase()
                        .includes(form.username.toLowerCase())) &&
                (!form.em_code ||
                    item.employee_code
                        .toLowerCase()
                        .includes(form.em_code.toLowerCase())) &&
                (!form.full_name ||
                    fullName.includes(form.full_name.toLowerCase())) &&
                (!form.branches_id ||
                    item.branch_name === form.branches_id) &&
                (!form.department_id ||
                    item.department_name === form.department_id) &&
                (!form.status ||
                    item.status === form.status)
            );
        });

        setStaffList(result);
    };

    /**
     * Reset Form
     */
    const handleReset = () => {
        reset();
        setStaffList(mockData);
    };

    const handleEditStaff = (staffId: string) => {
        console.log("handleEditStaff : ", staffId)
    }

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
                        name="em_code"
                        control={control}
                        placeholder="EM CODE"
                    />

                    <FormSelect<ListStaffForm>
                        name="branches_id"
                        control={control}
                        placeholder="เลือกสาขา"
                        options={branchOptions}
                    />

                    <FormInput<ListStaffForm>
                        name="full_name"
                        control={control}
                        placeholder="ชื่อเต็ม"
                    />

                    <FormSelect<ListStaffForm>
                        name="status"
                        control={control}
                        placeholder="เลือกสถานะ"
                        options={statusOptions}
                    />

                    <FormSelect<ListStaffForm>
                        name="department_id"
                        control={control}
                        placeholder="เลือกแผนก"
                        options={departmentOptions}
                    />
                </div>
            </Form>

            <Table<StaffList>
                rowKey="id"
                className="mt-4"
                columns={StaffListColumns(handleEditStaff)}
                dataSource={staffList}
                pagination={{
                    pageSize: 25,
                    showSizeChanger: true,
                    pageSizeOptions: [10, 25, 50, 100],
                    showTotal: (total) => `ทั้งหมด ${total} รายการ`,
                }}
                scroll={{ y: 550 }}
                size="small"
            />

            <SaveStaffPage staffId={0} opneDrawerStaff={opneDrawerNewStaff} setOpenDrawerNewStaff={setOpenDrawerNewStaff}/>        
        </>
    );
}
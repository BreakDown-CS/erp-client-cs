"use client"

import AppButton from "@/components/ui/AppButton";
import FormInput from "@/components/ui/FormInput";
import FormSelect from "@/components/ui/FormSelect";
import { branchOptions, departmentOptions, statusOptions } from "@/modules/staffs/staff.constants";
import { ListStaffForm, ListStaffSchema } from "@/modules/staffs/staff.schema";
import { StaffList } from "@/modules/staffs/staff.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Space, Table } from "antd";
import { ListRestart, Search, UserRoundPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { StaffListColumns } from "./columns_staff_list";
import { useState } from "react";

export default function StaffListPage() {
    const { control, handleSubmit, reset, } = useForm<ListStaffForm>({
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

    const dataSource: StaffList[] = Array.from(
        { length: 50 },
        (_, index) => ({
            id: String(index + 1),
            employee_code: `EMP${String(index + 1).padStart(4, "0")}`,
            first_name: `FirstName${index + 1}`,
            last_name: `LastName${index + 1}`,
            username: `user${index + 1}`,
            branch_name: ["Bangkok", "Chiang Mai", "Khon Kaen", "Phuket"][index % 4],
            department_name: ["IT", "HR", "Finance", "Sales"][index % 4],
            position_name: ["Developer", "Manager", "Officer", "Supervisor"][index % 4],
            status: index % 2 === 0 ? "ACTIVE" : "INACTIVE",
        })
    );


    const [staffList, setStaffList] = useState<StaffList[]>(dataSource);

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold">
                    รายการพนักงาน
                </h1>

                <Space>
                    <AppButton
                        variant="back"
                        icon={<UserRoundPlus size={16} />}
                    // onClick={handleClose}
                    >
                        เพิ่มพนักงาน
                    </AppButton>

                    <AppButton
                        variant="reset"
                        icon={<Search size={16} />}
                        onClick={() => reset()}
                    >
                        ค้นหารายการ
                    </AppButton>

                    <AppButton
                        variant="save"
                        icon={<ListRestart size={16} />}
                    // onClick={handleSubmit(onSubmit)}
                    >
                        รีเซ็ตฟอร์ม
                    </AppButton>
                </Space>
            </div>
            <Form layout="vertical">
                <div className="grid grid-cols-10 gap-3 justify-content-center a">
                    {/* USERNAME */}
                    <FormInput<ListStaffForm>
                        name="username"
                        control={control}
                        placeholder="ชื่อผู้ใช้งาน"
                    />

                    {/* EM CODE */}
                    <FormInput<ListStaffForm>
                        name="em_code"
                        control={control}
                        placeholder="EM CODE"
                    />

                    {/* BRANCH */}
                    <FormSelect<ListStaffForm>
                        name="branches_id"
                        control={control}
                        placeholder="เลือกสาขา"
                        options={branchOptions}
                    />

                    {/* FULL NAME */}
                    <FormInput<ListStaffForm>
                        name="full_name"
                        control={control}
                        placeholder="ชื่อเต็ม"
                    />

                    {/* STATUS */}
                    <FormSelect<ListStaffForm>
                        name="status"
                        control={control}
                        placeholder="เลือกสถานะ"
                        options={statusOptions}
                    />

                    {/* DEPARTMENT */}
                    <FormSelect<ListStaffForm>
                        name="department_id"
                        control={control}
                        placeholder="เลือกแผนก"
                        options={departmentOptions}
                    />
                </div>
            </Form>
            <Table<StaffList>
                columns={StaffListColumns}
                dataSource={staffList}
            />
        </>
    )
}
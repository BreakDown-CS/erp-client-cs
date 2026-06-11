"use client"

import AppButton from "@/components/ui/AppButton";
import { ListStaffForm, ListStaffSchema } from "@/modules/staffs/staff.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Space } from "antd";
import { ListRestart, Search, UserRoundPlus } from "lucide-react";
import { useForm } from "react-hook-form";

export const StaffListPage = () => {
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
    return (
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
    )
}

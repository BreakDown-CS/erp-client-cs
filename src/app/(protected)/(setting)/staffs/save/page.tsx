"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Divider, Drawer, Form, Space } from "antd";
import { useForm } from "react-hook-form";
import { SaveStaffForm, SaveStaffSchema } from "@/modules/employees/emp.schema";
import { PayloadSaveStaff } from "@/modules/employees/emp.type";
import { toast } from "sonner";
import Title from "antd/es/typography/Title";
import FormInput from "@/components/ui/FormInput";
import FormSelect from "@/components/ui/FormSelect";
import FormDatePicker from "@/components/ui/FormDatePicker";
import FormTextArea from "@/components/ui/FormTextArea";
import AppButton from "@/components/ui/AppButton";
import { ArrowLeft, ListRestart, Save } from "lucide-react";
import { FormSetupForSaveEmployees } from "@/modules/setup/setup.type";
import { Gender } from "@/modules/employees/emp.constants";
import { InsertStaffNew } from "@/modules/employees/emp.service";

interface Props {
    opneDrawerStaff: boolean;
    setupOption: FormSetupForSaveEmployees
    setOpenDrawerNewStaff: (open: boolean) => void;
    staffId: number;
}

export default function SaveStaffPage({ staffId, opneDrawerStaff, setOpenDrawerNewStaff, setupOption }: Props) {
    const { control, handleSubmit, reset, } = useForm<SaveStaffForm>({
        resolver: zodResolver(SaveStaffSchema),
        defaultValues: {
            em_code: '',
            first_name_th: '',
            last_name_th: '',
            first_name_en: '',
            last_name_en: '',
            nickname: '',
            gender: '',
            birthday: '',
            email: '',
            phone: '',
            branch_id: '',
            department_id: '',
            position_id: '',
            status_id: '',
            username: '',
            password: '',
            password_confirm: '',
            remark: '',
        },
    });

    const onSubmit = async (values: SaveStaffForm) => {
        try {
            const payload: PayloadSaveStaff = {
                ...values,
            };

            const resposer = await InsertStaffNew(payload)

            console.log(resposer)

            toast.success("บันทึกข้อมูลสำเร็จ");
        } catch (error) {
            console.error(error);
            toast.error("บันทึกข้อมูลไม่สำเร็จ");
        }
    };

    const handleClose = () => {
        reset();
        setOpenDrawerNewStaff(false);
    };

    return (
        <Drawer
            title={staffId > 0 ? "แก้ไขพนักงาน" : "เพิ่มพนักงาน"}
            placement="right"
            size={'1000'}
            open={opneDrawerStaff}
            onClose={handleClose}
            extra={
                <Space>
                    <AppButton
                        variant="back"
                        icon={<ArrowLeft size={16} />}
                        onClick={handleClose}
                    >
                        ย้อนกลับ
                    </AppButton>
                    <AppButton
                        variant="reset"
                        icon={<ListRestart size={16} />}
                        onClick={() => reset()}
                    >
                        รีเซ็ตฟอร์ม
                    </AppButton>
                    <AppButton
                        variant="save"
                        icon={<Save size={16} />}
                        onClick={handleSubmit(onSubmit)}
                    >
                        บันทึกรายการ
                    </AppButton>
                </Space>
            }
        >
            <Form layout="vertical">
                <div className="grid grid-cols-3 gap-3 justify-content-center a">

                    {/* USERNAME */}
                    <FormInput<SaveStaffForm>
                        name="username"
                        control={control}
                        placeholder="ชื่อผู้ใช้งาน"
                        disabled
                    />

                    {/* EM CODE */}
                    <FormInput<SaveStaffForm>
                        name="em_code"
                        control={control}
                        placeholder="EM CODE"
                        disabled
                    />

                    {/* STATUS */}
                    <FormSelect<SaveStaffForm>
                        name="status_id"
                        control={control}
                        placeholder="เลือกสถานะ"
                        options={setupOption.employees_status}
                    />

                    {/* POSITION */}
                    <FormSelect<SaveStaffForm>
                        name="position_id"
                        control={control}
                        placeholder="เลือกตำแหน่ง"
                        options={setupOption.positions}
                    />

                    {/* BRANCH */}
                    <FormSelect<SaveStaffForm>
                        name="branch_id"
                        control={control}
                        placeholder="เลือกสาขา"
                        options={setupOption.branches}
                    />

                    {/* DEPARTMENT */}
                    <FormSelect<SaveStaffForm>
                        name="department_id"
                        control={control}
                        placeholder="เลือกแผนก"
                        options={setupOption.employees_department}
                    />

                    {/* PASSWORD */}
                    <FormInput<SaveStaffForm>
                        name="password"
                        control={control}
                        type="password"
                        placeholder="รหัสผ่าน"
                    />
                    {/* PASSWORD CONFIRM */}
                    <FormInput<SaveStaffForm>
                        name="password_confirm"
                        control={control}
                        type="password"
                        placeholder="ยืนยันรหัสผ่าน"
                    />

                    {/* GENDER */}
                    <FormSelect<SaveStaffForm>
                        name="gender"
                        control={control}
                        placeholder="เพศ"
                        options={Gender}
                    />

                    {/*  FIRST NAME THAI */}
                    <FormInput<SaveStaffForm>
                        name="first_name_th"
                        control={control}
                        placeholder="ชื่อเต็ม"
                    />

                    {/* LAST NAME THAI */}
                    <FormInput<SaveStaffForm>
                        name="last_name_th"
                        control={control}
                        placeholder="นามสกุล"
                    />

                    {/*  FIRST NAME EN */}
                    <FormInput<SaveStaffForm>
                        name="first_name_en"
                        control={control}
                        placeholder="First Name"
                    />

                    {/* LAST NAME EN */}
                    <FormInput<SaveStaffForm>
                        name="last_name_en"
                        control={control}
                        placeholder="Last Name"
                    />

                    {/* NICK NAME */}
                    <FormInput<SaveStaffForm>
                        name="nickname"
                        control={control}
                        placeholder="ชือเล่น"
                    />

                    {/* PHONE */}
                    <FormInput<SaveStaffForm>
                        name="phone"
                        control={control}
                        placeholder="เบอร์โทรศัพท์"
                    />

                    {/* EMAIL */}
                    <FormInput<SaveStaffForm>
                        name="email"
                        control={control}
                        placeholder="อีเมล์"
                    />

                </div>
                <Divider titlePlacement="start">
                    <Title level={5} style={{ margin: 0 }}>
                        ข้อมูลเพิ่มเติม
                    </Title>
                </Divider>
                <div className="grid grid-cols-3 gap-3">
                    {/* BIRTHDAY */}
                    <FormDatePicker<SaveStaffForm>
                        name="birthday"
                        control={control}
                        placeholder="วันเกิด"
                    />
                </div>

                <div className="grid grid-cols-1 gap-3 mt-3">

                    {/* remark */}
                    <FormTextArea<SaveStaffForm>
                        name="remark"
                        control={control}
                        placeholder="รายละเอียด"
                        rows={4}
                        maxLength={250}
                    />

                </div>
            </Form>
        </Drawer>
    );
}
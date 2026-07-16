"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Divider, Drawer, Form, Space } from "antd";
import { useForm } from "react-hook-form";
import { SaveStaffForm, SaveStaffSchema } from "@/modules/staffs/staff.schema";
import { PayloadSaveStaff } from "@/modules/staffs/staff.type";
import { toast } from "sonner";
import Title from "antd/es/typography/Title";
import FormInput from "@/components/ui/FormInput";
import FormSelect from "@/components/ui/FormSelect";
import FormDatePicker from "@/components/ui/FormDatePicker";
import FormTextArea from "@/components/ui/FormTextArea";
import { bankOptions, branchOptions, departmentOptions, statusOptions, workTypeOptions } from "@/modules/staffs/staff.constants";
import AppButton from "@/components/ui/AppButton";
import { ArrowLeft, ListRestart, Save } from "lucide-react";

interface Props {
    opneDrawerStaff: boolean;
    setOpenDrawerNewStaff: (open: boolean) => void;
    staffId: number;
}

export default function SaveStaffPage({ staffId, opneDrawerStaff, setOpenDrawerNewStaff }: Props) {
    const { control, handleSubmit, reset, } = useForm<SaveStaffForm>({
        resolver: zodResolver(SaveStaffSchema),
        defaultValues: {
            username: "",
            em_code: "",
            status: "",
            branches_id: 0,
            password: "",
            password_confirm: "",
            start_work: "",
            end_work: "",
            card_id: "",
            work_type: "",
            department_id: 0,
            full_name: "",
            nickname: "",
            tel: "",
            email: "",
            birthday: "",
            bank_no: "",
            bank_id: 0,
            address: "",
        },
    });

    const onSubmit = async (values: SaveStaffForm) => {
        try {
            const payload: PayloadSaveStaff = {
                ...values,
            };

            console.log(payload);

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
                    />

                    {/* EM CODE */}
                    <FormInput<SaveStaffForm>
                        name="em_code"
                        control={control}
                        placeholder="EM CODE"
                    />

                    {/* STATUS */}
                    <FormSelect<SaveStaffForm>
                        name="status"
                        control={control}
                        placeholder="เลือกสถานะ"
                        options={statusOptions}
                    />

                    {/* BRANCH */}
                    <FormSelect<SaveStaffForm>
                        name="branches_id"
                        control={control}
                        placeholder="เลือกสาขา"
                        options={branchOptions}
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

                    {/* START WORK */}
                    <FormDatePicker<SaveStaffForm>
                        name="start_work"
                        control={control}
                        placeholder="วันเริ่มงาน"
                    />

                    {/* END WORK */}
                    <FormDatePicker<SaveStaffForm>
                        name="end_work"
                        control={control}
                        placeholder="วันสิ้นสุดงาน"
                    />

                    {/* CARD ID */}
                    <FormInput<SaveStaffForm>
                        name="card_id"
                        control={control}
                        placeholder="เลขบัครประชาชน"
                    />

                    {/* WORK TYPE */}
                    <FormSelect<SaveStaffForm>
                        name="work_type"
                        control={control}
                        placeholder="ประเภทงาน"
                        options={workTypeOptions}
                    />

                    {/* DEPARTMENT */}
                    <FormSelect<SaveStaffForm>
                        name="department_id"
                        control={control}
                        placeholder="เลือกแผนก"
                        options={departmentOptions}
                    />

                    {/* FULL NAME */}
                    <FormInput<SaveStaffForm>
                        name="full_name"
                        control={control}
                        placeholder="ชื่อเต็ม"
                    />

                    {/* NICK NAME */}
                    <FormInput<SaveStaffForm>
                        name="nickname"
                        control={control}
                        placeholder="ชือเล่น"
                    />

                    {/* TEL */}
                    <FormInput<SaveStaffForm>
                        name="tel"
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

                    {/* BANK_NO */}
                    <FormInput<SaveStaffForm>
                        name="bank_no"
                        control={control}
                        placeholder="เลขบัญชี"
                    />

                    {/* BANK_ID */}
                    <FormSelect<SaveStaffForm>
                        name="bank_id"
                        control={control}
                        placeholder="ชื่อธนาคาร"
                        options={bankOptions}
                    />
                </div>

                <div className="grid grid-cols-1 gap-3 mt-3">

                    {/* ADDRESS */}
                    <FormTextArea<SaveStaffForm>
                        name="address"
                        control={control}
                        placeholder="รายละเอียดที่อยู่"
                        rows={4}
                        maxLength={250}
                    />

                </div>
            </Form>
        </Drawer>
    );
}
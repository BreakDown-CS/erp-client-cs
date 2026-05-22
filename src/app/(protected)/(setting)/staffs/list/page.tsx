"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ListStaffForm, ListStaffSchema } from "@/modules/staffs/staff.schema";
import { GetStaffList } from "@/modules/staffs/staff.service";
import { PayloadListStaff, StaffList } from "@/modules/staffs/staff.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { ListRestart, Pencil, Search, UserRoundPlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function StaffListPage() {
    // FORM
    const form = useForm<ListStaffForm>({
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

    // LIST STAFF
    const [staffList, setStaffList] = useState<StaffList[]>([]);
    const [staffListTotal, setStaffListTotal] = useState<number>(0);

    const branches = [
        { id: "0", name: "All Branches" },
        { id: "1", name: "Head Office" },
        { id: "2", name: "Bangkok HQ" },
        { id: "3", name: "Chiang Mai" },
    ];

    const status = [
        { id: "0", name: "All Status" },
        { id: "1", name: "Active" },
        { id: "2", name: "Inactive" },
    ];

    const department = [
        { id: "0", name: "All Departments" },
        { id: "1", name: "Sales" },
        { id: "2", name: "Marketing" },
        { id: "3", name: "IT" },
    ]

    const staffTest = [
        { id: "0", }, { id: "0", }, { id: "1", }, { id: "3", }, { id: "3", },
        { id: "1", }, { id: "2", }, { id: "2", }, { id: "3", }, { id: "3", },
        { id: "3", }, { id: "3", }, { id: "3", }, { id: "3", }, { id: "3", },
        { id: "0", }, { id: "0", }, { id: "1", }, { id: "3", }, { id: "3", },
        { id: "1", }, { id: "2", }, { id: "2", }, { id: "3", }, { id: "3", },
        { id: "3", }, { id: "3", }, { id: "3", }, { id: "3", }, { id: "3", },

    ]
    const onSubmit = async (values: ListStaffForm) => {
        try {
            const patyloadStaffList: PayloadListStaff = {
                username: values.username,
                em_code: values.em_code,
                branches_id: values.branches_id,
                full_name: values.full_name,
                status: values.status,
                department_id: values.department_id,
                page: 1,
                limit: 10
            };

            const response = await GetStaffList(patyloadStaffList);

            switch (response.code) {
                case 200:
                    setStaffList(response.result);
                    setStaffListTotal(response.meta.total);
                    toast.success(response.message);
                    break
                default:
                    toast.error(response.message);
                    break;
            }

        } catch (error) {
            toast.error("Search Failed");
            console.log(error);
        } finally {
            // setLoading(false);
        }
    };

    const handleAddNewStaff = () => {
        toast("Add New Staff");
    }

    return (
        <div className="grid grid-cols-1 grid-rows-1 gap-2 ">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >

                    <div className="flex items-center justify-between">
                        <h2 className="scroll-m-18 text-xl font-semibold tracking-tight">
                            รายการพนักงาน
                        </h2>

                        <div className="flex gap-2">
                            <Button
                                type="button"
                                onClick={handleAddNewStaff}
                                className="h-8 w-30 rounded-b-md border bg-green-500 text-white hover:bg-green-700"
                            >
                                <UserRoundPlus />
                                เพิ่มพนักงาน
                            </Button>

                            <Button
                                type="submit"
                                className="h-8 w-30 rounded-b-md border bg-blue-950 text-white hover:bg-blue-900"
                            >
                                <Search />
                                ค้นหารายการ
                            </Button>

                            <Button
                                type="button"
                                onClick={() => form.reset()}
                                className="h-8 w-36 rounded-b-md border border-gray-300 bg-blue-50 text-black hover:bg-blue-900 hover:text-white"
                            >
                                <ListRestart />
                                รีเซ็ตรายการค้นหา
                            </Button>
                        </div>
                    </div>


                    <div className="grid grid-cols-8 grid-rows-1 gap-2">
                        {/* USERNAME */}
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="รหัสพนักงาน"
                                            className="h-8 rounded-lg border-slate-200 bg-slate-50 px-5"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="em_code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="EM CODE"
                                            className="h-8 rounded-lg border-slate-200 bg-slate-50 px-5"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="branches_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select
                                            onValueChange={(val) => field.onChange(val)}
                                            value={field.value ? String(field.value) : ""}
                                        >
                                            <SelectTrigger className="h-8 rounded-lg w-full max-w-48 border-slate-200 bg-slate-50 px-5">
                                                <SelectValue placeholder="เลือกสาขา" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {branches.map((b) => (
                                                    <SelectItem key={b.id} value={String(b.id)}>
                                                        {b.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="full_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="ชื่อเต็ม"
                                            className="h-8 rounded-lg border-slate-200 bg-slate-50 px-5"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select
                                            onValueChange={(val) => field.onChange(val)}
                                            value={field.value ? String(field.value) : ""}
                                        >
                                            <SelectTrigger className="h-8 rounded-lg w-full max-w-48 border-slate-200 bg-slate-50 px-5">
                                                <SelectValue placeholder="สถานะ" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {status.map((b) => (
                                                    <SelectItem key={b.id} value={String(b.id)}>
                                                        {b.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="department_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select
                                            onValueChange={(val) => field.onChange(val)}
                                            value={field.value ? String(field.value) : ""}
                                        >
                                            <SelectTrigger className="h-8 rounded-lg w-full max-w-48 border-slate-200 bg-slate-50 px-5">
                                                <SelectValue placeholder="แผนก" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {department.map((b) => (
                                                    <SelectItem key={b.id} value={String(b.id)}>
                                                        {b.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </form>
            </Form>
            <Table className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                {/* CAPTION
                <TableCaption className="text-xs text-slate-500 mt-3">
                    A list of your recent invoices
                </TableCaption> */}

                {/* HEADER */}
                <TableHeader className="bg-slate-50">
                    <TableRow className="border-b border-slate-200 hover:bg-transparent">
                        <TableHead className="w-30 text-center text-slate-600 font-semibold">
                            รหัสพนักงาน
                        </TableHead>
                        <TableHead className="text-center text-slate-600 font-semibold">
                            EM CODE
                        </TableHead>
                        <TableHead className="text-center text-slate-600 font-semibold">
                            สาขา
                        </TableHead>
                        <TableHead className="text-center text-slate-600 font-semibold">
                            สถานะ
                        </TableHead>
                        <TableHead className="text-left text-slate-600 font-semibold">
                            ชื่อเต็ม
                        </TableHead>
                        <TableHead className="text-center text-slate-600 font-semibold">
                            แผนก
                        </TableHead>
                        <TableHead className="text-center text-slate-600 font-semibold">
                            ตำแหน่ง
                        </TableHead>
                        <TableHead className="text-center text-slate-600 font-semibold">
                            เครื่องมือ
                        </TableHead>
                    </TableRow>
                </TableHeader>

                {/* BODY */}
                <TableBody>
                    {staffList.map((staff) => (
                        <TableRow
                            key={staff.id}
                            className=" border-b border-slate-100 hover:bg-indigo-50/40 transition-colors"
                        >
                            <TableCell className="text-center font-medium text-slate-900">
                                {staff.username}
                            </TableCell>
                            <TableCell className="text-center font-medium text-slate-900">
                                {staff.employee_code}
                            </TableCell>
                            <TableCell className="text-center font-medium text-slate-900">
                                {staff.branch_name}
                            </TableCell>
                            <TableCell className="text-center">
                                <div
                                    className={`
                                        inline-flex items-center justify-center rounded-full px-2.5 py-1 text-xs font-medium
                                        ${staff.status === "active"
                                            ? "bg-emerald-100 text-emerald-700"
                                            : "bg-rose-100 text-rose-700"
                                        }
`}
                                >
                                    {staff.status}
                                </div>
                            </TableCell>
                            <TableCell className="text-left font-medium text-slate-900">
                                {staff.first_name} {staff.last_name}
                            </TableCell>
                            <TableCell className="text-center font-medium text-slate-900">
                                {staff.department_name}
                            </TableCell>
                            <TableCell className="text-center font-medium text-slate-900">
                                {staff.position_name}
                            </TableCell>
                            <TableCell className="text-center font-medium text-slate-900">

                                <Button
                                    type="button"
                                    onClick={() => form.reset()}
                                    className="h-8 w-8 rounded-b-md border border-gray-300 bg-blue-50 text-black hover:bg-blue-900 hover:text-white"
                                >
                                    <Pencil />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

                {/* FOOTER */}
                <TableFooter className="bg-slate-50">
                    <TableRow>
                        <TableCell colSpan={7} className="font-semibold text-slate-700">
                            Total
                        </TableCell>
                        <TableCell className="text-right font-bold text-slate-900">
                            {staffListTotal} รายการ
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}

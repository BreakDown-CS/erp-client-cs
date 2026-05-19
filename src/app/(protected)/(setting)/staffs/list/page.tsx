"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ListStaffForm, ListStaffSchema } from "@/modules/staffs/staff.schema";
import { GetStaffList } from "@/modules/staffs/staff.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { ListRestart, Search } from "lucide-react";
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

    const invoices = [
        {
            invoice: "INV001",
            paymentStatus: "Paid",
            totalAmount: "$250.00",
            paymentMethod: "Credit Card",
        },
        {
            invoice: "INV002",
            paymentStatus: "Pending",
            totalAmount: "$150.00",
            paymentMethod: "PayPal",
        },
        {
            invoice: "INV003",
            paymentStatus: "Unpaid",
            totalAmount: "$350.00",
            paymentMethod: "Bank Transfer",
        },
        {
            invoice: "INV004",
            paymentStatus: "Paid",
            totalAmount: "$450.00",
            paymentMethod: "Credit Card",
        },
        {
            invoice: "INV005",
            paymentStatus: "Paid",
            totalAmount: "$550.00",
            paymentMethod: "PayPal",
        },
        {
            invoice: "INV006",
            paymentStatus: "Pending",
            totalAmount: "$200.00",
            paymentMethod: "Bank Transfer",
        },
        {
            invoice: "INV007",
            paymentStatus: "Unpaid",
            totalAmount: "$300.00",
            paymentMethod: "Credit Card",
        },
    ]

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

    // SUBMIT
    const onSubmit = async (values: ListStaffForm) => {
        try {
            const patyloadStaffList: ListStaffForm = {
                username: values.username,
                em_code: values.em_code,
                branches_id: values.branches_id,
                full_name: values.full_name,
                status: values.status,
                department_id: values.department_id,
            };

            const response = await GetStaffList(patyloadStaffList);

            console.log(response);

            // switch (response.status) {
            //     case 200:
            //         const { access_token, user } = response.data.data;

            //         // เก็บ token
            //         localStorage.setItem("access_token", access_token);

            //         // เก็บ user
            //         localStorage.setItem("user", JSON.stringify(user));

            //         toast.success("Login Success");
            //         router.push("/dashboard")
            //         break
            //     default:
            //         router.push("/dashboard")
            //         toast.error("Login Failed");
            //         break;
            // }

        } catch (error) {
            toast.error("Login Failed");
            console.log(error);
        } finally {
            // setLoading(false);
        }
    };

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
                                type="submit"
                                className="h-8 w-30 rounded-b-md border bg-blue-950 text-white hover:bg-blue-900"
                            >
                                <Search />
                                ค้นหา
                            </Button>

                            <Button
                                type="button"
                                onClick={() => form.reset()}
                                className="h-8 w-30 rounded-b-md border border-gray-300 bg-blue-50 text-black hover:bg-blue-900 hover:text-white"
                            >
                                <ListRestart />
                                ล้าง
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
                        <TableHead className="w-30 text-slate-600 font-semibold">
                            Invoice
                        </TableHead>
                        <TableHead className="text-slate-600 font-semibold">
                            Status
                        </TableHead>
                        <TableHead className="text-slate-600 font-semibold">
                            Method
                        </TableHead>
                        <TableHead className="text-right text-slate-600 font-semibold">
                            Amount
                        </TableHead>
                    </TableRow>
                </TableHeader>

                {/* BODY */}
                <TableBody>
                    {invoices.map((invoice) => (
                        <TableRow
                            key={invoice.invoice}
                            className="
                    border-b border-slate-100
                    hover:bg-indigo-50/40
                    transition-colors
                "
                        >
                            <TableCell className="font-medium text-slate-900">
                                {invoice.invoice}
                            </TableCell>

                            {/* STATUS */}
                            <TableCell>
                                <span
                                    className={`
                            inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium
                            ${invoice.paymentStatus === "Paid"
                                            ? "bg-emerald-100 text-emerald-700"
                                            : invoice.paymentStatus === "Pending"
                                                ? "bg-amber-100 text-amber-700"
                                                : "bg-rose-100 text-rose-700"
                                        }
                        `}
                                >
                                    {invoice.paymentStatus}
                                </span>
                            </TableCell>

                            <TableCell className="text-slate-600">
                                {invoice.paymentMethod}
                            </TableCell>

                            <TableCell className="text-right font-semibold text-slate-900">
                                ${invoice.totalAmount}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

                {/* FOOTER */}
                <TableFooter className="bg-slate-50">
                    <TableRow>
                        <TableCell colSpan={3} className="font-semibold text-slate-700">
                            Total
                        </TableCell>
                        <TableCell className="text-right font-bold text-slate-900">
                            $2,500.00
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}

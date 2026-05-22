"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { AuthLogin } from "@/modules/auth/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginForm, loginSchema } from "@/modules/auth/auth.schema";
import { PayloadLogin } from "@/modules/auth/auth.type";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // FORM
    const form = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),

        defaultValues: {
            username: "",
            password: "",
        },
    });

    // SUBMIT
    const onSubmit = async (values: LoginForm) => {
        try {
            setLoading(true);
            const payloadLogin: PayloadLogin = {
                username: values.username,
                password: values.password,
            };

            const response = await AuthLogin(payloadLogin);

            switch (response.code) {
                case 200:
                    if (response.message === "user not found") {
                        return toast.warning("ไม่พบผู้ใช้งาน");
                    }

                    const { access_token, user } = response.result

                    // เก็บ token
                    localStorage.setItem("access_token", access_token);

                    // เก็บ user
                    localStorage.setItem("user", JSON.stringify(user));

                    toast.success("Login Success");
                    router.push("/dashboard")
                    break
                default:
                    toast.error("Login Failed");
                    break;
            }

        } catch (error) {
            toast.error("Login Failed");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6">

            {/* BACKGROUND */}
            <div className="absolute inset-0">
                <div className="absolute -left-30 -top-30 h-87.5 w-87.5 rounded-full bg-blue-500/20 blur-3xl" />
                <div className="absolute -bottom-30 -right-30 h-87.5 w-87.5 rounded-full bg-cyan-500/20 blur-3xl" />
            </div>

            {/* CARD */}
            <Card className="relative z-10 w-full max-w-md rounded-[32px] border border-white/10 bg-white/95 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
                <CardContent className="p-10">

                    {/* HEADER */}
                    <div className="mb-10 text-center">
                        <div className="mb-5 inline-flex h-20 w-50 items-center justify-center rounded-2xl bg-blue-950 text-white">
                            <span className="text-2xl font-black">
                                ERP-CS
                            </span>
                        </div>
                        <h1 className="text-2xl font-black text-slate-900">
                            ERP-CS SYSTEM SERVICE
                        </h1>
                    </div>

                    {/* FORM */}
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            {/* USERNAME */}
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Enter your username"
                                                className="h-14 rounded-2xl border-slate-200 bg-slate-50 px-5"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* PASSWORD */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Enter your password"
                                                    className="h-14 rounded-2xl border-slate-200 bg-slate-50 px-5 pr-14"
                                                    {...field}
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                                                >
                                                    {
                                                        showPassword
                                                            ? <EyeOff className="h-5 w-5" />
                                                            : <Eye className="h-5 w-5" />
                                                    }
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* BUTTON */}
                            <Button
                                type="submit"
                                disabled={loading}
                                className="h-14 w-full rounded-2xl bg-blue-950 text-lg font-bold hover:bg-blue-900"
                            >
                                {
                                    loading
                                        ? "Signing In..."
                                        : "Sign In"
                                }
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
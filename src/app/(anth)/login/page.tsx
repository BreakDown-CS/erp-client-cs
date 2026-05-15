"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Eye, EyeOff } from "lucide-react";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {

    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        router.push("/dashboard");
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6">

            {/* BACKGROUND */}
            <div className="absolute inset-0">

                <div className="absolute -left-30 -top-30 h-87.5 w-87.5 rounded-full bg-blue-500/20 blur-3xl" />

                <div className="absolute -bottom-30 -right-30 h-87.5 w-87.5 rounded-full bg-cyan-500/20 blur-3xl" />

                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[45px_45px]" />

            </div>

            {/* LOGIN CARD */}
            <Card className="relative z-10 w-full max-w-md rounded-[32px] border border-white/10 bg-white/95 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur">

                <CardContent className="p-10">

                    {/* HEADER */}
                    <div className="mb-10 text-center">

                        <div className="mb-5 inline-flex h-20 w-50 items-center justify-center rounded-2xl bg-blue-950 text-white shadow-lg">
                            <span className="text-2xl font-black">
                                ERP-CS
                            </span>
                        </div>

                        <h1 className="text-4xl font-black text-slate-900">
                            Welcome Back
                        </h1>

                        <p className="mt-3 text-slate-500">
                            Sign in to continue
                        </p>

                    </div>

                    {/* FORM */}
                    <div className="space-y-6">

                        {/* EMAIL */}
                        <div className="space-y-2">

                            <Label>Email</Label>

                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="h-14 rounded-2xl border-slate-200 bg-slate-50 px-5 text-base focus-visible:ring-2 focus-visible:ring-blue-500"
                            />

                        </div>

                        {/* PASSWORD */}
                        <div className="space-y-2">

                            <Label>Password</Label>

                            <div className="relative">

                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="h-14 rounded-2xl border-slate-200 bg-slate-50 px-5 pr-14 text-base focus-visible:ring-2 focus-visible:ring-blue-500"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                                >
                                    {
                                        showPassword
                                            ? <EyeOff className="h-5 w-5" />
                                            : <Eye className="h-5 w-5" />
                                    }
                                </button>

                            </div>

                        </div>

                        {/* OPTIONS */}
                        <div className="flex items-center justify-between text-sm">

                            <label className="flex items-center gap-2 text-slate-500">

                                <input type="checkbox" />

                                Remember me

                            </label>

                            <button className="font-medium text-blue-700 hover:text-blue-900">
                                Forgot password?
                            </button>

                        </div>

                        {/* BUTTON */}
                        <Button
                            onClick={handleLogin}
                            className="h-14 w-full rounded-2xl bg-blue-950 text-lg font-bold transition-all hover:bg-blue-900"
                        >
                            Sign In
                        </Button>

                    </div>

                </CardContent>

            </Card>

        </div>
    );
}
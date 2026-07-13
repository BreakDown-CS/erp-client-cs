/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import DashboardLayout from "@/components/layouts/MainLayout";

type Props = {
    children: React.ReactNode;
};

export default function ProtectedLayout({
    children,
}: Props) {

    const router = useRouter();

    const [isAuthenticated, setIsAuthenticated] =
        useState<boolean | null>(null);

    useEffect(() => {

        // const token = localStorage.getItem("access_token");
        
        // if (!token) {

        //     router.replace("/login");

        //     setIsAuthenticated(false);

        //     return;
        // }

        setIsAuthenticated(true);

    }, [router]);

    // loading
    if (isAuthenticated === null) {

        return (
            <div className="flex min-h-screen items-center justify-center">
                Loading...
            </div>
        );
    }

    // no auth
    if (!isAuthenticated) {
        return null;
    }

    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    );
}
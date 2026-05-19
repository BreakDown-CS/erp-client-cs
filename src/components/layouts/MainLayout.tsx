"use client"

import { useState } from "react"

import Navbar from "../shared/Navbar"
import Sidebar from "../shared/Sidebar"

import {
    Card,
    CardContent
} from "../ui/card"

type Props = {
    children: React.ReactNode
}

export default function DashboardLayout({
    children,
}: Props) {

    const [collapsed, setCollapsed] = useState(false)

    return (
        <div className="min-h-screen bg-gray-100">

            {/* TOP NAVBAR */}
            <Navbar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />

            {/* BODY */}
            <div className="flex">

                {/* SIDEBAR */}
                <Sidebar collapsed={collapsed} />

                {/* CONTENT */}
                <main className="flex-1 p-4 overflow-auto">

                    <Card
                        className="
                            min-h-[calc(100vh-112px)]
                            rounded-2xl
                            border
                            bg-white
                            shadow-sm
                        "
                    >
                        <CardContent>
                            {children}
                        </CardContent>

                    </Card>

                </main>

            </div>

        </div>
    )
}
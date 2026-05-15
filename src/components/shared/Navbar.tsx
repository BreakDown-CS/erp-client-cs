"use client"

import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"

export default function Navbar() {

    return (
        <header
            className="
                sticky
                top-0
                z-50
                flex
                h-16
                items-center
                justify-between
                border-b
                bg-white
                px-6
            "
        >

            {/* PAGE TITLE */}
            <h1 className="text-xl font-bold text-gray-800">
                Dashboard
            </h1>

            {/* ACTION */}
            <Button onClick={() => redirect("/login")}>
                Logout
            </Button>

        </header>
    )
}
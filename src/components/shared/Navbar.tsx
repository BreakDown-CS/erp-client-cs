"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

import { Menu, SquareArrowRightExit } from "lucide-react"

type Props = {
    collapsed: boolean
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Navbar({
    collapsed,
    setCollapsed,
}: Props) {

    const router = useRouter()

    const handleLogout = () => {

        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        localStorage.removeItem("refreshToken");

        router.replace("/login");
    };

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
                drop-shadow
            "
        >

            {/* LEFT */}
            <div className="flex items-center gap-4">

                {/* HAMBURGER */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="
                        rounded-lg
                        p-2
                        transition
                        hover:bg-gray-100
                    "
                >
                    <Menu size={22} />
                </button>

                <h1 className="text-xl font-bold text-gray-800">
                    ERP System™ On cloud
                </h1>

            </div>

            <Button
                onClick={handleLogout}
                variant="ghost"
                className={` flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition-all bg-white text-blue-950`}
            >
                <SquareArrowRightExit size={18} />
            </Button>

        </header>
    )
}
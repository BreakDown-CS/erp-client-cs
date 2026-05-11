import Link from "next/link"

import {
    LayoutDashboard,
    Package,
} from "lucide-react"

export default function Sidebar() {

    return (
        <div className="w-64 bg-black text-white p-4 ">
            <h1 className="text-2xl font-bold mb-8">
                ERP SYSTEM
            </h1>
            <div className="space-y-2">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800"
                >
                    <LayoutDashboard size={18} />
                    Dashboard
                </Link>

                <Link
                    href="/products"
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800"
                >
                    <Package size={18} />
                    Products
                </Link>
            </div>
        </div>
    )
}
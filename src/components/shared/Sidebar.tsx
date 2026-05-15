"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    ChevronDown,
    LayoutDashboard,
    Package,
    ShoppingCart,
    UserCogIcon,
} from "lucide-react";

import { useState } from "react";

const menus = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "ทรัพยากรบุคคล",
        icon: UserCogIcon,

        children: [
            {
                title: "ข้อมูลพนักงาน",
                href: "/staffs/list",
            },
        ],
    },
];

export default function Sidebar() {

    const pathname = usePathname();

    const [openMenus, setOpenMenus] = useState<string[]>([
        "Products",
    ]);

    const toggleMenu = (title: string) => {

        setOpenMenus((prev) =>
            prev.includes(title)
                ? prev.filter((item) => item !== title)
                : [...prev, title]
        );

    };

    return (
        <aside
            className="
                h-[calc(100vh-64px)]
                w-72
                overflow-y-auto
                border-r
                bg-blue-950
                px-4
                py-6
            "
        >

            {/* LOGO */}
            <div className="mb-10">

                <h1 className="text-2xl font-black tracking-wide text-white">
                    ERP SYSTEM
                </h1>

                <p className="text-sm text-blue-200">
                    Management Platform
                </p>

            </div>

            {/* MENU */}
            <nav className="space-y-2">

                {menus.map((menu) => {

                    const Icon = menu.icon;

                    const isOpen = openMenus.includes(menu.title);

                    const isActive =
                        pathname === menu.href ||
                        menu.children?.some(
                            (sub) => pathname === sub.href
                        );

                    // NORMAL MENU
                    if (!menu.children) {
                        return (
                            <Link
                                key={menu.title}
                                href={menu.href!}
                                className={`
                                    flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all

                                    ${isActive
                                        ? "bg-white text-blue-950 shadow-lg"
                                        : "text-blue-100 hover:bg-blue-900 hover:text-white"
                                    }
                                `}
                            >

                                <Icon size={18} />

                                <span>
                                    {menu.title}
                                </span>

                            </Link>
                        );
                    }

                    // MENU WITH CHILDREN
                    return (
                        <div key={menu.title}>

                            <button
                                onClick={() => toggleMenu(menu.title)}
                                className={`
                                    flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-all

                                    ${isActive
                                        ? "bg-blue-900 text-white"
                                        : "text-blue-100 hover:bg-blue-900 hover:text-white"
                                    }
                                `}
                            >

                                <div className="flex items-center gap-3">

                                    <Icon size={18} />

                                    <span>
                                        {menu.title}
                                    </span>

                                </div>

                                <ChevronDown
                                    size={18}
                                    className={`
                                        transition-transform
                                        ${isOpen ? "rotate-180" : ""}
                                    `}
                                />

                            </button>

                            {/* SUB MENU */}
                            <div
                                className={`
                                    overflow-hidden transition-all duration-300

                                    ${isOpen
                                        ? "mt-2 max-h-96"
                                        : "max-h-0"
                                    }
                                `}
                            >

                                <div className="ml-4 space-y-1 border-l border-blue-800 pl-4">

                                    {menu.children.map((subMenu) => {

                                        const isSubActive =
                                            pathname === subMenu.href;

                                        return (
                                            <Link
                                                key={subMenu.href}
                                                href={subMenu.href}
                                                className={`
                                                    flex rounded-xl px-3 py-2 text-sm transition-all

                                                    ${isSubActive
                                                        ? "bg-white text-blue-950 font-semibold"
                                                        : "text-blue-200 hover:bg-blue-900 hover:text-white"
                                                    }
                                                `}
                                            >
                                                {subMenu.title}
                                            </Link>
                                        );
                                    })}

                                </div>

                            </div>

                        </div>
                    );
                })}

            </nav>

        </aside>
    );
}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
    ChevronDown,
    LayoutDashboard,
    UserCogIcon,
} from "lucide-react";

type Props = {
    collapsed: boolean
}

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

export default function Sidebar({
    collapsed,
}: Props) {

    const pathname = usePathname();

    const [openMenus, setOpenMenus] = useState<string[]>([
        "ทรัพยากรบุคคล",
    ]);

    const toggleMenu = (title: string) => {

        if (collapsed) return;

        setOpenMenus((prev) =>
            prev.includes(title)
                ? prev.filter((item) => item !== title)
                : [...prev, title]
        );

    };

    return (
        <aside
            className={`
                h-[calc(100vh-64px)]
                ${collapsed ? "w-20" : "w-72"}
                overflow-y-auto
                border-r
                bg-blue-950
                px-4
                py-6
                transition-all
                duration-300
            `}
        >

            {/* LOGO */}
            <div
                className={`
                    mb-10
                    flex
                    items-center
                    ${collapsed ? "justify-center" : ""}
                `}
            >

                {!collapsed ? (
                    <div>
                        <h1 className="text-2xl font-black tracking-wide text-white">
                            ERP SYSTEM
                        </h1>

                        <p className="text-sm text-blue-200">
                            Management Platform
                        </p>
                    </div>
                ) : (
                    <div
                        className="
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-2xl
                            bg-white
                            text-lg
                            font-black
                            text-blue-950
                        "
                    >
                        CS
                    </div>
                )}

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
                                    flex items-center
                                    ${collapsed
                                        ? "justify-center"
                                        : "gap-3"
                                    }
                                    rounded-2xl
                                    px-4
                                    py-3
                                    text-sm
                                    font-medium
                                    transition-all

                                    ${isActive
                                        ? "bg-white text-blue-950 shadow-lg"
                                        : "text-blue-100 hover:bg-blue-900 hover:text-white"
                                    }
                                `}
                            >

                                <Icon size={18} />

                                {!collapsed && (
                                    <span>
                                        {menu.title}
                                    </span>
                                )}

                            </Link>
                        );
                    }

                    // MENU WITH CHILDREN
                    return (
                        <div key={menu.title}>

                            <button
                                onClick={() => toggleMenu(menu.title)}
                                className={`
                                    flex
                                    w-full
                                    items-center

                                    ${collapsed
                                        ? "justify-center"
                                        : "justify-between"
                                    }

                                    rounded-2xl
                                    px-4
                                    py-3
                                    text-sm
                                    font-medium
                                    transition-all

                                    ${isActive
                                        ? "bg-blue-900 text-white"
                                        : "text-blue-100 hover:bg-blue-900 hover:text-white"
                                    }
                                `}
                            >

                                <div
                                    className={`
                                        flex items-center
                                        ${collapsed
                                            ? ""
                                            : "gap-3"
                                        }
                                    `}
                                >

                                    <Icon size={18} />

                                    {!collapsed && (
                                        <span>
                                            {menu.title}
                                        </span>
                                    )}

                                </div>

                                {!collapsed && (
                                    <ChevronDown
                                        size={18}
                                        className={`
                                            transition-transform
                                            ${isOpen ? "rotate-180" : ""}
                                        `}
                                    />
                                )}

                            </button>

                            {/* SUB MENU */}
                            {!collapsed && (
                                <div
                                    className={`
                                        overflow-hidden
                                        transition-all
                                        duration-300

                                        ${isOpen
                                            ? "mt-2 max-h-96"
                                            : "max-h-0"
                                        }
                                    `}
                                >

                                    <div
                                        className="
                                            ml-4
                                            space-y-1
                                            border-l
                                            border-blue-800
                                            pl-4
                                        "
                                    >

                                        {menu.children.map((subMenu) => {

                                            const isSubActive =
                                                pathname === subMenu.href;

                                            return (
                                                <Link
                                                    key={subMenu.href}
                                                    href={subMenu.href}
                                                    className={`
                                                        flex
                                                        rounded-xl
                                                        px-3
                                                        py-2
                                                        text-sm
                                                        transition-all

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
                            )}

                        </div>
                    );
                })}

            </nav>

        </aside>
    );
}
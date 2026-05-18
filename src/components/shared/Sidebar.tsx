/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import {
    ChevronDown,
    LayoutDashboard,
    UserCogIcon,
    type LucideIcon,
} from "lucide-react";

type Props = {
    collapsed: boolean;
};

type User = {
    username: string;
    role_id: string;
    permissions: Permission[];
};

type Permission = {
    permission_id: string;
    permission_name: string;
};

type SubMenu = {
    title: string;
    href: string;
    permission?: string | string[];
};

type Menu = {
    title: string;
    icon?: LucideIcon;
    href?: string;
    permission?: string | string[];
    children?: SubMenu[];
};

const menus: Menu[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        // permission: [
        //     "8ffe0618-9934-4f60-8e2f-dbf444f6b756",
        //     "2b63bac7-78a5-4397-9974-b310444d0fa2",
        // ],
    },
    {
        title: "ทรัพยากรบุคคล",
        icon: UserCogIcon,
        permission: "2b63bac7-78a5-4397-9974-b310444d0fa2",
        children: [
            {
                title: "ข้อมูลพนักงาน",
                href: "/staffs/list",
                permission: "2b63bac7-78a5-4397-9974-b310444d0fa2",
            },
        ],
    },
];

export default function Sidebar({ collapsed }: Props) {

    const pathname = usePathname();

    const [openMenus, setOpenMenus] = useState<string[]>([
        "ทรัพยากรบุคคล",
    ]);

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) setUser(JSON.parse(stored));
    }, []);

    // -------------------------
    // SAFE DERIVED VALUES
    // -------------------------
    const userPermissions = useMemo(() => {
        return user?.permissions?.map((p) => p.permission_id) || [];
    }, [user]);

    const isAdmin = user?.role_id === "5b388dc6-9fa9-4954-a3ea-b21db19a4e33";

    const hasPermission = (permission?: string | string[]) => {

        if (isAdmin) return true;
        if (!permission) return true;

        if (Array.isArray(permission)) {
            return permission.some((p) =>
                userPermissions.includes(p)
            );
        }

        return userPermissions.includes(permission);
    };

    const filteredMenus = useMemo(() => {

        return menus
            .map((menu) => {

                if (!menu.children) {
                    return hasPermission(menu.permission)
                        ? menu
                        : null;
                }

                const filteredChildren = menu.children.filter((child) =>
                    hasPermission(child.permission)
                );

                if (filteredChildren.length === 0) return null;

                return {
                    ...menu,
                    children: filteredChildren,
                };
            })
            .filter((m): m is Menu => m !== null);

    }, [userPermissions, isAdmin]);

    const toggleMenu = (title: string) => {
        if (collapsed) return;

        setOpenMenus((prev) =>
            prev.includes(title)
                ? prev.filter((t) => t !== title)
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
            <div className={`mb-10 flex items-center ${collapsed ? "justify-center" : ""}`}>
                {!collapsed ? (
                    <div>
                        <h1 className="text-2xl font-black text-white">
                            ERP SYSTEM
                        </h1>
                        <p className="text-sm text-blue-200">
                            Management Platform
                        </p>
                    </div>
                ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-950 font-black">
                        CS
                    </div>
                )}
            </div>

            {/* MENU */}
            <nav className="space-y-2">
                {filteredMenus.map((menu) => {

                    const Icon = menu.icon;
                    const isOpen = openMenus.includes(menu.title);

                    const isActive =
                        pathname === menu.href ||
                        menu.children?.some((sub) => pathname === sub.href);

                    if (!menu.children) {
                        return (
                            <Link
                                key={menu.title}
                                href={menu.href!}
                                className={`
                                    flex items-center
                                    ${collapsed ? "justify-center" : "gap-3"}
                                    rounded-2xl px-4 py-3 text-sm font-medium
                                    transition-all
                                    ${isActive
                                        ? "bg-white text-blue-950 shadow-lg"
                                        : "text-blue-100 hover:bg-blue-900 hover:text-white"}
                                `}
                            >
                                {Icon && <Icon size={18} />}
                                {!collapsed && <span>{menu.title}</span>}
                            </Link>
                        );
                    }

                    return (
                        <div key={menu.title}>
                            <button
                                onClick={() => toggleMenu(menu.title)}
                                className={`
                                    flex w-full items-center
                                    ${collapsed ? "justify-center" : "justify-between"}
                                    rounded-2xl px-4 py-3 text-sm font-medium
                                    transition-all
                                    ${isActive
                                        ? "bg-blue-900 text-white"
                                        : "text-blue-100 hover:bg-blue-900 hover:text-white"}
                                `}
                            >
                                <div className={`flex items-center ${collapsed ? "" : "gap-3"}`}>
                                    {Icon && <Icon size={18} />}
                                    {!collapsed && <span>{menu.title}</span>}
                                </div>

                                {!collapsed && (
                                    <ChevronDown
                                        size={18}
                                        className={`${isOpen ? "rotate-180" : ""} transition-transform`}
                                    />
                                )}
                            </button>

                            {!collapsed && (
                                <div
                                    className={`
                                        overflow-hidden transition-all duration-300
                                        ${isOpen ? "mt-2 max-h-96" : "max-h-0"}
                                    `}
                                >
                                    <div className="ml-4 space-y-1 border-l border-blue-800 pl-4">
                                        {menu.children.map((subMenu) => {
                                            const isSubActive = pathname === subMenu.href;

                                            return (
                                                <Link
                                                    key={subMenu.href}
                                                    href={subMenu.href}
                                                    className={`
                                                        flex rounded-xl px-3 py-2 text-sm transition-all
                                                        ${isSubActive
                                                            ? "bg-white text-blue-950 font-semibold"
                                                            : "text-blue-200 hover:bg-blue-900 hover:text-white"}
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
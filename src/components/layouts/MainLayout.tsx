import Navbar from "../shared/Navbar"
import Sidebar from "../shared/Sidebar"

type Props = {
    children: React.ReactNode
}

export default function DashboardLayout({
    children,
}: Props) {

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="flex-1 p-6 bg-gray-100">
                    {children}
                </main>
            </div>
        </div>
    )
}
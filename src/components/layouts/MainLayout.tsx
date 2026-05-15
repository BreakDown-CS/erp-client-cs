// import Navbar from "../shared/Navbar"
// import Sidebar from "../shared/Sidebar"

// type Props = {
//     children: React.ReactNode
// }

// export default function DashboardLayout({
//     children,
// }: Props) {

//     return (
//         <div className="flex-1 flex flex-col">
//             <Navbar />
//             <div className="flex">
//                 <Sidebar />
//                 <main className="flex-1 p-6 bg-gray-100">
//                     {children}
//                 </main>
//             </div>
//         </div>
//     )
// }

import Navbar from "../shared/Navbar"
import Sidebar from "../shared/Sidebar"

type Props = {
    children: React.ReactNode
}

export default function DashboardLayout({
    children,
}: Props) {

    return (
        <div className="min-h-screen bg-gray-100">

            {/* TOP NAVBAR */}
            <Navbar />

            {/* BODY */}
            <div className="flex">

                {/* SIDEBAR */}
                <Sidebar />

                {/* CONTENT */}
                <main className="flex-1 p-6 overflow-auto">
                    {children}
                </main>

            </div>

        </div>
    )
}
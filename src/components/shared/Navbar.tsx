import { Button } from "@/components/ui/button"

export default function Navbar() {

    return (
        <div
            className="h-16 border-b bg-white px-6 flex items-center justify-between">
            <h1 className="font-bold text-xl">
                Dashboard
            </h1>
            <Button>
                Logout
            </Button>
        </div>
    )
}
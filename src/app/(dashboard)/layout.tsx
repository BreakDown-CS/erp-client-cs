import DashboardLayout from "@/components/layouts/MainLayout"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  )
}
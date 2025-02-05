import { Alerts } from "@/src/components/dashboard/alerts"
import { Layout } from "@/src/components/layout"
import { StatsCards } from "@/src/components/stats-cards"
import { Button } from "@/src/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu"
import { Grid } from "lucide-react"


export default function DashboardPage() {
  return (
    <Layout>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-500">Welcome back to your dashboard</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
                  <Grid className="mr-2 h-4 w-4" />
                  Line Official
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>Rich Menu</DropdownMenuItem>
                <DropdownMenuItem>Coupon</DropdownMenuItem>
                <DropdownMenuItem>Reward Card</DropdownMenuItem>
                <DropdownMenuItem>Auto-Response</DropdownMenuItem>
                <DropdownMenuItem>Edit Profile</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <StatsCards />
        {/* <div className="grid gap-6 md:grid-cols-2"> */}
        <Alerts />
        {/* </WeeklyRevenueChart> */}
        {/* </div> */}
      </div>
    </Layout >
  )
}









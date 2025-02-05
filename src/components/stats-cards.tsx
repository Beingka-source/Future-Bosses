import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { AlertTriangle, ArrowDown, ArrowUp, DollarSign, ShoppingBag, Users } from "lucide-react"

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">฿45,231.89</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-[#10a760] flex items-center gap-1">
              <ArrowUp className="h-4 w-4" />
              +20.1%
            </span>
            from last week
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          <ShoppingBag className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+2,350</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-[#10a760] flex items-center gap-1">
              <ArrowUp className="h-4 w-4" />
              +15.2%
            </span>
            from last week
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Staff Performance</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">78.5%</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-red-600 flex items-center gap-1">
              <ArrowDown className="h-4 w-4" />
              -4.5%
            </span>
            from last week
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-red-600 flex items-center gap-1">
              <ArrowUp className="h-4 w-4" />
              +3
            </span>
            from last week
          </p>
        </CardContent>
      </Card>
    </div>
  )
}


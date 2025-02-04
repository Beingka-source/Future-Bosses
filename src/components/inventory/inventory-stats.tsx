import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { AlertTriangle, Archive, Package, TrendingUp } from "lucide-react"

interface InventoryItem {
  category: string
  quantity: number
}

interface InventoryStatsProps {
  inventory: InventoryItem[]
  lowStockItems: InventoryItem[]
  onTopUsedClick?: () => void
  onLowStockClick?: () => void
}

export function InventoryStats({ inventory, lowStockItems, onTopUsedClick, onLowStockClick }: InventoryStatsProps) {
  const totalProducts = inventory.length
  const totalQuantity = inventory.reduce((sum, item) => sum + item.quantity, 0)
  const lowStockCount = lowStockItems.length
  const categories = new Set(inventory.map((item) => item.category)).size

  const stats = [
    {
      title: "Categories",
      value: categories.toString(),
      description: "Product categories",
      icon: Archive,
      color: "text-blue-600",
      onClick: null,
    },
    {
      title: "Total Products",
      value: totalProducts.toString(),
      description: "Unique items",
      icon: Package,
      color: "text-green-600",
      onClick: null,
    },
    {
      title: "Total Quantity",
      value: totalQuantity.toString(),
      description: "All items",
      icon: TrendingUp,
      color: "text-purple-600",
      onClick: "topUsed",
    },
    {
      title: "Low Stocks",
      value: lowStockCount.toString(),
      description: "Items below threshold",
      icon: AlertTriangle,
      color: "text-orange-600",
      onClick: "lowStock",
    },
  ]

  const handleClick = (clickType: string | null) => {
    if (clickType === "topUsed" && onTopUsedClick) onTopUsedClick()
    if (clickType === "lowStock" && onLowStockClick) onLowStockClick()
  }

  return (
    <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card
            key={stat.title}
            className={stat.onClick ? "cursor-pointer transition-colors hover:bg-gray-50" : ""}
            onClick={() => handleClick(stat.onClick)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}


import { Badge } from "@/src/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"

interface LowStockItem {
    id: string
    name: string
    currentStock: number
    minThreshold: number
    category: string
}

const lowStockItems: LowStockItem[] = [
    { id: "1", name: "Tomatoes", currentStock: 5, minThreshold: 10, category: "Vegetables" },
    { id: "2", name: "Chicken Breast", currentStock: 8, minThreshold: 15, category: "Meat" },
    { id: "3", name: "Rice", currentStock: 10, minThreshold: 20, category: "Grains" },
    { id: "4", name: "Olive Oil", currentStock: 2, minThreshold: 5, category: "Condiments" },
]

export function LowStockItems() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Low Stock Items</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Current Stock</TableHead>
                            <TableHead>Min Threshold</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {lowStockItems.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell>{item.currentStock}</TableCell>
                                <TableCell>{item.minThreshold}</TableCell>
                                <TableCell>{item.category}</TableCell>
                                <TableCell>
                                    <Badge variant="destructive">Low Stock</Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}


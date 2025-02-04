"use client"

import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
import { Input } from "@/src/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import { AlertTriangle, Check, Plus } from "lucide-react"
import { useState } from "react"

interface LowStockDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface LowStockProduct {
  id: string
  name: string
  currentStock: number
  minThreshold: number
  status: "low" | "ordered" | "received"
  orderQuantity?: number
  orderDate?: string
  expectedDelivery?: string
}

const initialLowStockProducts: LowStockProduct[] = [
  {
    id: "1",
    name: "Tomatoes",
    currentStock: 5,
    minThreshold: 10,
    status: "low",
  },
  {
    id: "2",
    name: "Chicken Wings",
    currentStock: 8,
    minThreshold: 15,
    status: "ordered",
    orderQuantity: 20,
    orderDate: "2024-01-25",
    expectedDelivery: "2024-01-28",
  },
  {
    id: "3",
    name: "Cooking Oil",
    currentStock: 3,
    minThreshold: 8,
    status: "low",
  },
  {
    id: "4",
    name: "Rice",
    currentStock: 10,
    minThreshold: 20,
    status: "received",
    orderQuantity: 30,
    orderDate: "2024-01-23",
    expectedDelivery: "2024-01-26",
  },
]

export function LowStockDialog({ open, onOpenChange }: LowStockDialogProps) {
  const [lowStockProducts, setLowStockProducts] = useState(initialLowStockProducts)
  const [orderQuantities, setOrderQuantities] = useState<Record<string, number>>({})

  const handleOrder = (productId: string) => {
    const quantity = orderQuantities[productId]
    if (!quantity) return

    setLowStockProducts((current) =>
      current.map((product) =>
        product.id === productId
          ? {
            ...product,
            status: "ordered",
            orderQuantity: quantity,
            orderDate: new Date().toISOString().split("T")[0],
            expectedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          }
          : product,
      ),
    )
    setOrderQuantities((current) => {
      const { [productId]: _, ...rest } = current
      return rest
    })
  }

  const handleReceived = (productId: string) => {
    setLowStockProducts((current) =>
      current.map((product) =>
        product.id === productId
          ? {
            ...product,
            status: "received",
            currentStock: (product.currentStock || 0) + (product.orderQuantity || 0),
          }
          : product,
      ),
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            Low Stock Products
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Min. Threshold</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order Details</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lowStockProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.currentStock}</TableCell>
                  <TableCell>{product.minThreshold}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        product.status === "low"
                          ? "border-orange-500 text-orange-700"
                          : product.status === "ordered"
                            ? "border-blue-500 text-blue-700"
                            : "border-green-500 text-green-700"
                      }
                    >
                      {product.status === "low" ? "Low Stock" : product.status === "ordered" ? "Ordered" : "Received"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {product.status === "ordered" && (
                      <div className="text-sm">
                        <div>Quantity: {product.orderQuantity}</div>
                        <div>Order Date: {product.orderDate}</div>
                        <div>Expected: {product.expectedDelivery}</div>
                      </div>
                    )}
                    {product.status === "received" && (
                      <div className="text-sm text-green-600">Restocked: +{product.orderQuantity}</div>
                    )}
                  </TableCell>
                  <TableCell>
                    {product.status === "low" && (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          placeholder="Qty"
                          className="w-20"
                          value={orderQuantities[product.id] || ""}
                          onChange={(e) =>
                            setOrderQuantities((current) => ({
                              ...current,
                              [product.id]: Number.parseInt(e.target.value),
                            }))
                          }
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleOrder(product.id)}
                          disabled={!orderQuantities[product.id]}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    {product.status === "ordered" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-600"
                        onClick={() => handleReceived(product.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  )
}


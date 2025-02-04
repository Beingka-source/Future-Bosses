"use client"

import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Checkbox } from "@/src/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import { ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react"
import { useState } from "react"

interface InventoryItem {
  id: string
  name: string
  category: string
  quantity: number
  threshold: number
}

interface ProductTableProps {
  searchQuery: string
  inventory: InventoryItem[]
}

export function ProductTable({ searchQuery, inventory }: ProductTableProps) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [sortColumn, setSortColumn] = useState<keyof InventoryItem>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const toggleProduct = (productId: string) => {
    setSelectedProducts((current) =>
      current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId],
    )
  }

  const toggleAll = () => {
    setSelectedProducts((current) => (current.length === inventory.length ? [] : inventory.map((p) => p.id)))
  }

  const handleSort = (column: keyof InventoryItem) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const filteredItems = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox checked={selectedProducts.length === inventory.length} onCheckedChange={toggleAll} />
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
              Products
              {sortColumn === "name" &&
                (sortDirection === "asc" ? (
                  <ChevronUp className="inline ml-1" />
                ) : (
                  <ChevronDown className="inline ml-1" />
                ))}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("id")}>
              Product ID
              {sortColumn === "id" &&
                (sortDirection === "asc" ? (
                  <ChevronUp className="inline ml-1" />
                ) : (
                  <ChevronDown className="inline ml-1" />
                ))}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("quantity")}>
              Quantity
              {sortColumn === "quantity" &&
                (sortDirection === "asc" ? (
                  <ChevronUp className="inline ml-1" />
                ) : (
                  <ChevronDown className="inline ml-1" />
                ))}
            </TableHead>
            <TableHead>Threshold Value</TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("category")}>
              Category
              {sortColumn === "category" &&
                (sortDirection === "asc" ? (
                  <ChevronUp className="inline ml-1" />
                ) : (
                  <ChevronDown className="inline ml-1" />
                ))}
            </TableHead>
            <TableHead>Availability</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Checkbox checked={selectedProducts.includes(item.id)} onCheckedChange={() => toggleProduct(item.id)} />
              </TableCell>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.threshold}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    item.quantity > item.threshold
                      ? "border-green-500 text-green-700"
                      : item.quantity === 0
                        ? "border-red-500 text-red-700"
                        : "border-orange-500 text-orange-700"
                  }
                >
                  {item.quantity > item.threshold ? "In-stock" : item.quantity === 0 ? "Out of stock" : "Low stock"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex-1 text-sm text-gray-500">
          {selectedProducts.length} of {inventory.length} row(s) selected
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Show all</DropdownMenuItem>
              <DropdownMenuItem>Show in-stock only</DropdownMenuItem>
              <DropdownMenuItem>Show out-of-stock only</DropdownMenuItem>
              <DropdownMenuItem>Show low stock only</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">Page 1 of 10</div>
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}


"use client"

import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Switch } from "@/src/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import { Textarea } from "@/src/components/ui/textarea"
import { Edit, Plus, Search, Trash2 } from "lucide-react"
import { useState } from "react"

type MenuItem = {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  isAvailable: boolean
}

const initialMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Pad Thai",
    description: "Stir-fried rice noodles with eggs, tofu, peanuts, and bean sprouts",
    price: 120,
    category: "Main Course",
    image: "/placeholder.svg",
    isAvailable: true,
  },
  {
    id: "2",
    name: "Green Curry",
    description: "Spicy curry with coconut milk, bamboo shoots, and Thai basil",
    price: 150,
    category: "Main Course",
    image: "/placeholder.svg",
    isAvailable: true,
  },
  {
    id: "3",
    name: "Mango Sticky Rice",
    description: "Sweet sticky rice served with fresh mango and coconut cream",
    price: 80,
    category: "Dessert",
    image: "/placeholder.svg",
    isAvailable: false,
  },
]

export function MenuManagement() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems)
  const [searchQuery, setSearchQuery] = useState("")
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newItem, setNewItem] = useState<Omit<MenuItem, "id">>({
    name: "",
    description: "",
    price: 0,
    category: "",
    image: "/placeholder.svg",
    isAvailable: true,
  })

  const filteredItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddItem = () => {
    const id = (menuItems.length + 1).toString()
    setMenuItems([...menuItems, { ...newItem, id }])
    setIsAddDialogOpen(false)
    setNewItem({
      name: "",
      description: "",
      price: 0,
      category: "",
      image: "/placeholder.svg",
      isAvailable: true,
    })
  }

  const handleEditItem = () => {
    if (editingItem) {
      setMenuItems(menuItems.map((item) => (item.id === editingItem.id ? editingItem : item)))
      setEditingItem(null)
    }
  }

  const handleDeleteItem = (id: string) => {
    setMenuItems(menuItems.filter((item) => item.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Menu Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#f77700] hover:bg-[#f77700]/90">
              <Plus className="mr-2 h-4 w-4" /> Add New Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Menu Item</DialogTitle>
              <DialogDescription>Fill in the details for the new menu item.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: Number.parseFloat(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Input
                  id="category"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="isAvailable" className="text-right">
                  Available
                </Label>
                <Switch
                  id="isAvailable"
                  checked={newItem.isAvailable}
                  onCheckedChange={(checked) => setNewItem({ ...newItem, isAvailable: checked })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddItem}>Add Item</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex items-center space-x-2">
        <Search className="h-5 w-5 text-gray-500" />
        <Input
          type="search"
          placeholder="Search menu items..."
          className="w-[300px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Menu Items</CardTitle>
          <CardDescription>Manage your restaurant's menu items</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>฿{item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={item.isAvailable ? "success" : "destructive"}>
                      {item.isAvailable ? "Available" : "Unavailable"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setEditingItem(item)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Menu Item</DialogTitle>
                            <DialogDescription>Make changes to the menu item.</DialogDescription>
                          </DialogHeader>
                          {editingItem && (
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-name" className="text-right">
                                  Name
                                </Label>
                                <Input
                                  id="edit-name"
                                  value={editingItem.name}
                                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-description" className="text-right">
                                  Description
                                </Label>
                                <Textarea
                                  id="edit-description"
                                  value={editingItem.description}
                                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-price" className="text-right">
                                  Price
                                </Label>
                                <Input
                                  id="edit-price"
                                  type="number"
                                  value={editingItem.price}
                                  onChange={(e) =>
                                    setEditingItem({ ...editingItem, price: Number.parseFloat(e.target.value) })
                                  }
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-category" className="text-right">
                                  Category
                                </Label>
                                <Input
                                  id="edit-category"
                                  value={editingItem.category}
                                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-isAvailable" className="text-right">
                                  Available
                                </Label>
                                <Switch
                                  id="edit-isAvailable"
                                  checked={editingItem.isAvailable}
                                  onCheckedChange={(checked) =>
                                    setEditingItem({ ...editingItem, isAvailable: checked })
                                  }
                                />
                              </div>
                            </div>
                          )}
                          <DialogFooter>
                            <Button onClick={handleEditItem}>Save Changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">
            Showing {filteredItems.length} of {menuItems.length} items
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}


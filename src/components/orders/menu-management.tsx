"use client"

import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { ScrollArea, ScrollBar } from "@/src/components/ui/scroll-area"
import { Pencil, Plus, Search, Trash2 } from "lucide-react"
import { useRef, useState } from "react"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
}

const categories = [
  { id: "all", name: "All", icon: "🍽️" },
  { id: "main", name: "Main Course", icon: "🍖" },
  { id: "appetizer", name: "Appetizers", icon: "🥗" },
  { id: "soup", name: "Soups", icon: "🥣" },
  { id: "dessert", name: "Desserts", icon: "🍰" },
  { id: "beverage", name: "Beverages", icon: "🥤" },
]

const initialMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Pad Thai",
    description: "Rice noodles stir-fried with eggs, tofu, dried shrimp, and peanuts",
    price: 155,
    category: "main",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "2",
    name: "Green Curry",
    description: "Thai green curry with coconut milk, bamboo shoots, and Thai basil",
    price: 170,
    category: "main",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "3",
    name: "Mango Sticky Rice",
    description: "Sweet sticky rice served with fresh mango and coconut cream",
    price: 145,
    category: "dessert",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "4",
    name: "Tom Yum Soup",
    description: "Hot and sour soup with shrimp, mushrooms, and Thai herbs",
    price: 180,
    category: "soup",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "5",
    name: "Spring Rolls",
    description: "Fresh vegetables wrapped in rice paper with peanut sauce",
    price: 120,
    category: "appetizer",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "6",
    name: "Honey Lemon iced tea",
    description: "",
    price: 85,
    category: "beverage",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "7",
    name: "Hot chocolate",
    description: "",
    price: 85,
    category: "beverage",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "8",
    name: "Waffles",
    description: "",
    price: 90,
    category: "dessert",
    image: "/placeholder.svg?height=200&width=200",
  },
]

export function MenuManagement() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState<MenuItem | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleAddItem = (newItem: Omit<MenuItem, "id">) => {
    const id = (menuItems.length + 1).toString()
    setMenuItems([...menuItems, { ...newItem, id }])
    setIsAddDialogOpen(false)
  }

  const handleEditItem = (updatedItem: MenuItem) => {
    setMenuItems(menuItems.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
    setIsEditDialogOpen(false)
  }

  const handleDeleteItem = (id: string) => {
    setMenuItems(menuItems.filter((item) => item.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative w-[300px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search menu items..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="bg-[#f77700] hover:bg-[#f77700]/90">
          <Plus className="mr-2 h-4 w-4" /> Add New Item
        </Button>
      </div>

      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-4 p-1">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="aspect-square relative">
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="object-cover w-full h-full" />
              <div className="absolute top-2 right-2 flex gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 bg-white hover:bg-gray-100"
                  onClick={() => {
                    setCurrentItem(item)
                    setIsEditDialogOpen(true)
                  }}
                >
                  <Pencil className="h-4 w-4 text-gray-600" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 bg-white hover:bg-red-50"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{item.name}</h3>
                  <span className="font-bold text-[#f77700]">฿{item.price.toFixed(2)}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AddEditItemDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSave={handleAddItem}
        item={null}
      />
      <AddEditItemDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleEditItem}
        item={currentItem}
      />
    </div>
  )
}

interface AddEditItemDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (item: any) => void
  item: MenuItem | null
}

function AddEditItemDialog({ isOpen, onClose, onSave, item }: AddEditItemDialogProps) {
  const [name, setName] = useState(item?.name || "")
  const [description, setDescription] = useState(item?.description || "")
  const [price, setPrice] = useState(item?.price.toString() || "")
  const [category, setCategory] = useState(item?.category || "main")
  const [image, setImage] = useState(item?.image || "/placeholder.svg?height=200&width=200")
  const [previewImage, setPreviewImage] = useState(item?.image || "/placeholder.svg?height=200&width=200")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setPreviewImage(result)
        setImage(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    onSave({
      id: item?.id || "",
      name,
      description,
      price: Number.parseFloat(price),
      category,
      image: previewImage,
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{item ? "Edit Menu Item" : "Add Menu Item"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Image</Label>
            <div className="flex flex-col items-center gap-4">
              <div className="relative aspect-square w-full max-w-[200px] overflow-hidden rounded-lg border">
                <img src={previewImage || "/placeholder.svg"} alt="Preview" className="h-full w-full object-cover" />
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                Choose Image
              </Button>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Price</Label>
            <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {categories
                .filter((c) => c.id !== "all")
                .map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-[#f77700] hover:bg-[#f77700]/90">
            {item ? "Save Changes" : "Add Item"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


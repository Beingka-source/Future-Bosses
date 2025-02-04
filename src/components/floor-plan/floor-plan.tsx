"use client"

import { Button } from "@/src/components/ui/button"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/src/components/ui/sheet"
import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import cn from "classnames"
import { Circle, Clock, Mail, Phone, Plus, TableIcon, Users } from "lucide-react"
import { useState } from "react"
import { AddOrderDialog } from "./add-order-dialog"
import { CustomerInputDialog } from "./customer-input-dialog"
import { MenuSelectionDialog } from "./menu-selection-dialog"
import { Table } from "./table"

export type TableStatus = "available" | "occupied" | "ordered" | "serving" | "reserved"
export type OrderItem = {
  id: string
  name: string
  quantity: number
  price: number
  status: "pending" | "preparing" | "served"
}

export type BookingInfo = {
  customerName: string
  phoneNumber: string
  email: string
  numberOfGuests: number
  bookingTime: string
  specialRequests?: string
}

export type TableData = {
  id: string
  number: string
  status: TableStatus
  orders: OrderItem[]
  booking?: BookingInfo
  numberOfCustomers?: number
  totalCost?: number
}

// Initial table data
const initialTables: TableData[] = [
  {
    id: "t1",
    number: "T-01",
    status: "available",
    orders: [],
  },
  {
    id: "t2",
    number: "T-02",
    status: "serving",
    orders: [
      { id: "o1", name: "Pad Thai", quantity: 2, price: 250, status: "served" },
      { id: "o2", name: "Green Curry", quantity: 1, price: 180, status: "pending" },
    ],
  },
  {
    id: "t3",
    number: "T-03",
    status: "ordered",
    orders: [
      { id: "o3", name: "Tom Yum Kung", quantity: 1, price: 300, status: "preparing" },
      { id: "o4", name: "Mango Sticky Rice", quantity: 2, price: 150, status: "pending" },
    ],
  },
  {
    id: "t6",
    number: "T-06",
    status: "reserved",
    booking: {
      customerName: "John Smith",
      phoneNumber: "+66 89 123 4567",
      email: "john.smith@email.com",
      numberOfGuests: 4,
      bookingTime: "19:00",
      specialRequests: "Window seat preferred",
    },
    orders: [],
  },
  {
    id: "t4",
    number: "T-04",
    status: "serving",
    orders: [],
  },
  {
    id: "t5",
    number: "T-05",
    status: "serving",
    orders: [],
  },
  {
    id: "t7",
    number: "T-07",
    status: "serving",
    orders: [],
  },
  {
    id: "t8",
    number: "T-08",
    status: "reserved",
    orders: [],
  },
  {
    id: "t9",
    number: "T-09",
    status: "ordered",
    orders: [],
  },
  {
    id: "t10",
    number: "T-10",
    status: "ordered",
    orders: [],
  },
  {
    id: "t11",
    number: "T-11",
    status: "serving",
    orders: [],
  },
  {
    id: "t12",
    number: "T-12",
    status: "reserved",
    orders: [],
  },
  {
    id: "t13",
    number: "T-13",
    status: "ordered",
    orders: [],
  },
  {
    id: "t14",
    number: "T-14",
    status: "reserved",
    orders: [],
  },
]

export function FloorPlan() {
  const [selectedTable, setSelectedTable] = useState<TableData | null>(null)
  const [currentFloor, setCurrentFloor] = useState("floor-1")
  const [showAddOrderDialog, setShowAddOrderDialog] = useState(false)
  const [showCustomerInputDialog, setShowCustomerInputDialog] = useState(false)
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null)
  const [tables, setTables] = useState<TableData[]>(initialTables)
  const [showMenuDialog, setShowMenuDialog] = useState(false)

  const calculateTableTotal = (orders: OrderItem[]) => {
    return orders
      .filter((order) => order.status === "served")
      .reduce((total, order) => total + order.price * order.quantity, 0)
  }

  const renderTableDetails = () => {
    if (!selectedTable) return null

    if (selectedTable.status === "reserved" && selectedTable.booking) {
      return (
        <div className="mt-6 space-y-6">
          <div className="rounded-lg border bg-purple-50 p-4">
            <div className="flex items-center gap-2 font-medium text-purple-700">
              <Clock className="h-5 w-5" />
              Reserved for {selectedTable.booking.bookingTime}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-gray-500" />
              <div>
                <div className="font-medium">{selectedTable.booking.customerName}</div>
                <div className="text-sm text-gray-500">{selectedTable.booking.numberOfGuests} guests</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-gray-500" />
              <div>
                <div className="font-medium">Phone</div>
                <div className="text-sm text-gray-500">{selectedTable.booking.phoneNumber}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-500" />
              <div>
                <div className="font-medium">Email</div>
                <div className="text-sm text-gray-500">{selectedTable.booking.email}</div>
              </div>
            </div>

            {selectedTable.booking.specialRequests && (
              <div className="rounded-lg border p-4">
                <div className="font-medium">Special Requests</div>
                <div className="mt-1 text-sm text-gray-500">{selectedTable.booking.specialRequests}</div>
              </div>
            )}
          </div>
          <Button
            className="w-full bg-[#f77700] hover:bg-[#f77700]/90 text-white"
            onClick={() => handleConfirmArrival(selectedTable.id)}
          >
            Confirm Arrival
          </Button>
        </div>
      )
    }

    // Render orders for ordered/serving tables
    if (selectedTable.orders && selectedTable.orders.length > 0) {
      const total = calculateTableTotal(selectedTable.orders)

      return (
        <div className="mt-6">
          <div className="space-y-4">
            {selectedTable.orders.map((order) => (
              <div key={order.id} className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <div className="font-medium">{order.name}</div>
                  <div className="text-sm text-gray-500">Quantity: {order.quantity}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">฿{(order.price * order.quantity).toLocaleString()}</div>
                  <div className={cn("text-sm", order.status === "served" ? "text-green-600" : "text-gray-500")}>
                    {order.status}
                  </div>
                </div>
                {order.status !== "served" && (
                  <Button size="sm" variant="outline" onClick={() => handleServeOrder(selectedTable.id, order.id)}>
                    Serve
                  </Button>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between items-center">
              <div className="font-semibold text-lg">Total (Served Items)</div>
              <div className="font-semibold text-lg">฿{total.toLocaleString()}</div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              onClick={() => handleCompleteTable(selectedTable.id)}
            >
              Complete Order
            </Button>
            <Button
              className="w-full"
              onClick={() => {
                setShowAddOrderDialog(true)
                setSelectedTableId(selectedTable.id)
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Order
            </Button>
          </div>
        </div>
      )
    }

    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="text-center text-gray-500">No information available</div>
      </div>
    )
  }

  const handleServeOrder = (tableId: string, orderId: string) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId
          ? {
            ...table,
            orders: table.orders.map((order) => (order.id === orderId ? { ...order, status: "served" } : order)),
          }
          : table,
      ),
    )
  }

  const handleTableClick = (table: TableData) => {
    if (table.status === "available") {
      setSelectedTableId(table.id)
      setShowCustomerInputDialog(true)
    } else if (table.status === "occupied") {
      setSelectedTableId(table.id)
      setShowMenuDialog(true)
    } else if (table.status === "ordered" || table.status === "serving" || table.status === "reserved") {
      setSelectedTable(table)
    }
  }

  const handleCustomerInput = (data: { numberOfCustomers: number }) => {
    if (selectedTableId) {
      setTables((prevTables) =>
        prevTables.map((table) =>
          table.id === selectedTableId
            ? {
              ...table,
              status: "occupied",
              numberOfCustomers: data.numberOfCustomers,
            }
            : table,
        ),
      )
      setShowMenuDialog(true)
    }
    setShowCustomerInputDialog(false)
  }

  const handleCompleteTable = (tableId: string) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId
          ? {
            ...table,
            status: "available",
            numberOfCustomers: undefined,
            totalCost: undefined,
            orders: [],
          }
          : table,
      ),
    )
  }

  const handleConfirmArrival = (tableId: string) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId
          ? {
            ...table,
            status: "occupied",
            numberOfCustomers: table.booking?.numberOfGuests || 0,
          }
          : table,
      ),
    )
    setSelectedTableId(tableId)
    setShowMenuDialog(true)
    setSelectedTable(null)
  }

  const handleMenuSelection = (selectedItems: { id: string; name: string; quantity: number; price: number }[]) => {
    if (selectedTableId) {
      setTables((prevTables) =>
        prevTables.map((table) =>
          table.id === selectedTableId
            ? {
              ...table,
              status: "ordered",
              orders: [
                ...table.orders,
                ...selectedItems.map((item) => ({
                  id: `o${Date.now()}-${item.id}`,
                  name: item.name,
                  quantity: item.quantity,
                  price: item.price,
                  status: "pending" as const,
                })),
              ],
              totalCost:
                (table.totalCost || 0) + selectedItems.reduce((total, item) => total + item.price * item.quantity, 0),
            }
            : table,
        ),
      )
    }
    setShowMenuDialog(false)
    setSelectedTableId(null)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Floor Plan</h1>
          <p className="text-gray-500">Manage and monitor table status</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Tabs value={currentFloor} onValueChange={setCurrentFloor}>
          <TabsList>
            <TabsTrigger value="floor-1">Floor-1</TabsTrigger>
            <TabsTrigger value="floor-2">2nd Floor</TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm" onClick={() => console.log("Refresh floor plan")}>
            Refresh
          </Button>
        </Tabs>
        <div className="ml-auto flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Circle className="h-3 w-3 fill-red-500 text-red-500" />
            <span className="text-sm">Ordered</span>
          </div>
          <div className="flex items-center gap-2">
            <Circle className="h-3 w-3 fill-green-500 text-green-500" />
            <span className="text-sm">Serving</span>
          </div>
          <div className="flex items-center gap-2">
            <Circle className="h-3 w-3 fill-purple-500 text-purple-500" />
            <span className="text-sm">Reserved</span>
          </div>
          <div className="flex items-center gap-2">
            <Circle className="h-3 w-3 fill-gray-200 text-gray-200" />
            <span className="text-sm">Available</span>
          </div>
        </div>
      </div>

      <div className="relative min-h-[600px] rounded-lg border bg-white p-8">
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="grid grid-cols-4 gap-8">
            {tables.map((table) => (
              <Table
                key={table.id}
                table={table}
                onClick={() => handleTableClick(table)}
                onComplete={() => handleCompleteTable(table.id)}
              />
            ))}
            <div className="col-span-1 flex aspect-square items-center justify-center rounded-lg border border-dashed">
              <div className="text-center">
                <TableIcon className="mx-auto h-8 w-8 text-gray-400" />
                <span className="mt-2 block text-sm text-gray-500">Cashier</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Sheet open={selectedTable !== null} onOpenChange={() => setSelectedTable(null)}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>
              Table {selectedTable?.number} - {selectedTable?.status === "reserved" ? "Reservation" : "Orders"}
            </SheetTitle>
          </SheetHeader>
          <div className="py-4">{renderTableDetails()}</div>
          <SheetFooter>
            <Button onClick={() => setSelectedTable(null)} className="w-full">
              Close
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <AddOrderDialog
        open={showAddOrderDialog}
        onOpenChange={setShowAddOrderDialog}
        onAddOrder={(newOrder) => {
          if (selectedTableId) {
            setTables((prevTables) =>
              prevTables.map((table) =>
                table.id === selectedTableId
                  ? {
                    ...table,
                    orders: [...table.orders, { ...newOrder, id: `o${Date.now()}`, status: "pending" }],
                    status: table.status === "available" ? "ordered" : table.status,
                  }
                  : table,
              ),
            )
          }
          setShowAddOrderDialog(false)
        }}
      />
      <CustomerInputDialog
        open={showCustomerInputDialog}
        onOpenChange={setShowCustomerInputDialog}
        onSubmit={handleCustomerInput}
        initialCustomers={tables.find((t) => t.id === selectedTableId)?.booking?.numberOfGuests || 1}
      />
      <MenuSelectionDialog open={showMenuDialog} onOpenChange={setShowMenuDialog} onSelectItems={handleMenuSelection} />
    </div>
  )
}


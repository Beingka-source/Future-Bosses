"use client"

import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { ArrowLeft, Calendar, Clock, DollarSign, User } from "lucide-react"
import type { Transaction } from "./slip-verification"

interface SlipDetailsProps {
  transaction: Transaction
  onBack: () => void
}

const orderItems = [
  { name: "Pad Thai", quantity: 2, price: 250 },
  { name: "Green Curry", quantity: 1, price: 180 },
  { name: "Mango Sticky Rice", quantity: 2, price: 120 },
]

export function SlipDetails({ transaction, onBack }: SlipDetailsProps) {
  const subtotal = orderItems.reduce((sum, item) => sum + item.quantity * item.price, 0)
  const tax = subtotal * 0.07
  const total = subtotal + tax

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-semibold">Transaction Details</h2>
          <p className="text-sm text-gray-500">Invoice ID: {transaction.id}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-gray-500" />
              <div>
                <div className="font-medium">Table Number</div>
                <div className="text-sm text-gray-500">{transaction.tableNo}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-gray-500" />
              <div>
                <div className="font-medium">Total Amount</div>
                <div className="text-sm text-gray-500">฿{transaction.amount.toFixed(2)}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <div className="font-medium">Transaction Date</div>
                <div className="text-sm text-gray-500">January 26, 2024</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-gray-500" />
              <div>
                <div className="font-medium">Transaction Time</div>
                <div className="text-sm text-gray-500">{transaction.time}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Order Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orderItems.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500">Quantity: {item.quantity}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">฿{(item.price * item.quantity).toFixed(2)}</div>
                    <div className="text-sm text-gray-500">฿{item.price.toFixed(2)} each</div>
                  </div>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <div className="font-medium">Subtotal</div>
                  <div className="font-medium">฿{subtotal.toFixed(2)}</div>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <div>Tax (7%)</div>
                  <div>฿{tax.toFixed(2)}</div>
                </div>
                <div className="flex justify-between font-bold mt-2">
                  <div>Total</div>
                  <div>฿{total.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onBack}>
          Back to List
        </Button>
        <Button className="bg-[#f77700] hover:bg-[#f77700]/90">Verify Slip</Button>
      </div>
    </div>
  )
}


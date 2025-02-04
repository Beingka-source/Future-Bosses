"use client"

import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { AnimatePresence, motion } from "framer-motion"
import { Bell, Search } from "lucide-react"
import { useState } from "react"
import { SlipDashboard } from "./slip-dashboard"
import { SlipDetails } from "./slip-details"
import { SlipHistory } from "./slip-history"

export type Transaction = {
  id: string
  tableNo: string
  cashier: string
  time: string
  amount: number
  status: "completed" | "pending" | "cancelled"
}

const transactions: Transaction[] = [
  {
    id: "FZ00012",
    tableNo: "T-01",
    cashier: "Maria Lopez",
    time: "10:25 AM",
    amount: 850.75,
    status: "completed",
  },
  {
    id: "FZ00011",
    tableNo: "T-02",
    cashier: "Maria Lopez",
    time: "10:15 AM",
    amount: 1250.5,
    status: "completed",
  },
  {
    id: "FZ00010",
    tableNo: "T-03",
    cashier: "John Smith",
    time: "10:05 AM",
    amount: 750.25,
    status: "pending",
  },
  {
    id: "FZ00009",
    tableNo: "T-04",
    cashier: "Emily Brown",
    time: "9:55 AM",
    amount: 1100.0,
    status: "completed",
  },
  {
    id: "FZ00008",
    tableNo: "T-05",
    cashier: "David Wilson",
    time: "9:45 AM",
    amount: 950.5,
    status: "cancelled",
  },
]

export function SlipVerification() {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Slip Verification</h1>
          <p className="text-gray-500">Verify and manage transaction slips</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              type="search"
              placeholder="Search slips..."
              className="pl-9 w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="history">Slip History</TabsTrigger>
          <TabsTrigger value="details" disabled={!selectedTransaction}>
            Customer Details
          </TabsTrigger>
        </TabsList>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTransaction ? "details" : "content"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {selectedTransaction ? (
              <SlipDetails transaction={selectedTransaction} onBack={() => setSelectedTransaction(null)} />
            ) : (
              <>
                <TabsContent value="dashboard">
                  <SlipDashboard transactions={transactions} />
                </TabsContent>
                <TabsContent value="history">
                  <SlipHistory
                    transactions={transactions.filter(
                      (t) =>
                        t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        t.tableNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        t.cashier.toLowerCase().includes(searchQuery.toLowerCase()),
                    )}
                    onSelectTransaction={setSelectedTransaction}
                  />
                </TabsContent>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </div>
  )
}


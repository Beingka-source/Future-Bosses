"use client"

import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import { ChevronRight } from "lucide-react"
import type { Transaction } from "./slip-verification"

interface SlipHistoryProps {
  transactions: Transaction[]
  onSelectTransaction: (transaction: Transaction) => void
}

export function SlipHistory({ transactions, onSelectTransaction }: SlipHistoryProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice No.</TableHead>
            <TableHead>Table No.</TableHead>
            <TableHead>Cashier Name</TableHead>
            <TableHead>Billing Time</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">{transaction.id}</TableCell>
              <TableCell>{transaction.tableNo}</TableCell>
              <TableCell>{transaction.cashier}</TableCell>
              <TableCell>{transaction.time}</TableCell>
              <TableCell>฿{transaction.amount.toFixed(2)}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    transaction.status === "completed"
                      ? "default"
                      : transaction.status === "pending"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {transaction.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" onClick={() => onSelectTransaction(transaction)}>
                  View Details
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


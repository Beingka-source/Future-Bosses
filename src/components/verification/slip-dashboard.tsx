"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { AlertTriangle, ArrowDownRight, ArrowUpRight, Clock, DollarSign, Receipt } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { Transaction } from "./slip-verification"

const stats = [
  {
    title: "Total Revenue",
    value: "฿12,345",
    change: "+15%",
    changeType: "positive",
    icon: DollarSign,
  },
  {
    title: "Verified Slips",
    value: "156",
    change: "+23%",
    changeType: "positive",
    icon: Receipt,
  },
  {
    title: "Pending Verification",
    value: "8",
    change: "-5%",
    changeType: "negative",
    icon: Clock,
  },
  {
    title: "Cancelled Transactions",
    value: "3",
    change: "+1",
    changeType: "negative",
    icon: AlertTriangle,
  },
]

const chartData = [
  { name: "Mon", total: 1200 },
  { name: "Tue", total: 1800 },
  { name: "Wed", total: 2200 },
  { name: "Thu", total: 1800 },
  { name: "Fri", total: 2400 },
  { name: "Sat", total: 2800 },
  { name: "Sun", total: 3200 },
]

interface SlipDashboardProps {
  transactions: Transaction[]
}

export function SlipDashboard({ transactions }: SlipDashboardProps) {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p
                  className={`text-xs ${stat.changeType === "positive" ? "text-green-500" : "text-red-500"
                    } flex items-center`}
                >
                  {stat.changeType === "positive" ? (
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="mr-1 h-4 w-4" />
                  )}
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Weekly Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `฿${value}`}
              />
              <Tooltip
                formatter={(value: number) => [`฿${value}`, "Revenue"]}
                labelFormatter={(label) => `Day: ${label}`}
              />
              <Bar dataKey="total" fill="#f77700" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}


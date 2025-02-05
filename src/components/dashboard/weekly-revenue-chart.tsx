import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const revenueData = [
    { name: "Mon", total: 1200 },
    { name: "Tue", total: 1800 },
    { name: "Wed", total: 2200 },
    { name: "Thu", total: 1800 },
    { name: "Fri", total: 2400 },
    { name: "Sat", total: 2800 },
    { name: "Sun", total: 3200 },
]

export function WeeklyRevenueChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Weekly Revenue</CardTitle>
                <CardDescription>Overview of this week's revenue</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueData}>
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
    )
}


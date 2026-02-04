"use client"

import {
  Bar,
  BarChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  Pie,
  PieChart,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

const teachingHoursData = [
  { name: "PGS.TS. Nguyễn Văn An", hours: 62, department: "CNTT" },
  { name: "TS. Trần Thị Bình", hours: 58, department: "CNTT" },
  { name: "ThS. Lê Văn Cường", hours: 45, department: "KHMT" },
  { name: "PGS.TS. Phạm Thị Dung", hours: 52, department: "CNPM" },
  { name: "TS. Hoàng Văn Em", hours: 48, department: "HTTT" },
  { name: "ThS. Nguyễn Thị Phương", hours: 55, department: "CNTT" },
  { name: "TS. Trần Văn Giang", hours: 50, department: "KHMT" },
  { name: "PGS.TS. Lê Thị Hoa", hours: 60, department: "CNPM" },
]

const monthlyTrendData = [
  { month: "T1", hours: 380, classes: 24 },
  { month: "T2", hours: 420, classes: 28 },
  { month: "T3", hours: 450, classes: 30 },
  { month: "T4", hours: 480, classes: 32 },
  { month: "T5", hours: 410, classes: 27 },
  { month: "T6", hours: 320, classes: 20 },
  { month: "T7", hours: 280, classes: 18 },
  { month: "T8", hours: 350, classes: 22 },
  { month: "T9", hours: 460, classes: 31 },
  { month: "T10", hours: 490, classes: 33 },
  { month: "T11", hours: 470, classes: 31 },
  { month: "T12", hours: 400, classes: 26 },
]

const departmentData = [
  { name: "Công nghệ thông tin", value: 35, color: "#4f6bed" },
  { name: "Khoa học máy tính", value: 25, color: "#22c55e" },
  { name: "Công nghệ phần mềm", value: 22, color: "#f59e0b" },
  { name: "Hệ thống thông tin", value: 18, color: "#8b5cf6" },
]

const roomUsageData = [
  { name: "Tòa A", usage: 85 },
  { name: "Tòa B", usage: 72 },
  { name: "Tòa C", usage: 68 },
  { name: "Tòa D", usage: 55 },
]

export function StatisticsModule() {
  const [semester, setSemester] = useState("hk1")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Thống kê giờ dạy</h2>
          <p className="text-muted-foreground">
            Xem thống kê chi tiết về giờ dạy của giảng viên và sử dụng phòng học
          </p>
        </div>
        <Select value={semester} onValueChange={setSemester}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hk1">Học kỳ 1 - 2024</SelectItem>
            <SelectItem value="hk2">Học kỳ 2 - 2024</SelectItem>
            <SelectItem value="year">Cả năm 2024</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Teaching Hours by Instructor */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Giờ dạy theo giảng viên</CardTitle>
            <CardDescription>Top giảng viên có số giờ dạy cao nhất</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                hours: {
                  label: "Số giờ",
                  color: "#4f6bed",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={teachingHoursData} layout="vertical" margin={{ left: 0, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={150}
                    tick={{ fontSize: 11 }}
                  />
                  <ChartTooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <p className="font-medium text-sm">{data.name}</p>
                            <p className="text-sm text-muted-foreground">Số giờ: {data.hours}</p>
                            <p className="text-xs text-muted-foreground">Khoa: {data.department}</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar dataKey="hours" fill="#4f6bed" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Monthly Trend */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Xu hướng giảng dạy theo tháng</CardTitle>
            <CardDescription>Số giờ dạy và số lớp qua các tháng</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                hours: {
                  label: "Số giờ",
                  color: "#4f6bed",
                },
                classes: {
                  label: "Số lớp",
                  color: "#22c55e",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <p className="font-medium text-sm">Tháng {label}</p>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-[#4f6bed]" />
                              <span className="text-sm text-muted-foreground">Số giờ: {payload[0]?.value}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-[#22c55e]" />
                              <span className="text-sm text-muted-foreground">Số lớp: {payload[1]?.value}</span>
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="hours"
                    stroke="#4f6bed"
                    strokeWidth={2}
                    dot={{ fill: "#4f6bed" }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="classes"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={{ fill: "#22c55e" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Phân bổ giờ dạy theo khoa</CardTitle>
            <CardDescription>Tỷ lệ giờ dạy của từng khoa/bộ môn</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                    labelLine={false}
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: data.color }} />
                              <span className="font-medium">{data.name}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Tỷ lệ: {data.value}%</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              {departmentData.map((dept) => (
                <div key={dept.name} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: dept.color }} />
                  <span className="text-xs text-muted-foreground">{dept.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Room Usage */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Tỷ lệ sử dụng phòng học</CardTitle>
            <CardDescription>Phần trăm thời gian sử dụng theo tòa nhà</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                usage: {
                  label: "Tỷ lệ sử dụng (%)",
                  color: "#4f6bed",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={roomUsageData} margin={{ top: 20, right: 20, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <ChartTooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <p className="font-medium text-sm">{data.name}</p>
                            <p className="text-sm text-muted-foreground">Tỷ lệ sử dụng: {data.usage}%</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar dataKey="usage" fill="#4f6bed" radius={[4, 4, 0, 0]}>
                    {roomUsageData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.usage > 75 ? "#22c55e" : entry.usage > 50 ? "#f59e0b" : "#ef4444"} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 flex justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#22c55e]" />
                <span className="text-xs text-muted-foreground">Cao ({'>'}75%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#f59e0b]" />
                <span className="text-xs text-muted-foreground">Trung bình (50-75%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#ef4444]" />
                <span className="text-xs text-muted-foreground">Thấp ({'<'}50%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

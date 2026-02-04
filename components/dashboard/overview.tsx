"use client"

import { Users, DoorOpen, BookOpen, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const statsData = [
  {
    title: "Tổng giảng viên",
    value: "48",
    change: "+3 so với kỳ trước",
    icon: Users,
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Phòng học",
    value: "32",
    change: "Đang hoạt động: 28",
    icon: DoorOpen,
    color: "bg-success/10 text-success",
  },
  {
    title: "Môn học",
    value: "156",
    change: "Học kỳ này: 89",
    icon: BookOpen,
    color: "bg-warning/10 text-warning",
  },
  {
    title: "Tổng giờ dạy",
    value: "2,456",
    change: "Trung bình: 51 giờ/GV",
    icon: Clock,
    color: "bg-chart-3/10 text-chart-3",
  },
]

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Tổng quan</h2>
        <p className="text-muted-foreground">
          Thống kê tổng hợp về hoạt động giảng dạy của trường
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat) => (
          <Card key={stat.title} className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`rounded-lg p-2 ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Thêm giảng viên mới", user: "Nguyễn Văn A", time: "5 phút trước" },
                { action: "Cập nhật lịch dạy", user: "Trần Thị B", time: "1 giờ trước" },
                { action: "Tạo môn học mới", user: "Lê Văn C", time: "2 giờ trước" },
                { action: "Xuất báo cáo Excel", user: "Admin", time: "3 giờ trước" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between border-b border-border/50 pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.user}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Lịch dạy hôm nay</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { course: "Cơ sở dữ liệu", room: "A201", time: "07:00 - 09:30", instructor: "PGS.TS Nguyễn Văn A" },
                { course: "Lập trình web", room: "B302", time: "09:45 - 12:15", instructor: "ThS. Trần Thị B" },
                { course: "Mạng máy tính", room: "A105", time: "13:00 - 15:30", instructor: "TS. Lê Văn C" },
                { course: "Trí tuệ nhân tạo", room: "B201", time: "15:45 - 18:15", instructor: "PGS.TS Phạm Văn D" },
              ].map((schedule, index) => (
                <div key={index} className="flex items-center justify-between border-b border-border/50 pb-3 last:border-0 last:pb-0">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{schedule.course}</p>
                    <p className="text-xs text-muted-foreground">{schedule.instructor}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-primary">{schedule.room}</p>
                    <p className="text-xs text-muted-foreground">{schedule.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

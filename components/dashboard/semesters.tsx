"use client"

import { useState } from "react"
import useSWR from "swr"
import {
  CalendarDays,
  Plus,
  Search,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  CalendarCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useSemester } from "@/contexts/semester-context"

interface Semester {
  _id: string
  code: string
  name: string
  shortName: string
  semesterNumber: 1 | 2 | 3
  academicYear: string
  startDate: string
  endDate: string
  isActive: boolean
  isCurrent: boolean
  status: "upcoming" | "ongoing" | "completed"
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

// Generate academic years (current year - 2 to current year + 2)
const generateAcademicYears = () => {
  const currentYear = new Date().getFullYear()
  const years: string[] = []
  for (let i = -2; i <= 2; i++) {
    years.push(`${currentYear + i}-${currentYear + i + 1}`)
  }
  return years
}

export function SemestersModule() {
  const { data: semesters = [], mutate } = useSWR<Semester[]>("/api/semesters", fetcher)
  const { refetch: refetchContext } = useSemester()
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newSemester, setNewSemester] = useState({
    semesterNumber: "1" as "1" | "2" | "3",
    academicYear: generateAcademicYears()[2], // Current year
    startDate: "",
    endDate: "",
    status: "upcoming" as "upcoming" | "ongoing" | "completed",
    isCurrent: false,
  })

  const filteredSemesters = semesters.filter(
    (semester) =>
      semester.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      semester.academicYear.includes(searchTerm) ||
      semester.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddSemester = async () => {
    const semesterNum = parseInt(newSemester.semesterNumber)
    const semesterName =
      semesterNum === 3
        ? `Học kỳ hè - Năm học ${newSemester.academicYear}`
        : `Học kỳ ${semesterNum} - Năm học ${newSemester.academicYear}`

    const payload = {
      semesterNumber: semesterNum,
      academicYear: newSemester.academicYear,
      name: semesterName,
      startDate: new Date(newSemester.startDate),
      endDate: new Date(newSemester.endDate),
      status: newSemester.status,
      isCurrent: newSemester.isCurrent,
    }

    try {
      const res = await fetch("/api/semesters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        mutate()
        refetchContext()
        setIsAddDialogOpen(false)
        setNewSemester({
          semesterNumber: "1",
          academicYear: generateAcademicYears()[2],
          startDate: "",
          endDate: "",
          status: "upcoming",
          isCurrent: false,
        })
      }
    } catch (error) {
      console.error("Error adding semester:", error)
    }
  }

  const handleSetCurrent = async (semester: Semester) => {
    try {
      const res = await fetch("/api/semesters", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: semester._id, isCurrent: true }),
      })

      if (res.ok) {
        mutate()
        refetchContext()
      }
    } catch (error) {
      console.error("Error setting current semester:", error)
    }
  }

  const handleUpdateStatus = async (semester: Semester, status: string) => {
    try {
      const res = await fetch("/api/semesters", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: semester._id, status }),
      })

      if (res.ok) {
        mutate()
        refetchContext()
      }
    } catch (error) {
      console.error("Error updating semester status:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa học kỳ này?")) return

    try {
      const res = await fetch(`/api/semesters?id=${id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        mutate()
        refetchContext()
      }
    } catch (error) {
      console.error("Error deleting semester:", error)
    }
  }

  const getStatusBadge = (status: string, isCurrent: boolean) => {
    if (isCurrent) {
      return (
        <Badge className="bg-primary text-primary-foreground">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          Học kỳ hiện tại
        </Badge>
      )
    }
    switch (status) {
      case "ongoing":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            <Clock className="mr-1 h-3 w-3" />
            Đang diễn ra
          </Badge>
        )
      case "upcoming":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            <CalendarCheck className="mr-1 h-3 w-3" />
            Sắp tới
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="secondary" className="bg-muted text-muted-foreground">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Đã kết thúc
          </Badge>
        )
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const academicYears = generateAcademicYears()

  return (
    <div className="space-y-6">
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-primary" />
                Quản lý Học kỳ
              </CardTitle>
              <CardDescription>Quản lý các học kỳ trong năm học</CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Thêm học kỳ
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Thêm học kỳ mới</DialogTitle>
                  <DialogDescription>Điền thông tin để tạo học kỳ mới</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Học kỳ</Label>
                      <Select
                        value={newSemester.semesterNumber}
                        onValueChange={(value: "1" | "2" | "3") =>
                          setNewSemester({ ...newSemester, semesterNumber: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn học kỳ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Học kỳ 1</SelectItem>
                          <SelectItem value="2">Học kỳ 2</SelectItem>
                          <SelectItem value="3">Học kỳ hè</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Năm học</Label>
                      <Select
                        value={newSemester.academicYear}
                        onValueChange={(value) =>
                          setNewSemester({ ...newSemester, academicYear: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn năm học" />
                        </SelectTrigger>
                        <SelectContent>
                          {academicYears.map((year) => (
                            <SelectItem key={year} value={year}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Ngày bắt đầu</Label>
                      <Input
                        type="date"
                        value={newSemester.startDate}
                        onChange={(e) =>
                          setNewSemester({ ...newSemester, startDate: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Ngày kết thúc</Label>
                      <Input
                        type="date"
                        value={newSemester.endDate}
                        onChange={(e) =>
                          setNewSemester({ ...newSemester, endDate: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Trạng thái</Label>
                    <Select
                      value={newSemester.status}
                      onValueChange={(value: "upcoming" | "ongoing" | "completed") =>
                        setNewSemester({ ...newSemester, status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upcoming">Sắp tới</SelectItem>
                        <SelectItem value="ongoing">Đang diễn ra</SelectItem>
                        <SelectItem value="completed">Đã kết thúc</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isCurrent"
                      checked={newSemester.isCurrent}
                      onCheckedChange={(checked) =>
                        setNewSemester({ ...newSemester, isCurrent: checked })
                      }
                    />
                    <Label htmlFor="isCurrent">Đặt làm học kỳ hiện tại</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Hủy
                  </Button>
                  <Button onClick={handleAddSemester}>Thêm học kỳ</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm học kỳ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <div className="rounded-md border border-border/50">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã học kỳ</TableHead>
                  <TableHead>Tên học kỳ</TableHead>
                  <TableHead>Năm học</TableHead>
                  <TableHead>Thời gian</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSemesters.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      Chưa có học kỳ nào. Hãy thêm học kỳ mới.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSemesters.map((semester) => (
                    <TableRow key={semester._id}>
                      <TableCell className="font-medium">{semester.code}</TableCell>
                      <TableCell>{semester.name}</TableCell>
                      <TableCell>{semester.academicYear}</TableCell>
                      <TableCell>
                        {formatDate(semester.startDate)} - {formatDate(semester.endDate)}
                      </TableCell>
                      <TableCell>{getStatusBadge(semester.status, semester.isCurrent)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {!semester.isCurrent && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleSetCurrent(semester)}
                              title="Đặt làm học kỳ hiện tại"
                            >
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                          )}
                          <Select
                            value={semester.status}
                            onValueChange={(value) => handleUpdateStatus(semester, value)}
                          >
                            <SelectTrigger className="w-[130px] h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="upcoming">Sắp tới</SelectItem>
                              <SelectItem value="ongoing">Đang diễn ra</SelectItem>
                              <SelectItem value="completed">Đã kết thúc</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(semester._id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

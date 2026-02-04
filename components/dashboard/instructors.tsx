"use client"

import { useState } from "react"
import { Plus, Search, Edit, Trash2, Mail, Phone, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
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
import { Textarea } from "@/components/ui/textarea"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const initialInstructors = [
  { 
    id: 1, 
    code: "GV001",
    name: "PGS.TS. Nguyễn Văn An", 
    email: "an.nguyen@uni.edu.vn", 
    phone: "0901234567", 
    department: "Công nghệ thông tin", 
    position: "Phó Giáo sư",
    maxHoursPerWeek: 20,
    specializations: ["Lập trình", "Cấu trúc dữ liệu"],
    teachingNotes: "",
    status: "active" 
  },
  { 
    id: 2, 
    code: "GV002",
    name: "TS. Trần Thị Bình", 
    email: "binh.tran@uni.edu.vn", 
    phone: "0912345678", 
    department: "Khoa học máy tính", 
    position: "Tiến sĩ",
    maxHoursPerWeek: 18,
    specializations: ["Trí tuệ nhân tạo"],
    teachingNotes: "",
    status: "active" 
  },
  { 
    id: 3, 
    code: "GV003",
    name: "ThS. Lê Văn Cường", 
    email: "cuong.le@uni.edu.vn", 
    phone: "0923456789", 
    department: "Công nghệ phần mềm", 
    position: "Giảng viên",
    maxHoursPerWeek: 24,
    specializations: ["Phát triển web"],
    teachingNotes: "",
    status: "active" 
  },
]

interface Instructor {
  id: number
  code: string
  name: string
  email: string
  phone: string
  department: string
  position: string
  maxHoursPerWeek: number
  specializations: string[]
  teachingNotes: string
  status: "active" | "inactive" | "on_leave"
}

export function InstructorsModule() {
  const [instructors, setInstructors] = useState(initialInstructors)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null)
  const [newInstructor, setNewInstructor] = useState({
    code: "",
    name: "",
    email: "",
    phone: "",
    department: "",
    position: "Giảng viên",
    maxHoursPerWeek: 20,
    specializations: [] as string[],
    teachingNotes: "",
    status: "active" as "active" | "inactive" | "on_leave"
  })

  const filteredInstructors = instructors.filter(
    (instructor) =>
      instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddInstructor = () => {
    if (newInstructor.name && newInstructor.email && newInstructor.code) {
      setInstructors([
        ...instructors,
        { 
          ...newInstructor, 
          id: Math.max(...instructors.map(i => i.id), 0) + 1
        }
      ])
      setNewInstructor({ 
        code: "",
        name: "", 
        email: "", 
        phone: "", 
        department: "", 
        position: "Giảng viên",
        maxHoursPerWeek: 20,
        specializations: [],
        teachingNotes: "",
        status: "active" 
      })
      setIsAddOpen(false)
    }
  }

  const handleEditInstructor = (instructor: Instructor) => {
    setSelectedInstructor(instructor)
    setNewInstructor(instructor)
    setIsEditOpen(true)
  }

  const handleUpdateInstructor = () => {
    if (selectedInstructor && newInstructor.name && newInstructor.email) {
      setInstructors(
        instructors.map((i) =>
          i.id === selectedInstructor.id
            ? { ...newInstructor, id: selectedInstructor.id }
            : i
        )
      )
      setIsEditOpen(false)
      setSelectedInstructor(null)
      setNewInstructor({ 
        code: "",
        name: "", 
        email: "", 
        phone: "", 
        department: "", 
        position: "Giảng viên",
        maxHoursPerWeek: 20,
        specializations: [],
        teachingNotes: "",
        status: "active" 
      })
    }
  }

  const handleDeleteInstructor = () => {
    if (selectedInstructor) {
      setInstructors(instructors.filter((i) => i.id !== selectedInstructor.id))
      setDeleteConfirmOpen(false)
      setSelectedInstructor(null)
    }
  }

  const openDeleteConfirm = (instructor: Instructor) => {
    setSelectedInstructor(instructor)
    setDeleteConfirmOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Quản lý Giảng viên</h2>
          <p className="text-muted-foreground">
            Thêm, sửa, xóa thông tin giảng viên trong hệ thống
          </p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Thêm giảng viên
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Thêm giảng viên mới</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="code">Mã giảng viên</Label>
                  <Input
                    id="code"
                    placeholder="VD: GV001"
                    value={newInstructor.code}
                    onChange={(e) => setNewInstructor({ ...newInstructor, code: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">Họ và tên</Label>
                  <Input
                    id="name"
                    placeholder="VD: PGS.TS. Nguyễn Văn A"
                    value={newInstructor.name}
                    onChange={(e) => setNewInstructor({ ...newInstructor, name: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@uni.edu.vn"
                    value={newInstructor.email}
                    onChange={(e) => setNewInstructor({ ...newInstructor, email: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input
                    id="phone"
                    placeholder="0901234567"
                    value={newInstructor.phone}
                    onChange={(e) => setNewInstructor({ ...newInstructor, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="department">Khoa/Bộ môn</Label>
                  <Select
                    value={newInstructor.department}
                    onValueChange={(value) => setNewInstructor({ ...newInstructor, department: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn khoa/bộ môn" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Công nghệ thông tin">Công nghệ thông tin</SelectItem>
                      <SelectItem value="Khoa học máy tính">Khoa học máy tính</SelectItem>
                      <SelectItem value="Công nghệ phần mềm">Công nghệ phần mềm</SelectItem>
                      <SelectItem value="Hệ thống thông tin">Hệ thống thông tin</SelectItem>
                      <SelectItem value="Mạng và truyền thông">Mạng và truyền thông</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="position">Chức vụ</Label>
                  <Select
                    value={newInstructor.position}
                    onValueChange={(value) => setNewInstructor({ ...newInstructor, position: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn chức vụ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Giảng viên">Giảng viên</SelectItem>
                      <SelectItem value="Thạc sĩ">Thạc sĩ</SelectItem>
                      <SelectItem value="Tiến sĩ">Tiến sĩ</SelectItem>
                      <SelectItem value="Phó Giáo sư">Phó Giáo sư</SelectItem>
                      <SelectItem value="Giáo sư">Giáo sư</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="maxHours">Giờ dạy tối đa/tuần (0-40)</Label>
                <Input
                  id="maxHours"
                  type="number"
                  min="0"
                  max="40"
                  value={newInstructor.maxHoursPerWeek}
                  onChange={(e) => setNewInstructor({ ...newInstructor, maxHoursPerWeek: parseInt(e.target.value) })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Ghi chú dạy theo nguyện vọng</Label>
                <Textarea
                  id="notes"
                  placeholder="Nhập ghi chú về nguyện vọng dạy (ví dụ: không dạy buổi chiều, ưu tiên lớp nào...)"
                  value={newInstructor.teachingNotes}
                  onChange={(e) => setNewInstructor({ ...newInstructor, teachingNotes: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Trạng thái</Label>
                <Select
                  value={newInstructor.status}
                  onValueChange={(value: any) => setNewInstructor({ ...newInstructor, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Đang giảng dạy</SelectItem>
                    <SelectItem value="inactive">Tạm dừng</SelectItem>
                    <SelectItem value="on_leave">Tạm nghỉ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Hủy</Button>
              </DialogClose>
              <Button onClick={handleAddInstructor}>Thêm giảng viên</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm giảng viên..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Lọc theo khoa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả khoa</SelectItem>
                <SelectItem value="Công nghệ thông tin">Công nghệ thông tin</SelectItem>
                <SelectItem value="Khoa học máy tính">Khoa học máy tính</SelectItem>
                <SelectItem value="Công nghệ phần mềm">Công nghệ phần mềm</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã GV</TableHead>
                <TableHead>Họ và tên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Chức vụ</TableHead>
                <TableHead>Khoa/Bộ môn</TableHead>
                <TableHead>Giờ/tuần</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInstructors.map((instructor) => (
                <TableRow key={instructor.id}>
                  <TableCell className="font-medium">{instructor.code}</TableCell>
                  <TableCell className="font-medium">{instructor.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      {instructor.email}
                    </div>
                  </TableCell>
                  <TableCell>{instructor.position}</TableCell>
                  <TableCell>{instructor.department}</TableCell>
                  <TableCell>{instructor.maxHoursPerWeek}</TableCell>
                  <TableCell>
                    <Badge variant={instructor.status === "active" ? "default" : instructor.status === "on_leave" ? "secondary" : "outline"}>
                      {instructor.status === "active" ? "Đang giảng dạy" : instructor.status === "on_leave" ? "Tạm nghỉ" : "Tạm dừng"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleEditInstructor(instructor as any)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => openDeleteConfirm(instructor as any)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog sửa giảng viên */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Sửa thông tin giảng viên</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-code">Mã giảng viên</Label>
                <Input
                  id="edit-code"
                  disabled
                  value={newInstructor.code}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Họ và tên</Label>
                <Input
                  id="edit-name"
                  value={newInstructor.name}
                  onChange={(e) => setNewInstructor({ ...newInstructor, name: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={newInstructor.email}
                  onChange={(e) => setNewInstructor({ ...newInstructor, email: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-phone">Số điện thoại</Label>
                <Input
                  id="edit-phone"
                  value={newInstructor.phone}
                  onChange={(e) => setNewInstructor({ ...newInstructor, phone: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-department">Khoa/Bộ môn</Label>
                <Select
                  value={newInstructor.department}
                  onValueChange={(value) => setNewInstructor({ ...newInstructor, department: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn khoa/bộ môn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Công nghệ thông tin">Công nghệ thông tin</SelectItem>
                    <SelectItem value="Khoa học máy tính">Khoa học máy tính</SelectItem>
                    <SelectItem value="Công nghệ phần mềm">Công nghệ phần mềm</SelectItem>
                    <SelectItem value="Hệ thống thông tin">Hệ thống thông tin</SelectItem>
                    <SelectItem value="Mạng và truyền thông">Mạng và truyền thông</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-position">Chức vụ</Label>
                <Select
                  value={newInstructor.position}
                  onValueChange={(value) => setNewInstructor({ ...newInstructor, position: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn chức vụ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Giảng viên">Giảng viên</SelectItem>
                    <SelectItem value="Thạc sĩ">Thạc sĩ</SelectItem>
                    <SelectItem value="Tiến sĩ">Tiến sĩ</SelectItem>
                    <SelectItem value="Phó Giáo sư">Phó Giáo sư</SelectItem>
                    <SelectItem value="Giáo sư">Giáo sư</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-maxHours">Giờ dạy tối đa/tuần (0-40)</Label>
              <Input
                id="edit-maxHours"
                type="number"
                min="0"
                max="40"
                value={newInstructor.maxHoursPerWeek}
                onChange={(e) => setNewInstructor({ ...newInstructor, maxHoursPerWeek: parseInt(e.target.value) })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-notes">Ghi chú dạy theo nguyện vọng</Label>
              <Textarea
                id="edit-notes"
                placeholder="Nhập ghi chú về nguyện vọng dạy (ví dụ: không dạy buổi chiều, ưu tiên lớp nào...)"
                value={newInstructor.teachingNotes}
                onChange={(e) => setNewInstructor({ ...newInstructor, teachingNotes: e.target.value })}
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-status">Trạng thái</Label>
              <Select
                value={newInstructor.status}
                onValueChange={(value: any) => setNewInstructor({ ...newInstructor, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Đang giảng dạy</SelectItem>
                  <SelectItem value="inactive">Tạm dừng</SelectItem>
                  <SelectItem value="on_leave">Tạm nghỉ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Hủy</Button>
            </DialogClose>
            <Button onClick={handleUpdateInstructor}>Cập nhật</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Alert Dialog xác nhận xóa */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa giảng viên</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa giảng viên <strong>{selectedInstructor?.name}</strong>? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialog>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDeleteInstructor}
            >
              Xóa
            </AlertDialogAction>
          </AlertDialog>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

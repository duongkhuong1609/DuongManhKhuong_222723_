"use client"

import { useState } from "react"
import { Download, FileSpreadsheet, FileText, Printer, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const exportOptions = [
  {
    id: "schedule",
    title: "Thời khóa biểu",
    description: "Xuất lịch dạy theo tuần/tháng/học kỳ",
    icon: FileSpreadsheet,
    formats: ["Excel", "PDF"],
  },
  {
    id: "instructors",
    title: "Danh sách giảng viên",
    description: "Xuất danh sách và giờ dạy của giảng viên",
    icon: FileText,
    formats: ["Excel", "PDF"],
  },
  {
    id: "rooms",
    title: "Thống kê phòng học",
    description: "Xuất báo cáo sử dụng phòng học",
    icon: FileText,
    formats: ["Excel", "PDF"],
  },
  {
    id: "statistics",
    title: "Báo cáo thống kê",
    description: "Xuất báo cáo tổng hợp giờ dạy",
    icon: FileText,
    formats: ["Excel", "PDF"],
  },
]

export function ExportModule() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [format, setFormat] = useState("excel")
  const [semester, setSemester] = useState("hk1")
  const [includeCharts, setIncludeCharts] = useState(true)
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [exportComplete, setExportComplete] = useState(false)

  const handleExport = async () => {
    if (!selectedOption) return
    
    setIsExporting(true)
    setExportProgress(0)
    setExportComplete(false)

    // Simulate export progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200))
      setExportProgress(i)
    }

    setIsExporting(false)
    setExportComplete(true)

    // Reset after 3 seconds
    setTimeout(() => {
      setExportComplete(false)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Xuất lịch dạy</h2>
          <p className="text-muted-foreground">
            Xuất báo cáo và lịch dạy sang định dạng Excel hoặc PDF
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Chọn loại báo cáo</CardTitle>
              <CardDescription>Chọn loại dữ liệu bạn muốn xuất</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {exportOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50 ${
                      selectedOption === option.id ? "border-primary bg-primary/5" : "border-border/50"
                    }`}
                    onClick={() => setSelectedOption(option.id)}
                  >
                    <div className={`rounded-lg p-2 ${selectedOption === option.id ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                      <option.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-foreground">{option.title}</p>
                        {selectedOption === option.id && (
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">{option.description}</p>
                      <div className="flex gap-1 mt-2">
                        {option.formats.map((fmt) => (
                          <Badge key={fmt} variant="secondary" className="text-xs">
                            {fmt}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {isExporting && (
            <Card className="border-border/50">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Đang xuất báo cáo...</span>
                    <span className="font-medium">{exportProgress}%</span>
                  </div>
                  <Progress value={exportProgress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          )}

          {exportComplete && (
            <Card className="border-success/50 bg-success/5">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <div>
                    <p className="font-medium text-success">Xuất báo cáo thành công!</p>
                    <p className="text-sm text-muted-foreground">File đã được tải xuống máy của bạn</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base">Tùy chọn xuất</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>Định dạng file</Label>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excel">
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet className="h-4 w-4" />
                        Excel (.xlsx)
                      </div>
                    </SelectItem>
                    <SelectItem value="pdf">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        PDF (.pdf)
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Học kỳ</Label>
                <Select value={semester} onValueChange={setSemester}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hk1">Học kỳ 1 - 2024</SelectItem>
                    <SelectItem value="hk2">Học kỳ 2 - 2024</SelectItem>
                    <SelectItem value="year">Cả năm 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="charts" 
                  checked={includeCharts}
                  onCheckedChange={(checked) => setIncludeCharts(checked === true)}
                />
                <Label htmlFor="charts" className="text-sm font-normal">
                  Bao gồm biểu đồ thống kê
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="pt-6 space-y-3">
              <Button 
                className="w-full" 
                disabled={!selectedOption || isExporting}
                onClick={handleExport}
              >
                <Download className="mr-2 h-4 w-4" />
                {isExporting ? "Đang xuất..." : "Xuất báo cáo"}
              </Button>
              <Button variant="outline" className="w-full bg-transparent" disabled={!selectedOption || isExporting}>
                <Printer className="mr-2 h-4 w-4" />
                In trực tiếp
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

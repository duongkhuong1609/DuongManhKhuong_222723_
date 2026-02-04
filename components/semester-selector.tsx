"use client"

import { CalendarDays, Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useSemester } from "@/contexts/semester-context"
import { cn } from "@/lib/utils"

export function SemesterSelector() {
  const { semesters, selectedSemester, setSelectedSemester, isLoading } = useSemester()

  if (isLoading) {
    return (
      <Button variant="outline" disabled className="min-w-[200px] bg-transparent">
        <CalendarDays className="mr-2 h-4 w-4" />
        Đang tải...
      </Button>
    )
  }

  // Group semesters by academic year
  const groupedSemesters = semesters.reduce(
    (acc, semester) => {
      if (!acc[semester.academicYear]) {
        acc[semester.academicYear] = []
      }
      acc[semester.academicYear].push(semester)
      return acc
    },
    {} as Record<string, typeof semesters>
  )

  const academicYears = Object.keys(groupedSemesters).sort().reverse()

  const getStatusBadge = (status: string, isCurrent: boolean) => {
    if (isCurrent) {
      return (
        <Badge variant="default" className="ml-2 text-xs">
          Hiện tại
        </Badge>
      )
    }
    switch (status) {
      case "ongoing":
        return (
          <Badge variant="secondary" className="ml-2 text-xs bg-green-100 text-green-700">
            Đang diễn ra
          </Badge>
        )
      case "upcoming":
        return (
          <Badge variant="secondary" className="ml-2 text-xs bg-blue-100 text-blue-700">
            Sắp tới
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="secondary" className="ml-2 text-xs bg-muted text-muted-foreground">
            Đã kết thúc
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="min-w-[220px] justify-between bg-transparent">
          <div className="flex items-center">
            <CalendarDays className="mr-2 h-4 w-4" />
            {selectedSemester ? selectedSemester.shortName : "Chọn học kỳ"}
          </div>
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[280px]">
        <DropdownMenuLabel>Chọn học kỳ</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {academicYears.map((year) => (
          <div key={year}>
            <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
              Năm học {year}
            </DropdownMenuLabel>
            {groupedSemesters[year].map((semester) => (
              <DropdownMenuItem
                key={semester._id}
                onClick={() => setSelectedSemester(semester)}
                className={cn(
                  "cursor-pointer",
                  selectedSemester?._id === semester._id && "bg-accent"
                )}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    {selectedSemester?._id === semester._id && (
                      <Check className="mr-2 h-4 w-4" />
                    )}
                    <span className={selectedSemester?._id !== semester._id ? "ml-6" : ""}>
                      Học kỳ {semester.semesterNumber}
                    </span>
                  </div>
                  {getStatusBadge(semester.status, semester.isCurrent)}
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

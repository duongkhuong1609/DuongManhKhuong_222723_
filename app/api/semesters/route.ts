import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const academicYear = searchParams.get("academicYear")
    const status = searchParams.get("status")
    const current = searchParams.get("current")

    const where: Record<string, unknown> = { isActive: true }
    if (academicYear) where.academicYear = academicYear
    if (status) where.status = status
    if (current === "true") where.isCurrent = true

    const semesters = await prisma.semester.findMany({
      where,
      orderBy: [{ academicYear: "desc" }, { semesterNumber: "asc" }]
    })
    return NextResponse.json({ success: true, data: semesters })
  } catch (error) {
    console.error("Error fetching semesters:", error)
    return NextResponse.json({ success: false, error: "Lỗi khi tải danh sách học kỳ" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const semester = await prisma.semester.create({ data: body })
    return NextResponse.json({ success: true, data: semester }, { status: 201 })
  } catch (error) {
    console.error("Error creating semester:", error)
    return NextResponse.json({ success: false, error: "Lỗi khi tạo học kỳ" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body

    const semester = await prisma.semester.update({
      where: { id: parseInt(id) },
      data: updateData,
    })
    return NextResponse.json({ success: true, data: semester })
  } catch (error) {
    console.error("Error updating semester:", error)
    if ((error as any).code === 'P2025') {
      return NextResponse.json({ success: false, error: "Học kỳ không tồn tại" }, { status: 404 })
    }
    return NextResponse.json({ success: false, error: "Lỗi khi cập nhật học kỳ" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ success: false, error: "Mã học kỳ bắt buộc" }, { status: 400 })
    }

    const semester = await prisma.semester.update({
      where: { id: parseInt(id) },
      data: { isActive: false },
    })
    return NextResponse.json({ success: true, message: "Xóa học kỳ thành công", data: semester })
  } catch (error) {
    console.error("Error deleting semester:", error)
    if ((error as any).code === 'P2025') {
      return NextResponse.json({ success: false, error: "Học kỳ không tồn tại" }, { status: 404 })
    }
    return NextResponse.json({ success: false, error: "Lỗi khi xóa học kỳ" }, { status: 500 })
  }
}

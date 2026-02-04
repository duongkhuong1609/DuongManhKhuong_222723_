import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const department = searchParams.get("department")
    const status = searchParams.get("status")
    const search = searchParams.get("search")

    const where: Record<string, unknown> = {}

    if (department) where.department = department
    if (status) where.status = status
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { code: { contains: search, mode: "insensitive" } },
      ]
    }

    const courses = await prisma.course.findMany({
      where,
      orderBy: { code: "asc" }
    })

    return NextResponse.json({ success: true, data: courses })
  } catch (error) {
    console.error("Error fetching courses:", error)
    return NextResponse.json({ success: false, error: "Lỗi khi tải danh sách môn học" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const course = await prisma.course.create({ data: body })

    return NextResponse.json({ success: true, data: course }, { status: 201 })
  } catch (error: unknown) {
    console.error("Error creating course:", error)
    if ((error as any).code === 'P2002') {
      return NextResponse.json({ success: false, error: "Mã môn học đã tồn tại" }, { status: 400 })
    }
    return NextResponse.json({ success: false, error: "Lỗi khi tạo môn học" }, { status: 500 })
  }
}

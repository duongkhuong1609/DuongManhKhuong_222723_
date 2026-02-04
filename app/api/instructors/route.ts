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
        { email: { contains: search, mode: "insensitive" } },
      ]
    }

    const instructors = await prisma.instructor.findMany({
      where,
      orderBy: { name: "asc" }
    })

    return NextResponse.json({ success: true, data: instructors })
  } catch (error) {
    console.error("Error fetching instructors:", error)
    return NextResponse.json({ success: false, error: "Lỗi khi tải danh sách giảng viên" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const instructor = await prisma.instructor.create({ data: body })

    return NextResponse.json({ success: true, data: instructor }, { status: 201 })
  } catch (error: unknown) {
    console.error("Error creating instructor:", error)
    if ((error as any).code === 'P2002') {
      return NextResponse.json({ success: false, error: "Mã giảng viên hoặc email đã tồn tại" }, { status: 400 })
    }
    return NextResponse.json({ success: false, error: "Lỗi khi tạo giảng viên" }, { status: 500 })
  }
}

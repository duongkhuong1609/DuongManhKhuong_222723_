import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const semester = searchParams.get("semester")
    const academicYear = searchParams.get("academicYear")
    const instructor = searchParams.get("instructor")
    const status = searchParams.get("status")

    const where: Record<string, unknown> = {}

    if (semester) where.semester = semester
    if (academicYear) where.academicYear = academicYear
    if (instructor) where.instructorId = parseInt(instructor)
    if (status) where.status = status

    const classes = await prisma.class.findMany({
      where,
      include: {
        course: { select: { code: true, name: true, credits: true } },
        instructor: { select: { code: true, name: true, department: true } },
      },
      orderBy: { code: "asc" }
    })

    return NextResponse.json({ success: true, data: classes })
  } catch (error) {
    console.error("Error fetching classes:", error)
    return NextResponse.json({ success: false, error: "Lỗi khi tải danh sách lớp học" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newClass = await prisma.class.create({ data: body })

    return NextResponse.json({ success: true, data: newClass }, { status: 201 })
  } catch (error: unknown) {
    console.error("Error creating class:", error)
    if ((error as any).code === 'P2002') {
      return NextResponse.json({ success: false, error: "Mã lớp đã tồn tại" }, { status: 400 })
    }
    return NextResponse.json({ success: false, error: "Lỗi khi tạo lớp học" }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const period = searchParams.get("period")
    const status = searchParams.get("status")

    const where: Record<string, unknown> = {}

    if (period) where.period = period
    if (status) where.status = status

    const timeslots = await prisma.timeslot.findMany({
      where,
      orderBy: { order: "asc" }
    })

    return NextResponse.json({ success: true, data: timeslots })
  } catch (error) {
    console.error("Error fetching timeslots:", error)
    return NextResponse.json({ success: false, error: "Lỗi khi tải danh sách giờ học" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const timeslot = await prisma.timeslot.create({ data: body })

    return NextResponse.json({ success: true, data: timeslot }, { status: 201 })
  } catch (error: unknown) {
    console.error("Error creating timeslot:", error)
    if ((error as any).code === 'P2002') {
      return NextResponse.json({ success: false, error: "Mã tiết học đã tồn tại" }, { status: 400 })
    }
    return NextResponse.json({ success: false, error: "Lỗi khi tạo giờ học" }, { status: 500 })
  }
}

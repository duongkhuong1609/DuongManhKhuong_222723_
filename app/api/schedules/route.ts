import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const semester = searchParams.get("semester")
    const academicYear = searchParams.get("academicYear")
    const instructor = searchParams.get("instructor")
    const room = searchParams.get("room")
    const dayOfWeek = searchParams.get("dayOfWeek")

    const where: Record<string, unknown> = { status: "active" }

    if (semester) where.semester = semester
    if (academicYear) where.academicYear = academicYear
    if (dayOfWeek) where.dayOfWeek = parseInt(dayOfWeek)
    if (room) where.roomId = parseInt(room)
    if (instructor) where.instructorId = parseInt(instructor)

    const schedules = await prisma.schedule.findMany({
      where,
      include: {
        class: {
          include: {
            course: { select: { code: true, name: true, credits: true } },
            instructor: { select: { code: true, name: true, department: true } },
          },
        },
        room: { select: { code: true, name: true, building: true, capacity: true } },
        timeslot: { select: { code: true, name: true, startTime: true, endTime: true, period: true, order: true } },
      },
      orderBy: [{ dayOfWeek: "asc" }]
    })

    return NextResponse.json({ success: true, data: schedules })
  } catch (error) {
    console.error("Error fetching schedules:", error)
    return NextResponse.json({ success: false, error: "Lỗi khi tải thời khóa biểu" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const existingSchedule = await prisma.schedule.findFirst({
      where: {
        roomId: body.roomId,
        dayOfWeek: body.dayOfWeek,
        timeslotId: body.timeslotId,
        semester: body.semester,
        status: "active",
      },
    })

    if (existingSchedule) {
      return NextResponse.json(
        { success: false, error: "Phòng học đã được sử dụng trong khung giờ này" },
        { status: 400 }
      )
    }

    const schedule = await prisma.schedule.create({ data: body })

    return NextResponse.json({ success: true, data: schedule }, { status: 201 })
  } catch (error) {
    console.error("Error creating schedule:", error)
    return NextResponse.json({ success: false, error: "Lỗi khi tạo lịch học" }, { status: 500 })
  }
}

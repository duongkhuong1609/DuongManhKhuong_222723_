import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const [
      totalInstructors,
      totalRooms,
      totalCourses,
      totalClasses,
      totalTimeslots,
      activeSchedules,
    ] = await Promise.all([
      prisma.instructor.count({ where: { status: "active" } }),
      prisma.room.count({ where: { status: "available" } }),
      prisma.course.count({ where: { status: "active" } }),
      prisma.class.count({ where: { status: { in: ["scheduled", "ongoing"] } } }),
      prisma.timeslot.count({ where: { status: "active" } }),
      prisma.schedule.count({ where: { status: "active" } }),
    ])

    // Calculate total teaching hours from schedules
    const scheduleData = await prisma.schedule.findMany({
      where: { status: "active" },
      include: {
        timeslot: { select: { startTime: true, endTime: true } },
      }
    })

    let totalHours = 0
    scheduleData.forEach((schedule) => {
      const timeslot = schedule.timeslot
      if (timeslot?.startTime && timeslot?.endTime) {
        const [startH, startM] = timeslot.startTime.split(":").map(Number)
        const [endH, endM] = timeslot.endTime.split(":").map(Number)
        const hours = (endH * 60 + endM - (startH * 60 + startM)) / 60
        totalHours += hours
      }
    })

    // Teaching hours by instructor
    const instructorStats = await prisma.schedule.groupBy({
      by: ["instructorId"],
      where: { status: "active" },
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: "desc",
        },
      },
      take: 10,
    })

    const instructorHours = await Promise.all(
      instructorStats.map(async (stat) => {
        const instructor = await prisma.instructor.findUnique({
          where: { id: stat.instructorId || 0 },
          select: { id: true, name: true, department: true },
        })
        return {
          _id: instructor?.id,
          name: instructor?.name,
          department: instructor?.department,
          scheduleCount: stat._count.id,
        }
      })
    )

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalInstructors,
          totalRooms,
          totalCourses,
          totalClasses,
          totalTimeslots,
          activeSchedules,
          totalTeachingHours: Math.round(totalHours * 10) / 10,
        },
        instructorHours,
      },
    })
  } catch (error) {
    console.error("Error fetching statistics:", error)
    return NextResponse.json({ success: false, error: "Lỗi khi tải thống kê" }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const building = searchParams.get("building")
    const type = searchParams.get("type")
    const status = searchParams.get("status")
    const minCapacity = searchParams.get("minCapacity")

    const where: Record<string, unknown> = {}

    if (building) where.building = building
    if (type) where.type = type
    if (status) where.status = status
    if (minCapacity) where.capacity = { gte: parseInt(minCapacity) }

    const rooms = await prisma.room.findMany({
      where,
      orderBy: [{ building: "asc" }, { code: "asc" }]
    })

    return NextResponse.json({ success: true, data: rooms })
  } catch (error) {
    console.error("Error fetching rooms:", error)
    return NextResponse.json({ success: false, error: "Lỗi khi tải danh sách phòng học" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const room = await prisma.room.create({ data: body })

    return NextResponse.json({ success: true, data: room }, { status: 201 })
  } catch (error: unknown) {
    console.error("Error creating room:", error)
    if ((error as any).code === 'P2002') {
      return NextResponse.json({ success: false, error: "Mã phòng đã tồn tại" }, { status: 400 })
    }
    return NextResponse.json({ success: false, error: "Lỗi khi tạo phòng học" }, { status: 500 })
  }
}

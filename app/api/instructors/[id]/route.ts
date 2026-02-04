import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET - Lấy thông tin một giảng viên
export async function GET(request: NextRequest, context: any) {
  const { params } = context
  try {
    const instructorId = parseInt(params.id)
    
    const instructor = await prisma.instructor.findUnique({
      where: { id: instructorId }
    })

    if (!instructor) {
      return NextResponse.json(
        { success: false, error: "Giảng viên không tồn tại" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: instructor })
  } catch (error) {
    console.error("Error fetching instructor:", error)
    return NextResponse.json(
      { success: false, error: "Lỗi khi tải thông tin giảng viên" },
      { status: 500 }
    )
  }
}

// PUT - Cập nhật thông tin giảng viên
export async function PUT(request: NextRequest, context: any) {
  const { params } = context
  try {
    const instructorId = parseInt(params.id)
    const body = await request.json()

    // Loại bỏ các trường không được sửa
    delete body.id
    delete body.createdAt

    const instructor = await prisma.instructor.update({
      where: { id: instructorId },
      data: body
    })

    return NextResponse.json({ success: true, data: instructor })
  } catch (error: unknown) {
    console.error("Error updating instructor:", error)
    if ((error as any).code === 'P2025') {
      return NextResponse.json(
        { success: false, error: "Giảng viên không tồn tại" },
        { status: 404 }
      )
    }
    if ((error as any).code === 'P2002') {
      return NextResponse.json(
        { success: false, error: "Email hoặc mã giảng viên đã tồn tại" },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { success: false, error: "Lỗi khi cập nhật thông tin giảng viên" },
      { status: 500 }
    )
  }
}

// DELETE - Xóa giảng viên
export async function DELETE(request: NextRequest, context: any) {
  const { params } = context
  try {
    const instructorId = parseInt(params.id)

    const instructor = await prisma.instructor.delete({
      where: { id: instructorId }
    })

    return NextResponse.json({
      success: true,
      message: "Xóa giảng viên thành công",
      data: instructor,
    })
  } catch (error) {
    console.error("Error deleting instructor:", error)
    if ((error as any).code === 'P2025') {
      return NextResponse.json(
        { success: false, error: "Giảng viên không tồn tại" },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { success: false, error: "Lỗi khi xóa giảng viên" },
      { status: 500 }
    )
  }
}

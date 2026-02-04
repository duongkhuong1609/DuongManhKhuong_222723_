// prisma/seed.ts
// Seed database with sample data for SQL Server

import { prisma } from '../lib/prisma'

async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing data
  await prisma.schedule.deleteMany()
  await prisma.class.deleteMany()
  await prisma.course.deleteMany()
  await prisma.instructor.deleteMany()
  await prisma.timeslot.deleteMany()
  await prisma.room.deleteMany()
  await prisma.semester.deleteMany()

  // ============================================
  // SEMESTERS
  // ============================================
  console.log('📚 Creating semesters...')
  const semester1 = await prisma.semester.create({
    data: {
      code: 'HK1_2024-2025',
      name: 'Học kỳ 1 - Năm học 2024-2025',
      shortName: 'HK1 2024-2025',
      semesterNumber: 1,
      academicYear: '2024-2025',
      startDate: new Date('2024-09-02'),
      endDate: new Date('2025-01-15'),
      isActive: true,
      isCurrent: false,
      status: 'completed',
    },
  })

  const semester2 = await prisma.semester.create({
    data: {
      code: 'HK2_2024-2025',
      name: 'Học kỳ 2 - Năm học 2024-2025',
      shortName: 'HK2 2024-2025',
      semesterNumber: 2,
      academicYear: '2024-2025',
      startDate: new Date('2025-02-10'),
      endDate: new Date('2025-06-15'),
      isActive: true,
      isCurrent: true,
      status: 'ongoing',
    },
  })

  const semester3 = await prisma.semester.create({
    data: {
      code: 'HK3_2024-2025',
      name: 'Học kỳ hè - Năm học 2024-2025',
      shortName: 'HK Hè 2024-2025',
      semesterNumber: 3,
      academicYear: '2024-2025',
      startDate: new Date('2025-07-01'),
      endDate: new Date('2025-08-15'),
      isActive: true,
      isCurrent: false,
      status: 'upcoming',
    },
  })

  // ============================================
  // INSTRUCTORS
  // ============================================
  console.log('👨‍🏫 Creating instructors...')
  const instructor1 = await prisma.instructor.create({
    data: {
      code: 'GV001',
      name: 'PGS.TS. Nguyễn Văn An',
      email: 'an.nguyen@uni.edu.vn',
      phone: '0901234567',
      department: 'Công nghệ thông tin',
      position: 'Phó Giáo sư',
      maxHoursPerWeek: 20,
      specializations: JSON.stringify(['Lập trình', 'Cấu trúc dữ liệu']),
      teachingNotes: 'Ưu tiên các lớp sáng, không dạy buổi chiều',
      status: 'active',
    },
  })

  const instructor2 = await prisma.instructor.create({
    data: {
      code: 'GV002',
      name: 'TS. Trần Thị Bình',
      email: 'binh.tran@uni.edu.vn',
      phone: '0912345678',
      department: 'Khoa học máy tính',
      position: 'Tiến sĩ',
      maxHoursPerWeek: 18,
      specializations: JSON.stringify(['Trí tuệ nhân tạo', 'Machine Learning']),
      teachingNotes: 'Có thể dạy online',
      status: 'active',
    },
  })

  const instructor3 = await prisma.instructor.create({
    data: {
      code: 'GV003',
      name: 'ThS. Lê Văn Cường',
      email: 'cuong.le@uni.edu.vn',
      phone: '0923456789',
      department: 'Công nghệ phần mềm',
      position: 'Giảng viên',
      maxHoursPerWeek: 24,
      specializations: JSON.stringify(['Phát triển web', 'Mobile']),
      teachingNotes: '',
      status: 'active',
    },
  })

  const instructor4 = await prisma.instructor.create({
    data: {
      code: 'GV004',
      name: 'PGS.TS. Phạm Thị Dung',
      email: 'dung.pham@uni.edu.vn',
      phone: '0934567890',
      department: 'Hệ thống thông tin',
      position: 'Phó Giáo sư',
      maxHoursPerWeek: 16,
      specializations: JSON.stringify(['Cơ sở dữ liệu', 'Hệ thống']),
      teachingNotes: 'Tạm nghỉ kỳ này',
      status: 'inactive',
    },
  })

  const instructor5 = await prisma.instructor.create({
    data: {
      code: 'GV005',
      name: 'TS. Hoàng Văn Em',
      email: 'em.hoang@uni.edu.vn',
      phone: '0945678901',
      department: 'Mạng và truyền thông',
      position: 'Tiến sĩ',
      maxHoursPerWeek: 22,
      specializations: JSON.stringify(['Mạng máy tính', 'Bảo mật']),
      teachingNotes: '',
      status: 'active',
    },
  })

  // ============================================
  // ROOMS
  // ============================================
  console.log('🏫 Creating rooms...')
  const rooms = [
    {
      code: 'P101',
      name: 'Phòng 101',
      building: 'Tòa A',
      floor: 1,
      capacity: 50,
      type: 'lecture',
      equipment: JSON.stringify(['Máy chiếu', 'Điều hòa']),
    },
    {
      code: 'P102',
      name: 'Phòng 102',
      building: 'Tòa A',
      floor: 1,
      capacity: 40,
      type: 'lecture',
      equipment: JSON.stringify(['Máy chiếu', 'Smart TV']),
    },
    {
      code: 'P201',
      name: 'Phòng 201',
      building: 'Tòa A',
      floor: 2,
      capacity: 60,
      type: 'lecture',
      equipment: JSON.stringify(['Máy chiếu', 'Điều hòa', 'WiFi']),
    },
    {
      code: 'L101',
      name: 'Lab 101',
      building: 'Tòa B',
      floor: 1,
      capacity: 30,
      type: 'lab',
      equipment: JSON.stringify(['PC 30 cây', 'WiFi', 'Điều hòa']),
    },
    {
      code: 'L102',
      name: 'Lab 102',
      building: 'Tòa B',
      floor: 1,
      capacity: 30,
      type: 'lab',
      equipment: JSON.stringify(['PC 30 cây', 'Server']),
    },
    {
      code: 'A101',
      name: 'Hội trường A',
      building: 'Tòa C',
      floor: 1,
      capacity: 200,
      type: 'auditorium',
      equipment: JSON.stringify(['Máy chiếu 4K', 'Âm thanh', 'Sân khấu']),
    },
  ]

  for (const room of rooms) {
    await prisma.room.create({ data: room })
  }

  // ============================================
  // COURSES
  // ============================================
  console.log('📖 Creating courses...')
  const courses = [
    {
      code: 'CS101',
      name: 'Lập trình C++',
      credits: 3,
      theoryHours: 30,
      practiceHours: 30,
      department: 'Công nghệ thông tin',
      description: 'Môn học cơ bản về lập trình C++',
      status: 'active',
    },
    {
      code: 'CS102',
      name: 'Cấu trúc dữ liệu',
      credits: 3,
      theoryHours: 30,
      practiceHours: 30,
      department: 'Công nghệ thông tin',
      description: 'Các cấu trúc dữ liệu cơ bản',
      status: 'active',
    },
    {
      code: 'CS201',
      name: 'Lập trình Java',
      credits: 3,
      theoryHours: 30,
      practiceHours: 30,
      department: 'Công nghệ thông tin',
      description: 'Lập trình hướng đối tượng với Java',
      status: 'active',
    },
    {
      code: 'AI101',
      name: 'Trí tuệ nhân tạo',
      credits: 3,
      theoryHours: 30,
      practiceHours: 30,
      department: 'Khoa học máy tính',
      description: 'Giới thiệu về AI và Machine Learning',
      status: 'active',
    },
    {
      code: 'WEB101',
      name: 'Phát triển Web',
      credits: 3,
      theoryHours: 20,
      practiceHours: 40,
      department: 'Công nghệ phần mềm',
      description: 'Frontend + Backend web development',
      status: 'active',
    },
    {
      code: 'DB101',
      name: 'Cơ sở dữ liệu',
      credits: 3,
      theoryHours: 30,
      practiceHours: 30,
      department: 'Hệ thống thông tin',
      description: 'Thiết kế và quản lý CSDL',
      status: 'active',
    },
  ]

  const courseMap = new Map()
  for (const course of courses) {
    const created = await prisma.course.create({ data: course })
    courseMap.set(course.code, created.id)
  }

  // ============================================
  // TIMESLOTS
  // ============================================
  console.log('⏰ Creating timeslots...')
  const timeslots = [
    {
      code: 'T1',
      name: 'Tiết 1',
      startTime: '07:00',
      endTime: '07:50',
      period: 'morning',
      order: 1,
      status: 'active',
    },
    {
      code: 'T2',
      name: 'Tiết 2',
      startTime: '08:00',
      endTime: '08:50',
      period: 'morning',
      order: 2,
      status: 'active',
    },
    {
      code: 'T3',
      name: 'Tiết 3',
      startTime: '09:00',
      endTime: '09:50',
      period: 'morning',
      order: 3,
      status: 'active',
    },
    {
      code: 'T4',
      name: 'Tiết 4',
      startTime: '10:00',
      endTime: '10:50',
      period: 'morning',
      order: 4,
      status: 'active',
    },
    {
      code: 'T5',
      name: 'Tiết 5',
      startTime: '13:00',
      endTime: '13:50',
      period: 'afternoon',
      order: 5,
      status: 'active',
    },
    {
      code: 'T6',
      name: 'Tiết 6',
      startTime: '14:00',
      endTime: '14:50',
      period: 'afternoon',
      order: 6,
      status: 'active',
    },
    {
      code: 'T7',
      name: 'Tiết 7',
      startTime: '15:00',
      endTime: '15:50',
      period: 'afternoon',
      order: 7,
      status: 'active',
    },
    {
      code: 'T8',
      name: 'Tiết 8',
      startTime: '18:00',
      endTime: '18:50',
      period: 'evening',
      order: 8,
      status: 'active',
    },
  ]

  const timeslotMap = new Map()
  for (const timeslot of timeslots) {
    const created = await prisma.timeslot.create({ data: timeslot })
    timeslotMap.set(timeslot.code, created.id)
  }

  // ============================================
  // CLASSES
  // ============================================
  console.log('👥 Creating classes...')
  const classesData = [
    {
      code: 'CS101-01',
      courseId: courseMap.get('CS101'),
      instructorId: instructor1.id,
      semester: semester2.code,
      academicYear: '2024-2025',
      studentCount: 45,
      maxStudents: 50,
      status: 'ongoing',
      notes: 'Lớp C++ cơ bản',
    },
    {
      code: 'CS101-02',
      courseId: courseMap.get('CS101'),
      instructorId: instructor3.id,
      semester: semester2.code,
      academicYear: '2024-2025',
      studentCount: 48,
      maxStudents: 50,
      status: 'ongoing',
      notes: '',
    },
    {
      code: 'AI101-01',
      courseId: courseMap.get('AI101'),
      instructorId: instructor2.id,
      semester: semester2.code,
      academicYear: '2024-2025',
      studentCount: 35,
      maxStudents: 40,
      status: 'ongoing',
      notes: 'Lớp AI nâng cao',
    },
    {
      code: 'WEB101-01',
      courseId: courseMap.get('WEB101'),
      instructorId: instructor3.id,
      semester: semester2.code,
      academicYear: '2024-2025',
      studentCount: 40,
      maxStudents: 45,
      status: 'ongoing',
      notes: '',
    },
    {
      code: 'DB101-01',
      courseId: courseMap.get('DB101'),
      instructorId: instructor5.id,
      semester: semester2.code,
      academicYear: '2024-2025',
      studentCount: 38,
      maxStudents: 40,
      status: 'ongoing',
      notes: '',
    },
  ]

  const classMap = new Map()
  for (const classData of classesData) {
    const created = await prisma.class.create({ data: classData })
    classMap.set(classData.code, created.id)
  }

  // ============================================
  // SCHEDULES
  // ============================================
  console.log('📅 Creating schedules...')
  const schedulesData = [
    // CS101-01 lịch biểu
    {
      classId: classMap.get('CS101-01'),
      roomId: 1,
      timeslotId: timeslotMap.get('T1'),
      instructorId: instructor1.id,
      dayOfWeek: 2,
      weekStart: new Date('2025-02-10'),
      weekEnd: new Date('2025-02-16'),
      semester: semester2.code,
      academicYear: '2024-2025',
      isRecurring: true,
      status: 'active',
    },
    {
      classId: classMap.get('CS101-01'),
      roomId: 1,
      timeslotId: timeslotMap.get('T3'),
      instructorId: instructor1.id,
      dayOfWeek: 4,
      weekStart: new Date('2025-02-10'),
      weekEnd: new Date('2025-02-16'),
      semester: semester2.code,
      academicYear: '2024-2025',
      isRecurring: true,
      status: 'active',
    },
    // AI101-01 lịch biểu
    {
      classId: classMap.get('AI101-01'),
      roomId: 2,
      timeslotId: timeslotMap.get('T2'),
      instructorId: instructor2.id,
      dayOfWeek: 3,
      weekStart: new Date('2025-02-10'),
      weekEnd: new Date('2025-02-16'),
      semester: semester2.code,
      academicYear: '2024-2025',
      isRecurring: true,
      status: 'active',
    },
    {
      classId: classMap.get('AI101-01'),
      roomId: 4,
      timeslotId: timeslotMap.get('T5'),
      instructorId: instructor2.id,
      dayOfWeek: 5,
      weekStart: new Date('2025-02-10'),
      weekEnd: new Date('2025-02-16'),
      semester: semester2.code,
      academicYear: '2024-2025',
      isRecurring: true,
      status: 'active',
    },
    // WEB101-01 lịch biểu
    {
      classId: classMap.get('WEB101-01'),
      roomId: 4,
      timeslotId: timeslotMap.get('T4'),
      instructorId: instructor3.id,
      dayOfWeek: 2,
      weekStart: new Date('2025-02-10'),
      weekEnd: new Date('2025-02-16'),
      semester: semester2.code,
      academicYear: '2024-2025',
      isRecurring: true,
      status: 'active',
    },
    {
      classId: classMap.get('WEB101-01'),
      roomId: 4,
      timeslotId: timeslotMap.get('T6'),
      instructorId: instructor3.id,
      dayOfWeek: 6,
      weekStart: new Date('2025-02-10'),
      weekEnd: new Date('2025-02-16'),
      semester: semester2.code,
      academicYear: '2024-2025',
      isRecurring: true,
      status: 'active',
    },
  ]

  for (const schedule of schedulesData) {
    await prisma.schedule.create({ data: schedule })
  }

  console.log('✅ Seed completed successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })

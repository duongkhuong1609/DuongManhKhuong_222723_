// MongoDB Seed Script for University Schedule Management System
// Run this script in MongoDB Compass Shell or mongosh
// 
// Connection: mongodb://localhost:27017/university_schedule
// 
// To run in mongosh:
// 1. Open terminal and run: mongosh "mongodb://localhost:27017/university_schedule"
// 2. Copy and paste this script
//
// To run in MongoDB Compass:
// 1. Connect to mongodb://localhost:27017
// 2. Create database "university_schedule" if not exists
// 3. Go to each collection and use "Add Data" > "Insert Document"

const db = db.getSiblingDB("university_schedule");

// ============================================
// CLEAR EXISTING DATA (Optional - Uncomment if needed)
// ============================================
// db.instructors.deleteMany({})
// db.rooms.deleteMany({})
// db.courses.deleteMany({})
// db.classes.deleteMany({})
// db.timeslots.deleteMany({})
// db.schedules.deleteMany({})
// db.semesters.deleteMany({})

// ============================================
// 0. SEMESTERS (Học kỳ)
// ============================================
db.semesters.insertMany([
  {
    code: "HK1_2024-2025",
    name: "Học kỳ 1 - Năm học 2024-2025",
    shortName: "HK1 2024-2025",
    semesterNumber: 1,
    academicYear: "2024-2025",
    startDate: new Date("2024-09-02"),
    endDate: new Date("2025-01-15"),
    isActive: true,
    isCurrent: false,
    status: "completed",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "HK2_2024-2025",
    name: "Học kỳ 2 - Năm học 2024-2025",
    shortName: "HK2 2024-2025",
    semesterNumber: 2,
    academicYear: "2024-2025",
    startDate: new Date("2025-02-10"),
    endDate: new Date("2025-06-15"),
    isActive: true,
    isCurrent: true,
    status: "ongoing",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "HK3_2024-2025",
    name: "Học kỳ hè - Năm học 2024-2025",
    shortName: "HK Hè 2024-2025",
    semesterNumber: 3,
    academicYear: "2024-2025",
    startDate: new Date("2025-07-01"),
    endDate: new Date("2025-08-15"),
    isActive: true,
    isCurrent: false,
    status: "upcoming",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "HK1_2025-2026",
    name: "Học kỳ 1 - Năm học 2025-2026",
    shortName: "HK1 2025-2026",
    semesterNumber: 1,
    academicYear: "2025-2026",
    startDate: new Date("2025-09-01"),
    endDate: new Date("2026-01-15"),
    isActive: true,
    isCurrent: false,
    status: "upcoming",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "HK2_2025-2026",
    name: "Học kỳ 2 - Năm học 2025-2026",
    shortName: "HK2 2025-2026",
    semesterNumber: 2,
    academicYear: "2025-2026",
    startDate: new Date("2026-02-09"),
    endDate: new Date("2026-06-15"),
    isActive: true,
    isCurrent: false,
    status: "upcoming",
    createdAt: new Date(),
    updatedAt: new Date()
  }
])

print("✓ Inserted semesters")

// ============================================
// 1. TIMESLOTS (Giờ học)
// ============================================
db.timeslots.insertMany([
  {
    code: "T1",
    name: "Tiết 1",
    startTime: "07:00",
    endTime: "07:50",
    period: "morning",
    order: 1,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "T2",
    name: "Tiết 2",
    startTime: "08:00",
    endTime: "08:50",
    period: "morning",
    order: 2,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "T3",
    name: "Tiết 3",
    startTime: "09:00",
    endTime: "09:50",
    period: "morning",
    order: 3,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "T4",
    name: "Tiết 4",
    startTime: "10:00",
    endTime: "10:50",
    period: "morning",
    order: 4,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "T5",
    name: "Tiết 5",
    startTime: "11:00",
    endTime: "11:50",
    period: "morning",
    order: 5,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "T6",
    name: "Tiết 6",
    startTime: "13:00",
    endTime: "13:50",
    period: "afternoon",
    order: 6,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "T7",
    name: "Tiết 7",
    startTime: "14:00",
    endTime: "14:50",
    period: "afternoon",
    order: 7,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "T8",
    name: "Tiết 8",
    startTime: "15:00",
    endTime: "15:50",
    period: "afternoon",
    order: 8,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "T9",
    name: "Tiết 9",
    startTime: "16:00",
    endTime: "16:50",
    period: "afternoon",
    order: 9,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "T10",
    name: "Tiết 10",
    startTime: "17:00",
    endTime: "17:50",
    period: "afternoon",
    order: 10,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "T11",
    name: "Tiết 11",
    startTime: "18:00",
    endTime: "18:50",
    period: "evening",
    order: 11,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "T12",
    name: "Tiết 12",
    startTime: "19:00",
    endTime: "19:50",
    period: "evening",
    order: 12,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  }
])

print("✓ Inserted 12 timeslots")

// ============================================
// 2. INSTRUCTORS (Giảng viên)
// ============================================
db.instructors.insertMany([
  {
    code: "GV001",
    name: "Nguyễn Văn An",
    email: "nvan@university.edu.vn",
    phone: "0901234567",
    department: "Khoa Công nghệ Thông tin",
    position: "Tiến sĩ",
    maxHoursPerWeek: 20,
    specializations: ["Trí tuệ nhân tạo", "Machine Learning"],
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "GV002",
    name: "Trần Thị Bình",
    email: "ttbinh@university.edu.vn",
    phone: "0901234568",
    department: "Khoa Công nghệ Thông tin",
    position: "Thạc sĩ",
    maxHoursPerWeek: 24,
    specializations: ["Cơ sở dữ liệu", "Big Data"],
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "GV003",
    name: "Lê Minh Cường",
    email: "lmcuong@university.edu.vn",
    phone: "0901234569",
    department: "Khoa Toán - Thống kê",
    position: "Phó Giáo sư",
    maxHoursPerWeek: 16,
    specializations: ["Giải tích", "Đại số tuyến tính"],
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "GV004",
    name: "Phạm Thị Dung",
    email: "ptdung@university.edu.vn",
    phone: "0901234570",
    department: "Khoa Kinh tế",
    position: "Tiến sĩ",
    maxHoursPerWeek: 20,
    specializations: ["Kinh tế vi mô", "Kinh tế vĩ mô"],
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "GV005",
    name: "Hoàng Văn Em",
    email: "hvem@university.edu.vn",
    phone: "0901234571",
    department: "Khoa Công nghệ Thông tin",
    position: "Giảng viên",
    maxHoursPerWeek: 28,
    specializations: ["Lập trình web", "Mobile Development"],
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "GV006",
    name: "Ngô Thị Phương",
    email: "ntphuong@university.edu.vn",
    phone: "0901234572",
    department: "Khoa Ngoại ngữ",
    position: "Thạc sĩ",
    maxHoursPerWeek: 24,
    specializations: ["Tiếng Anh thương mại", "IELTS"],
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "GV007",
    name: "Vũ Đức Giang",
    email: "vdgiang@university.edu.vn",
    phone: "0901234573",
    department: "Khoa Điện - Điện tử",
    position: "Tiến sĩ",
    maxHoursPerWeek: 20,
    specializations: ["Điện tử số", "Vi xử lý"],
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "GV008",
    name: "Đặng Thị Hoa",
    email: "dthoa@university.edu.vn",
    phone: "0901234574",
    department: "Khoa Toán - Thống kê",
    position: "Giảng viên",
    maxHoursPerWeek: 28,
    specializations: ["Xác suất thống kê", "Toán rời rạc"],
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  }
])

print("✓ Inserted 8 instructors")

// ============================================
// 3. ROOMS (Phòng học)
// ============================================
db.rooms.insertMany([
  {
    code: "A101",
    name: "Phòng học A101",
    building: "Tòa A",
    floor: 1,
    capacity: 50,
    type: "lecture",
    equipment: ["Máy chiếu", "Điều hòa", "Micro"],
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "A102",
    name: "Phòng học A102",
    building: "Tòa A",
    floor: 1,
    capacity: 40,
    type: "lecture",
    equipment: ["Máy chiếu", "Điều hòa"],
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "A201",
    name: "Phòng học A201",
    building: "Tòa A",
    floor: 2,
    capacity: 60,
    type: "lecture",
    equipment: ["Máy chiếu", "Điều hòa", "Micro", "Bảng tương tác"],
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "A202",
    name: "Phòng học A202",
    building: "Tòa A",
    floor: 2,
    capacity: 45,
    type: "lecture",
    equipment: ["Máy chiếu", "Điều hòa"],
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "B101",
    name: "Phòng thực hành B101",
    building: "Tòa B",
    floor: 1,
    capacity: 30,
    type: "lab",
    equipment: ["Máy tính", "Máy chiếu", "Điều hòa"],
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "B102",
    name: "Phòng thực hành B102",
    building: "Tòa B",
    floor: 1,
    capacity: 35,
    type: "lab",
    equipment: ["Máy tính", "Máy chiếu", "Điều hòa"],
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "B201",
    name: "Phòng thực hành B201",
    building: "Tòa B",
    floor: 2,
    capacity: 25,
    type: "lab",
    equipment: ["Máy tính", "Máy chiếu", "Điều hòa", "Thiết bị mạng"],
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "C101",
    name: "Hội trường C101",
    building: "Tòa C",
    floor: 1,
    capacity: 200,
    type: "auditorium",
    equipment: ["Máy chiếu", "Điều hòa", "Hệ thống âm thanh", "Micro"],
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "D101",
    name: "Phòng seminar D101",
    building: "Tòa D",
    floor: 1,
    capacity: 20,
    type: "seminar",
    equipment: ["TV màn hình lớn", "Điều hòa", "Bàn họp"],
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "D102",
    name: "Phòng seminar D102",
    building: "Tòa D",
    floor: 1,
    capacity: 15,
    type: "seminar",
    equipment: ["TV màn hình lớn", "Điều hòa", "Bàn họp"],
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date()
  }
])

print("✓ Inserted 10 rooms")

// ============================================
// 4. COURSES (Môn học)
// ============================================
db.courses.insertMany([
  {
    code: "IT101",
    name: "Nhập môn Công nghệ Thông tin",
    credits: 3,
    theoryHours: 30,
    practiceHours: 15,
    department: "Khoa Công nghệ Thông tin",
    description: "Môn học giới thiệu các khái niệm cơ bản về CNTT",
    prerequisites: [],
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "IT201",
    name: "Cấu trúc dữ liệu và Giải thuật",
    credits: 4,
    theoryHours: 45,
    practiceHours: 15,
    department: "Khoa Công nghệ Thông tin",
    description: "Học về các cấu trúc dữ liệu và thuật toán cơ bản",
    prerequisites: [],
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "IT301",
    name: "Cơ sở dữ liệu",
    credits: 3,
    theoryHours: 30,
    practiceHours: 15,
    department: "Khoa Công nghệ Thông tin",
    description: "Thiết kế và quản lý cơ sở dữ liệu",
    prerequisites: [],
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "IT401",
    name: "Trí tuệ nhân tạo",
    credits: 3,
    theoryHours: 30,
    practiceHours: 15,
    department: "Khoa Công nghệ Thông tin",
    description: "Giới thiệu về AI và Machine Learning",
    prerequisites: [],
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "MATH101",
    name: "Giải tích 1",
    credits: 3,
    theoryHours: 45,
    practiceHours: 0,
    department: "Khoa Toán - Thống kê",
    description: "Giải tích hàm một biến",
    prerequisites: [],
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "MATH102",
    name: "Đại số tuyến tính",
    credits: 3,
    theoryHours: 45,
    practiceHours: 0,
    department: "Khoa Toán - Thống kê",
    description: "Ma trận, không gian vector, ánh xạ tuyến tính",
    prerequisites: [],
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "MATH201",
    name: "Xác suất thống kê",
    credits: 3,
    theoryHours: 45,
    practiceHours: 0,
    department: "Khoa Toán - Thống kê",
    description: "Lý thuyết xác suất và thống kê toán học",
    prerequisites: [],
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "ECO101",
    name: "Kinh tế vi mô",
    credits: 3,
    theoryHours: 45,
    practiceHours: 0,
    department: "Khoa Kinh tế",
    description: "Nguyên lý kinh tế vi mô",
    prerequisites: [],
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "ENG101",
    name: "Tiếng Anh cơ bản 1",
    credits: 3,
    theoryHours: 30,
    practiceHours: 15,
    department: "Khoa Ngoại ngữ",
    description: "Tiếng Anh giao tiếp cơ bản",
    prerequisites: [],
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "EE101",
    name: "Điện tử cơ bản",
    credits: 3,
    theoryHours: 30,
    practiceHours: 15,
    department: "Khoa Điện - Điện tử",
    description: "Nguyên lý điện tử cơ bản",
    prerequisites: [],
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  }
])

print("✓ Inserted 10 courses")

// ============================================
// 5. CLASSES (Lớp học)
// ============================================
// First, get the IDs of courses and instructors
const courses = db.courses.find({}).toArray()
const instructors = db.instructors.find({}).toArray()

const courseMap = {}
courses.forEach(c => courseMap[c.code] = c._id)

const instructorMap = {}
instructors.forEach(i => instructorMap[i.code] = i._id)

db.classes.insertMany([
  {
    code: "IT101-01",
    course: courseMap["IT101"],
    instructor: instructorMap["GV005"],
    semester: "HK1",
    academicYear: "2024-2025",
    studentCount: 45,
    maxStudents: 50,
    status: "ongoing",
    notes: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "IT201-01",
    course: courseMap["IT201"],
    instructor: instructorMap["GV001"],
    semester: "HK1",
    academicYear: "2024-2025",
    studentCount: 40,
    maxStudents: 45,
    status: "ongoing",
    notes: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "IT301-01",
    course: courseMap["IT301"],
    instructor: instructorMap["GV002"],
    semester: "HK1",
    academicYear: "2024-2025",
    studentCount: 35,
    maxStudents: 40,
    status: "ongoing",
    notes: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "IT401-01",
    course: courseMap["IT401"],
    instructor: instructorMap["GV001"],
    semester: "HK1",
    academicYear: "2024-2025",
    studentCount: 30,
    maxStudents: 35,
    status: "ongoing",
    notes: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "MATH101-01",
    course: courseMap["MATH101"],
    instructor: instructorMap["GV003"],
    semester: "HK1",
    academicYear: "2024-2025",
    studentCount: 55,
    maxStudents: 60,
    status: "ongoing",
    notes: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "MATH102-01",
    course: courseMap["MATH102"],
    instructor: instructorMap["GV003"],
    semester: "HK1",
    academicYear: "2024-2025",
    studentCount: 50,
    maxStudents: 60,
    status: "ongoing",
    notes: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "MATH201-01",
    course: courseMap["MATH201"],
    instructor: instructorMap["GV008"],
    semester: "HK1",
    academicYear: "2024-2025",
    studentCount: 45,
    maxStudents: 50,
    status: "ongoing",
    notes: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "ECO101-01",
    course: courseMap["ECO101"],
    instructor: instructorMap["GV004"],
    semester: "HK1",
    academicYear: "2024-2025",
    studentCount: 60,
    maxStudents: 60,
    status: "ongoing",
    notes: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "ENG101-01",
    course: courseMap["ENG101"],
    instructor: instructorMap["GV006"],
    semester: "HK1",
    academicYear: "2024-2025",
    studentCount: 35,
    maxStudents: 40,
    status: "ongoing",
    notes: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    code: "EE101-01",
    course: courseMap["EE101"],
    instructor: instructorMap["GV007"],
    semester: "HK1",
    academicYear: "2024-2025",
    studentCount: 30,
    maxStudents: 35,
    status: "ongoing",
    notes: "",
    createdAt: new Date(),
    updatedAt: new Date()
  }
])

print("✓ Inserted 10 classes")

// ============================================
// 6. SCHEDULES (Thời khóa biểu)
// ============================================
const classes = db.classes.find({}).toArray()
const rooms = db.rooms.find({}).toArray()
const timeslots = db.timeslots.find({}).toArray()

const classMap = {}
classes.forEach(c => classMap[c.code] = c._id)

const roomMap = {}
rooms.forEach(r => roomMap[r.code] = r._id)

const timeslotMap = {}
timeslots.forEach(t => timeslotMap[t.code] = t._id)

db.schedules.insertMany([
  // IT101-01: Thứ 2, Tiết 1-2, Phòng A101
  {
    class: classMap["IT101-01"],
    room: roomMap["A101"],
    timeslot: timeslotMap["T1"],
    dayOfWeek: 2,
    weekStart: new Date("2024-09-02"),
    weekEnd: new Date("2024-12-31"),
    semester: "HK1",
    academicYear: "2024-2025",
    isRecurring: true,
    status: "active",
    notes: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    class: classMap["IT101-01"],
    room: roomMap["A101"],
    timeslot: timeslotMap["T2"],
    dayOfWeek: 2,
    weekStart: new Date("2024-09-02"),
    weekEnd: new Date("2024-12-31"),
    semester: "HK1",
    academicYear: "2024-2025",
    isRecurring: true,
    status: "active",
    notes: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // IT201-01: Thứ 3, Tiết 3-4, Phòng A201
  {
    class: classMap["IT201-01"],
    room: roomMap["A201"],
    timeslot: timeslotMap["T3"],
    dayOfWeek: 3,
    weekStart: new Date("2024-09-02"),
    weekEnd: new Date("2024-12-31"),
    semester: "HK1",
    academicYear: "2024-2025",
    isRecurring: true,
    status: "active",
    notes: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    class: classMap["IT201-01"],
    room: roomMap["A201"],
    timeslot: timeslotMap["T4"],
    dayOfWeek: 3,
    weekStart: new Date("2024-09-02"),
    weekEnd: new Date("2024-12-31"),
    semester: "HK1",
    academicYear: "2024-2025",
    isRecurring: true,
    status: "active",
    notes: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // IT301-01: Thứ 4, Tiết 6-7, Phòng B101 (Lab)
  {
    class: classMap["IT301-01"],
    room: roomMap["B101"],
    timeslot: timeslotMap["T6"],
    dayOfWeek: 4,
    weekStart: new Date("2024-09-02"),
    weekEnd: new Date("2024-12-31"),
    semester: "HK1",
    academicYear: "2024-2025",
    isRecurring: true,
    status: "active",
    notes: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    class: classMap["IT301-01"],
    room: roomMap["B101"],
    timeslot: timeslotMap["T7"],
    dayOfWeek: 4,
    weekStart: new Date("2024-09-02"),
    weekEnd: new Date("2024-12-31"),
    semester: "HK1",
    academicYear: "2024-2025",
    isRecurring: true,
    status: "active",
    notes: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // IT401-01: Thứ 5, Tiết 1-2, Phòng A102
  {
    class: classMap["IT401-01"],
    room: roomMap["A102"],
    timeslot: timeslotMap["T1"],
    dayOfWeek: 5,
    weekStart: new Date("2024-09-02"),
    weekEnd: new Date("2024-12-31"),
    semester: "HK1",
    academicYear: "2024-2025",
    isRecurring: true,
    status: "active",
    notes: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    class: classMap["IT401-01"],
    room: roomMap["A102"],
    timeslot: timeslotMap["T2"],
    dayOfWeek: 5,
    weekStart: new Date("2024-09-02"),
    weekEnd: new Date("2024-12-31"),
    semester: "HK1",
    academicYear: "2024-2025",
    isRecurring: true,
    status: "active",
    notes: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // MATH101-01: Thứ 2, Tiết 3-4-5, Phòng A201
  {
    class: classMap["MATH101-01"],
    room: roomMap["A201"],
    timeslot: timeslotMap["T3"],
    dayOfWeek: 2,
    weekStart: new Date("2024-09-02"),
    weekEnd: new Date("2024-12-31"),
    semester: "HK1",
    academicYear: "2024-2025",
    isRecurring: true,
    status: "active",
    notes: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    class: classMap["MATH101-01"],
    room: roomMap["A201"],
    timeslot: timeslotMap["T4"],
    dayOfWeek: 2,
    weekStart: new Date("2024-09-02"),
    weekEnd: new Date("2024-12-31"),
    semester: "HK1",
    academicYear: "2024-2025",
    isRecurring: true,
    status: "active",
    notes: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // MATH102-01: Thứ 4, Tiết 1-2-3, Phòng A201
  {
    class: classMap["MATH102-01"],
    room: roomMap["A201"],
    timeslot: timeslotMap["T1"],
    dayOfWeek: 4,
    weekStart: new Date("2024-09-02"),
    weekEnd: new Date("2024-12-31"),
    semester: "HK1",
    academicYear: "2024-2025",
    isRecurring: true,
    status: "active",
    notes: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    class: classMap["MATH102-01"],
    room: roomMap["A201"],
    timeslot: timeslotMap["T2"],
    dayOfWeek: 4,
    weekStart: new Date("2024-09-02"),
    weekEnd: new Date("2024-12-31"),
    semester: "HK1",
    academicYear: "2024-2025",
    isRecurring: true,
    status: "active",
    notes: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // ECO101-01: Thứ 6, Tiết 6-7-8, Phòng C101 (Hội trường)
  {
    class: classMap["ECO101-01"],
    room: roomMap["C101"],
    timeslot: timeslotMap["T6"],
    dayOfWeek: 6,
    weekStart: new Date("2024-09-02"),
    weekEnd: new Date("2024-12-31"),
    semester: "HK1",
    academicYear: "2024-2025",
    isRecurring: true,
    status: "active",
    notes: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    class: classMap["ECO101-01"],
    room: roomMap["C101"],
    timeslot: timeslotMap["T7"],
    dayOfWeek: 6,
    weekStart: new Date("2024-09-02"),
    weekEnd: new Date("2024-12-31"),
    semester: "HK1",
    academicYear: "2024-2025",
    isRecurring: true,
    status: "active",
    notes: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // ENG101-01: Thứ 3, Tiết 6-7, Phòng D101 (Seminar)
  {
    class: classMap["ENG101-01"],
    room: roomMap["D101"],
    timeslot: timeslotMap["T6"],
    dayOfWeek: 3,
    weekStart: new Date("2024-09-02"),
    weekEnd: new Date("2024-12-31"),
    semester: "HK1",
    academicYear: "2024-2025",
    isRecurring: true,
    status: "active",
    notes: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    class: classMap["ENG101-01"],
    room: roomMap["D101"],
    timeslot: timeslotMap["T7"],
    dayOfWeek: 3,
    weekStart: new Date("2024-09-02"),
    weekEnd: new Date("2024-12-31"),
    semester: "HK1",
    academicYear: "2024-2025",
    isRecurring: true,
    status: "active",
    notes: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // EE101-01: Thứ 5, Tiết 6-7-8, Phòng B201 (Lab)
  {
    class: classMap["EE101-01"],
    room: roomMap["B201"],
    timeslot: timeslotMap["T6"],
    dayOfWeek: 5,
    weekStart: new Date("2024-09-02"),
    weekEnd: new Date("2024-12-31"),
    semester: "HK1",
    academicYear: "2024-2025",
    isRecurring: true,
    status: "active",
    notes: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    class: classMap["EE101-01"],
    room: roomMap["B201"],
    timeslot: timeslotMap["T7"],
    dayOfWeek: 5,
    weekStart: new Date("2024-09-02"),
    weekEnd: new Date("2024-12-31"),
    semester: "HK1",
    academicYear: "2024-2025",
    isRecurring: true,
    status: "active",
    notes: "",
    createdAt: new Date(),
    updatedAt: new Date()
  }
])

print("✓ Inserted 18 schedules")

// ============================================
// CREATE INDEXES
// ============================================
db.instructors.createIndex({ code: 1 }, { unique: true })
db.instructors.createIndex({ email: 1 }, { unique: true })
db.instructors.createIndex({ department: 1 })
db.instructors.createIndex({ status: 1 })

db.rooms.createIndex({ code: 1 }, { unique: true })
db.rooms.createIndex({ building: 1 })
db.rooms.createIndex({ type: 1 })
db.rooms.createIndex({ status: 1 })

db.courses.createIndex({ code: 1 }, { unique: true })
db.courses.createIndex({ department: 1 })

db.classes.createIndex({ code: 1 }, { unique: true })
db.classes.createIndex({ semester: 1, academicYear: 1 })
db.classes.createIndex({ instructor: 1 })
db.classes.createIndex({ course: 1 })

db.timeslots.createIndex({ code: 1 }, { unique: true })
db.timeslots.createIndex({ order: 1 })

db.schedules.createIndex({ room: 1, dayOfWeek: 1, timeslot: 1, semester: 1 })
db.schedules.createIndex({ class: 1, dayOfWeek: 1, timeslot: 1 })
db.schedules.createIndex({ semester: 1, academicYear: 1 })

print("✓ Created indexes")

print("\n========================================")
print("Database seeding completed successfully!")
print("========================================")
print("\nSummary:")
print("- 12 timeslots (Giờ học)")
print("- 8 instructors (Giảng viên)")
print("- 10 rooms (Phòng học)")
print("- 10 courses (Môn học)")
print("- 10 classes (Lớp học)")
print("- 18 schedules (Thời khóa biểu)")

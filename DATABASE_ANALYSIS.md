# 📊 PHÂN TÍCH CẤU TRÚC DỮ LIỆU HỆ THỐNG QUẢN LÝ LỊCH BIỂU ĐẠI HỌC

## I. TÓNG QUAN HỆ THỐNG

Hệ thống là **Dashboard Lịch Biểu Đại Học** dùng để:
- Quản lý giảng viên, môn học, lớp học
- Quản lý phòng học, tiết học
- Tạo và quản lý lịch biểu cho các lớp
- Theo dõi thống kê và xuất báo cáo

**Stack công nghệ:**
- Frontend: Next.js 16 + React 19 + TypeScript
- Backend: Next.js API Routes
- Database: MongoDB
- UI: Radix UI + TailwindCSS

---

## II. PHÂN TÍCH DỮ LIỆU HIỆN CÓ

### Nguồn dữ liệu:

**1. Dữ liệu tĩnh (khởi tạo):**
   - File: `scripts/seed-database.js` - Chứa dữ liệu mẫu ban đầu
   - Dữ liệu hardcode trong components (instructors.tsx, etc.)

**2. Dữ liệu động:**
   - Được tạo/cập nhật thông qua UI Dashboard
   - Lưu vào MongoDB qua API routes

### 7 Collections (Bộ sưu tập) chính:

```
┌─────────────────────────────────────────────────────────────┐
│                   UNIVERSITY SCHEDULE DB                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Semesters   │  │  Courses     │  │ Instructors  │      │
│  │  (Học kỳ)    │  │  (Môn học)   │  │  (Giảng viên)│      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                  │                  │              │
│         └──────────────────┼──────────────────┘              │
│                            │                                 │
│                    ┌───────▼────────┐                        │
│                    │   Classes      │                        │
│                    │   (Lớp học)    │                        │
│                    └───────┬────────┘                        │
│                            │                                 │
│         ┌──────────────────┼──────────────────┐             │
│         │                  │                  │              │
│    ┌────▼──────┐    ┌──────▼──────┐    ┌────▼─────┐       │
│    │  Rooms    │    │ Timeslots   │    │ Schedules│       │
│    │ (Phòng)   │    │ (Tiết học)  │    │ (TKB)    │       │
│    └───────────┘    └─────────────┘    └──────────┘       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## III. CHI TIẾT TỪNG COLLECTION

### 1. **SEMESTERS** (Học kỳ)
```typescript
{
  code: "HK1_2024-2025"           // Mã học kỳ (UNIQUE)
  name: "Học kỳ 1 - Năm học 2024-2025"
  shortName: "HK1 2024-2025"
  semesterNumber: 1               // 1 = HK1, 2 = HK2, 3 = HK Hè
  academicYear: "2024-2025"       // Năm học
  startDate: Date
  endDate: Date
  isActive: boolean               // Học kỳ hiện tại?
  isCurrent: boolean              // Đang diễn ra?
  status: "upcoming" | "ongoing" | "completed"
  createdAt: Date
  updatedAt: Date
}
```
**Index:** code (unique)

---

### 2. **INSTRUCTORS** (Giảng viên)
```typescript
{
  code: "GV001"                   // Mã giảng viên (UNIQUE)
  name: "PGS.TS. Nguyễn Văn An"
  email: "an.nguyen@uni.edu.vn"   // Email (UNIQUE)
  phone: "0901234567"
  department: "Công nghệ thông tin"  // Khoa
  position: "Phó Giáo sư"         // Chức vụ
  maxHoursPerWeek: 20             // Giờ dạy tối đa/tuần
  specializations: ["Lập trình", "Cấu trúc dữ liệu"]
  teachingNotes: "Không dạy buổi chiều" // MỚI: Ghi chú nguyện vọng
  status: "active" | "inactive" | "on_leave"
  createdAt: Date
  updatedAt: Date
}
```
**Indexes:** code (unique), email (unique), department, status

---

### 3. **ROOMS** (Phòng học)
```typescript
{
  code: "P101"                    // Mã phòng (UNIQUE)
  name: "Phòng 101"
  building: "Tòa A"
  floor: 1
  capacity: 50                    // Sức chứa
  type: "lecture" | "lab" | "seminar" | "auditorium"
  equipment: ["Máy chiếu", "Điều hòa", "WiFi"]
  status: "available" | "maintenance" | "unavailable"
  createdAt: Date
  updatedAt: Date
}
```
**Indexes:** building, type, status, capacity

---

### 4. **COURSES** (Môn học)
```typescript
{
  code: "CS101"                   // Mã môn (UNIQUE, UPPERCASE)
  name: "Lập trình C++"
  credits: 3                      // Tín chỉ
  theoryHours: 30                 // Giờ lý thuyết
  practiceHours: 30               // Giờ thực hành
  department: "Công nghệ thông tin"
  description: "Môn học cơ bản..."
  prerequisites: [ObjectId]       // Môn tiên quyết (references)
  status: "active" | "inactive"
  createdAt: Date
  updatedAt: Date
}
```
**Indexes:** code (unique), department

---

### 5. **TIMESLOTS** (Tiết học)
```typescript
{
  code: "T1"                      // Mã tiết (UNIQUE)
  name: "Tiết 1"
  startTime: "07:00"
  endTime: "07:50"
  period: "morning" | "afternoon" | "evening"
  order: 1                        // Thứ tự trong ngày
  status: "active" | "inactive"
  createdAt: Date
  updatedAt: Date
}
```
**Indexes:** period, order

---

### 6. **CLASSES** (Lớp học)
```typescript
{
  code: "CS101-01"                // Mã lớp (UNIQUE)
  course: ObjectId                // REF: Courses
  instructor: ObjectId            // REF: Instructors
  semester: "HK1_2024-2025"       // Học kỳ
  academicYear: "2024-2025"
  studentCount: 45                // Số SV hiện tại
  maxStudents: 50                 // Sĩ số tối đa
  status: "scheduled" | "ongoing" | "completed" | "cancelled"
  notes: "Ghi chú về lớp"
  createdAt: Date
  updatedAt: Date
}
```
**Indexes:** code (unique), course, instructor, semester

---

### 7. **SCHEDULES** (Lịch biểu)
```typescript
{
  class: ObjectId                 // REF: Classes
  room: ObjectId                  // REF: Rooms
  timeslot: ObjectId              // REF: Timeslots
  dayOfWeek: 2                    // 2=T2, 3=T3, ..., 7=T7
  weekStart: Date                 // Ngày bắt đầu tuần
  weekEnd: Date                   // Ngày kết thúc tuần
  semester: "HK1_2024-2025"
  academicYear: "2024-2025"
  isRecurring: true               // Lặp hàng tuần?
  status: "active" | "cancelled" | "rescheduled"
  notes: "Ghi chú thay đổi"
  createdAt: Date
  updatedAt: Date
}
```
**Indexes:** class, room, timeslot, dayOfWeek, semester

---

## IV. QUAN HỆ GIỮA CÁC COLLECTION

```
Semester (1) ←── (n) Class ←── (n) Schedule ──→ (1) Room
                    ↓                             ↑
                    ↓ (1)                        (n)
                Course                       Timeslot
                    ↑
                    │ (1)
                Instructor
```

**Chi tiết quan hệ:**
- 1 Semester có NHIỀU Classes
- 1 Course có NHIỀU Classes
- 1 Instructor dạy NHIỀU Classes
- 1 Class có NHIỀU Schedules
- 1 Room có NHIỀU Schedules
- 1 Timeslot có NHIỀU Schedules

---

## V. ĐỀ XUẤT CẤU TRÚC MONGODB TỐI ƯU

### ✅ Cấu trúc được khuyến khích:

#### **Schema Design Principles:**

1. **Normalization (Chuẩn hóa)** - 60%
   - Dùng References (ObjectId) để liên kết collections
   - Tránh lặp dữ liệu
   - Dễ cập nhật, bảo trì

2. **Denormalization** - 40%
   - Embed dữ liệu thường xuyên truy cập cùng nhau
   - Giảm số queries

### 📋 Đề xuất Collections Tối Ưu:

#### **Cách 1: Normalized (Hiện tại - TỐT)**
```javascript
// Collections riêng biệt, liên kết bằng ObjectId
// ✅ Ưu điểm: Dễ maintain, update linh hoạt
// ❌ Nhược điểm: Cần nhiều queries, population

// Ví dụ query:
Schedule.findById(id)
  .populate('class')
  .populate('room')
  .populate('timeslot')
  .populate({
    path: 'class',
    populate: {
      path: 'instructor course'
    }
  })
```

#### **Cách 2: Hybrid (Khuyến khích cải tiến)**
```javascript
// Embed dữ liệu nhỏ, tham chiếu dữ liệu lớn

// Schedule collection - IMPROVED
{
  _id: ObjectId,
  
  // Tham chiếu đầy đủ
  class: ObjectId,
  room: ObjectId,
  timeslot: ObjectId,
  
  // Embed dữ liệu thường xuyên hiển thị
  classInfo: {
    code: "CS101-01",
    courseCode: "CS101",
    courseName: "Lập trình C++",
    instructor: {
      code: "GV001",
      name: "PGS.TS. Nguyễn Văn An",
      email: "an.nguyen@uni.edu.vn"
    },
    studentCount: 45
  },
  
  roomInfo: {
    code: "P101",
    name: "Phòng 101",
    building: "Tòa A",
    capacity: 50
  },
  
  timeslotInfo: {
    code: "T1",
    name: "Tiết 1",
    startTime: "07:00",
    endTime: "07:50",
    period: "morning"
  },
  
  dayOfWeek: 2,
  weekStart: Date,
  weekEnd: Date,
  semester: "HK1_2024-2025",
  status: "active",
  createdAt: Date
}
```

---

## VI. ĐIỂM MẠNH & ĐIỂM YẾU HIỆN TẠI

### 💪 ĐIỂM MẠNH:
1. ✅ Cấu trúc schema rõ ràng, chuẩn hóa tốt
2. ✅ Có indexes phù hợp (department, status, period)
3. ✅ Quan hệ rõ ràng giữa các collection
4. ✅ Tính linh hoạt cao khi sửa đổi dữ liệu
5. ✅ Thêm trường `teachingNotes` cho giảng viên

### ⚠️ ĐIỂM YẾU CẦN CẢI THIỆN:
1. ❌ Thiếu indexes cho truy vấn hiệu suất cao
2. ❌ Denormalization tối thiểu → nhiều queries
3. ❌ Chưa có compound indexes
4. ❌ Chưa có validation rules phức tạp
5. ❌ Dữ liệu hiện có trong components (hardcode)

---

## VII. KHUYẾN CÁO CẢI TIẾN

### A. Thêm INDEXES cho hiệu suất:

```javascript
// Instructor
db.instructors.createIndex({ department: 1, status: 1 })
db.instructors.createIndex({ maxHoursPerWeek: 1 })

// Class
db.classes.createIndex({ semester: 1, academicYear: 1 })
db.classes.createIndex({ instructor: 1, semester: 1 })

// Schedule
db.schedules.createIndex({ class: 1, semester: 1 })
db.schedules.createIndex({ dayOfWeek: 1, semester: 1 })
db.schedules.createIndex({ room: 1, dayOfWeek: 1 })
db.schedules.createIndex({ semester: 1, status: 1 })

// Course
db.courses.createIndex({ department: 1, status: 1 })

// Room
db.rooms.createIndex({ type: 1, capacity: 1 })
```

### B. Thêm Validation Rules:

```typescript
// Ví dụ: Kiểm tra trùng lịch giảng viên
db.createCollection("schedules", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["class", "room", "timeslot", "dayOfWeek"],
      properties: {
        class: { bsonType: "objectId" },
        room: { bsonType: "objectId" },
        timeslot: { bsonType: "objectId" },
        dayOfWeek: { 
          bsonType: "int",
          minimum: 2,
          maximum: 7
        }
      }
    }
  }
})
```

### C. Embed Dữ Liệu Thường Xuyên Hiển Thị:

Khi tạo Schedule, nên embed `instructorNotes` từ Instructor:
```typescript
// Thêm trường này vào Schedule
const schedule = {
  ...
  instructorTeachingNotes: instructor.teachingNotes,
  instructorMaxHoursPerWeek: instructor.maxHoursPerWeek,
  roomCapacity: room.capacity,
  roomEquipment: room.equipment,
  ...
}
```

### D. Thêm API Endpoints Nâng Cao:

```
GET /api/schedules/conflict-check  → Kiểm tra xung đột lịch
GET /api/instructors/workload      → Tính toán khối lượng giảng viên
GET /api/rooms/availability        → Phòng trống theo ngày giờ
GET /api/classes/enrollment-stats  → Thống kê enroll lớp
```

---

## VIII. SEED DATA HIỆN TẠI

Dữ liệu ban đầu được lưu trong: `scripts/seed-database.js`

**Bao gồm:**
- 4 Semesters (HK1-HK3 năm 2024-2025, HK1 năm 2025-2026)
- ~20 Instructors (giảng viên các khoa)
- ~15 Rooms (phòng ở 3 tòa nhà)
- ~20 Courses (môn học khác nhau)
- ~30 Classes (lớp học của các môn)
- ~12 Timeslots (tiết học)
- ~100+ Schedules (lịch biểu chi tiết)

---

## IX. CÁCH KHỞI TẠO MONGODB

### Cách 1: Local MongoDB (Khuyến khích dev)
```bash
# Cài MongoDB Community Edition
# macOS
brew tap mongodb/brew
brew install mongodb-community

# Windows
# Download từ: https://www.mongodb.com/try/download/community

# Chạy MongoDB
mongod

# Khác terminal, chạy seed script
mongosh < scripts/seed-database.js
```

### Cách 2: MongoDB Atlas (Cloud)
```
1. Đăng ký tại: https://www.mongodb.com/cloud/atlas
2. Tạo cluster free
3. Lấy connection string: mongodb+srv://user:pass@cluster.mongodb.net/dbname
4. Thêm vào .env.local:
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/university-schedule
```

### Cách 3: Docker
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

---

## X. TÓNG KẾT KHUYẾN CÁO

| Yêu cầu | Trạng thái | Ưu tiên |
|--------|----------|--------|
| Chuẩn hóa schema | ✅ Tốt | - |
| Thêm indexes | ⚠️ Cần cải | 🔴 Cao |
| Embed dữ liệu thường xuyên | ❌ Chưa | 🟡 Trung |
| Validation rules | ❌ Chưa | 🟡 Trung |
| Dữ liệu mẫu | ✅ Có | - |
| API optimization | ⚠️ Có cơ bản | 🟡 Trung |

**Kết luận:** Hệ thống đã có cấu trúc MongoDB tốt. Chỉ cần bổ sung indexes và denormalization cho truy vấn hiệu suất cao.

# 📚 HỆ THỐNG QUẢN LÝ LỊCH HỌC ĐẠI HỌC

> **Hệ thống quản lý lịch học đại học với khả năng tương thích thuật toán tiến hóa (Evolutionary Algorithm)**

![Status](https://img.shields.io/badge/Status-Ready%20to%20Run-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js)
![SQL Server 2019 or later](https://img.shields.io/badge/SQL%20Server-2019+-CC2927?logo=microsoftsqlserver)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)

---

## 📋 Tổng Quan Hệ Thống

Hệ thống này là nền tảng quản lý lịch học tập trung, được thiết kế để:

- **Quản lý dữ liệu tập trung**: Lưu trữ thông tin giảng viên, phòng học, môn học, và lịch dạy
- **Cung cấp API đầy đủ**: Cho phép các thuật toán bên ngoài (bao gồm thuật toán tiến hóa) truy cập và xử lý dữ liệu
- **Hỗ trợ tối ưu hóa**: Lịch học có thể được tối ưu hóa bằng các thuật toán tiến hóa để tìm giải pháp tốt nhất

---

## 🗄️ Cơ Sở Dữ Liệu Trực Quan

### 7 Models Chính

| Model | Mục Đích | Trường Quan Trọng |
|-------|---------|------------------|
| **Semester** | Kỳ học | code, name, startDate, endDate, isActive |
| **Instructor** | Giảng viên | code, name, email, teachingNotes, maxHoursPerWeek |
| **Room** | Phòng học | code, building, capacity, type |
| **Course** | Môn học | code, name, department, credits |
| **Timeslot** | Tiết học | code, startTime, endTime, period |
| **Class** | Lớp học | code, courseId, instructorId, semesterId |
| **Schedule** | Lịch dạy | classId, roomId, timeslotId, dayOfWeek |

### Sơ Đồ Quan Hệ

```
Semester (kỳ học)
  ├─ Class (lớp học)
  │   ├─ Course (môn học)
  │   └─ Instructor (giảng viên)
  │       └─ teachingNotes (sở thích dạy)
  │
  └─ Schedule (lịch dạy)
      ├─ Room (phòng học)
      ├─ Timeslot (tiết học)
      └─ Class (lớp học)
```

---

## 🧬 Khả Năng Tương Thích Thuật Toán Tiến Hóa

Hệ thống được thiết kế để hỗ trợ các thuật toán tiến hóa tối ưu hóa lịch học:

### 1. **Dữ Liệu Đầu Vào (Constraints & Inputs)**
- Danh sách lớp học, giảng viên, phòng, tiết học
- Giới hạn: giờ dạy tối đa, sở thích dạy của giảng viên
- Thời gian có sẵn (các tiết học khả dụng)

### 2. **Biểu Diễn Cá Thể (Individual/Chromosome)**
- Mỗi cá thể đại diện cho một lịch học hoàn chỉnh
- Gen = (ClassID, RoomID, TimeslotID, DayOfWeek)

### 3. **Hàm Đánh Giá (Fitness Function)**
Đánh giá chất lượng lịch học dựa trên:
- ✅ Không có xung đột thời gian
- ✅ Không vượt giờ dạy tối đa của giảng viên
- ✅ Sứ dụng phòng phù hợp với sức chứa lớp
- ✅ Tôn trọng sở thích dạy của giảng viên

### 4. **API Hỗ Trợ**
- `GET /api/classes` - Lấy danh sách lớp cần xếp lịch
- `GET /api/instructors` - Lấy thông tin giảng viên (giờ max, sở thích)
- `GET /api/rooms` - Lấy danh sách phòng với sức chứa
- `GET /api/timeslots` - Lấy danh sách tiết học
- `GET /api/schedules` - Lấy lịch hiện tại
- `POST /api/schedules` - Lưu lịch được tối ưu

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy

### 1️⃣ Yêu Cầu Hệ Thống

- **Node.js**: v22.20.0 hoặc cao hơn
- **pnpm**: v10.28.2 (hoặc npm/yarn)
- **SQL Server**: 2019+ (Express được hỗ trợ)

### 2️⃣ Clone & Cài Đặt Gói

```bash
# Clone repo
git clone <your-repo-url>
cd v0-university-schedule-dashboard

# Cài đặt dependencies
pnpm install
```

### 3️⃣ Cấu Hình Database

#### Cài Đặt SQL Server (Lần Đầu)

**Tùy Chọn A: SQL Server Express (Khuyến nghị)**
```powershell
# Download từ:
# https://www.microsoft.com/en-us/sql-server/sql-server-downloads

# Sau khi cài, kiểm tra:
sqlcmd -S localhost\SQLEXPRESS -E -Q "SELECT @@VERSION"
```

**Tùy Chọn B: SQL Server Developer Edition**
```powershell
# https://www.microsoft.com/en-us/sql-server/sql-server-downloads
```

#### Cấu Hình `.env.local`

Sao chép từ `.env` và cập nhật DATABASE_URL:

```env
# Windows Authentication (Khuyến nghị)
DATABASE_URL="sqlserver://localhost\\SQLEXPRESS;database=university_schedule;integratedSecurity=true;encrypt=false;trustServerCertificate=true"

# hoặc SQL Authentication
DATABASE_URL="sqlserver://sa:YourPassword@localhost,1433;database=university_schedule;encrypt=false;trustServerCertificate=true"
```

### 4️⃣ Tạo & Seed Database

```bash
# Tạo database và tables từ Prisma schema
pnpm prisma migrate dev --name init

# Nhập dữ liệu mẫu (giảng viên, phòng, lịch, v.v.)
pnpm prisma db seed

# Kiểm tra dữ liệu bằng Prisma Studio
pnpm prisma studio
```

### 5️⃣ Chạy Ứng Dụng

```bash
# Chạy dev server
pnpm dev

# Ứng dụng sẽ có sẵn tại:
# http://localhost:3000
```

Mở trình duyệt và truy cập: **http://localhost:3000** ✨

---

## � API Endpoints
### Lấy Dữ Liệu (cho thuật toán tiến hóa)

```bash
# Lấy danh sách lớp cần xếp lịch
GET /api/classes?semesterId=<id>

# Lấy danh sách giảng viên
GET /api/instructors

# Lấy danh sách phòng
GET /api/rooms

# Lấy danh sách tiết học
GET /api/timeslots

# Lấy lịch hiện tại
GET /api/schedules?semesterId=<id>
```

### Lưu Lịch Được Tối Ưu

```bash
# Lưu lịch (sau khi thuật toán tối ưu)
POST /api/schedules
Body: [
  {
    "classId": "...",
    "roomId": "...",
    "timeslotId": "...",
    "dayOfWeek": 1
  },
  ...
]
```

---



# 📚 HỆ THỐNG QUẢN LÝ LỊCH HỌC ĐẠI HỌC

> **Ứng dụng quản lý lịch dạy tự động cho các trường đại học với Next.js, Prisma & SQL Server**

![Status](https://img.shields.io/badge/Status-Ready%20to%20Run-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js)
![Prisma](https://img.shields.io/badge/Prisma-7.3-2D3748?logo=prisma)
![SQL Server](https://img.shields.io/badge/SQL%20Server-2019+-CC2927?logo=microsoftsqlserver)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?logo=typescript)

---

## 🎯 Tính Năng Chính

✅ **Quản Lý Giảng Viên**
- Thêm, sửa, xóa giảng viên
- Ghi chú nguyện vọng dạy (teaching notes)
- Theo dõi giờ dạy tối đa/tuần
- Lọc theo bộ môn, trạng thái

✅ **Quản Lý Phòng & Tài Nguyên**
- Quản lý phòng học theo tòa nhà
- Theo dõi sức chứa phòng
- Phân loại phòng (Giảng đường, Lab, Hội thảo)

✅ **Quản Lý Lịch Học**
- Lập lịch tự động (Schedule Generator)
- Kiểm tra xung đột thời gian
- Cân bằng tải giảng viên
- Tôn trọng sở thích dạy

✅ **Thống Kê & Báo Cáo**
- Khối lượng giờ dạy theo giảng viên
- Tỉ lệ sử dụng phòng
- Phân phối lớp/khóa học

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

## 📖 Cấu Trúc Dự Án

```
├── app/
│   ├── api/                 # API Routes
│   │   ├── instructors/     # API giảng viên
│   │   ├── courses/         # API môn học
│   │   ├── rooms/           # API phòng học
│   │   ├── schedules/       # API lịch học
│   │   ├── statistics/      # API thống kê
│   │   └── ...
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Trang chủ
├── components/
│   ├── dashboard/           # Các component dashboard
│   │   ├── instructors.tsx
│   │   ├── courses.tsx
│   │   ├── schedule-generator.tsx
│   │   └── ...
│   └── ui/                  # UI components (Radix UI)
├── lib/
│   ├── prisma.ts            # Prisma Client singleton
│   ├── generated/prisma/    # Generated Prisma types
│   └── utils.ts
├── prisma/
│   ├── schema.prisma        # Database schema
│   ├── seed.ts              # Seed script
│   └── migrations/          # Database migrations
├── .env.local               # Cấu hình database (bạn tạo)
└── package.json
```

---

## 🔧 Công Cụ & Lệnh Hữu Ích

### Development

```bash
# Chạy dev server với hot reload
pnpm dev

# Kiểm tra TypeScript
pnpm tsc --noEmit

# Lint code
pnpm lint

# Build cho production
pnpm build

# Chạy production build
pnpm start
```

### Database

```bash
# Xem dữ liệu GUI (Prisma Studio)
pnpm prisma studio

# Tạo migration mới
pnpm prisma migrate dev --name <migration_name>

# Reset database (xóa tất cả)
pnpm prisma migrate reset

# Seed lại dữ liệu mẫu
pnpm prisma db seed

# Xem Prisma schema
pnpm prisma format
```

---

## 📊 Database Schema

### 7 Models Chính

| Model | Mục Đích | Trường Quan Trọng |
|-------|---------|------------------|
| **Semester** | Kỳ học | code, name, startDate, endDate, isActive |
| **Instructor** | Giảng viên | code, name, email, **teachingNotes**, maxHoursPerWeek |
| **Room** | Phòng học | code, building, capacity, type |
| **Course** | Môn học | code, name, department, credits |
| **Timeslot** | Tiết học | code, startTime, endTime, period (sáng/chiều/tối) |
| **Class** | Lớp học | code, courseId, instructorId, semesterId |
| **Schedule** | Lịch dạy | classId, roomId, timeslotId, dayOfWeek |

→ Xem chi tiết: [prisma/schema.prisma](prisma/schema.prisma)

---

## 🚦 Quy Trình Chuyên Biệt: MongoDB → SQL Server + Prisma

Dự án này đã **hoàn toàn chuyển từ MongoDB sang SQL Server** sử dụng Prisma ORM.

- ✅ Cài Prisma CLI & @prisma/client
- ✅ Tạo Prisma Schema cho SQL Server
- ✅ Tạo Prisma Client helper (singleton pattern)
- ✅ Cập nhật 9+ API Routes từ Mongoose → Prisma
- ✅ Seed script mới với dữ liệu thực tế
- ✅ Xóa tất cả dependencies MongoDB

→ Chi tiết: [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md)

---

## 📝 API Endpoints

### Giảng Viên

```bash
# Lấy danh sách giảng viên
GET /api/instructors?department=CNTT&search=Thầy

# Tạo giảng viên
POST /api/instructors
Body: { name, email, department, teachingNotes, ... }

# Cập nhật giảng viên
PUT /api/instructors/[id]

# Xóa giảng viên
DELETE /api/instructors/[id]
```

### Lịch Học

```bash
# Lấy lịch học theo semester
GET /api/schedules?semester=hk1-2024

# Tạo lịch học
POST /api/schedules
Body: { classId, roomId, timeslotId, dayOfWeek, ... }
```

### Thống Kê

```bash
# Lấy thống kê tổng quan
GET /api/statistics
```

→ Xem tất cả endpoints: [app/api/](app/api/)

---

## 🎨 UI & Giao Diện

- **Framework**: Next.js 16 + React 19
- **Styling**: TailwindCSS
- **Components**: Radix UI (unstyled, accessible)
- **Charts**: Recharts (biểu đồ thống kê)
- **Icons**: Lucide React

---

## 🐛 Troubleshooting

### ❌ Lỗi: "Cannot find module '@prisma/client'"

```bash
# Giải pháp:
pnpm install
pnpm prisma generate
```

### ❌ Lỗi: "Failed to connect to SQL Server"

- Kiểm tra SQL Server đang chạy: `sqlcmd -S localhost\SQLEXPRESS -E -Q "SELECT 1"`
- Kiểm tra DATABASE_URL trong `.env.local`
- Xem: [SQL_SERVER_SETUP.md](SQL_SERVER_SETUP.md)

### ❌ Lỗi: "Database 'university_schedule' does not exist"

```bash
# Giải pháp: Tạo database và migration
pnpm prisma migrate dev --name init
```

### ❌ Port 3000 đã được sử dụng

```bash
# Chạy trên port khác
PORT=3001 pnpm dev
```

---

## 📚 Tài Liệu Thêm

| File | Mô Tả |
|------|-------|
| [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) | Hướng dẫn chuyển MongoDB → SQL Server + Prisma |
| [SQL_SERVER_SETUP.md](SQL_SERVER_SETUP.md) | Cài đặt & cấu hình SQL Server |
| [DATABASE_ANALYSIS.md](DATABASE_ANALYSIS.md) | Phân tích cấu trúc database |
| [prisma/schema.prisma](prisma/schema.prisma) | Prisma Schema (models & relationships) |

---

## 📞 Hỗ Trợ

Nếu gặp vấn đề:

1. ✅ Kiểm tra [Troubleshooting](#-troubleshooting) ở trên
2. ✅ Xem các file hướng dẫn tương ứng
3. ✅ Kiểm tra logs trong terminal/browser console
4. ✅ Chạy TypeScript check: `pnpm tsc --noEmit`

---

## 📄 License

Dự án này là bài tập lập luận (Luận Văn) cho đại học.

---

**Happy Coding! 🚀**

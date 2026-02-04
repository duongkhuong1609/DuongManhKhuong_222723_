# 🚀 HƯỚNG DẪN CHUYỂN MONGODB → SQL SERVER + PRISMA

## ✅ HOÀN THÀNH BƯỚC 1-2:
- [x] Cài Prisma CLI
- [x] Cài @prisma/client
- [x] Tạo Prisma Schema cho SQL Server
- [x] Tạo Prisma Client helper
- [x] Tạo seed script
- [x] Cập nhật package.json

---

## 📋 BƯỚC TIẾP THEO: SETUP DATABASE

### BƯỚC 1: Cài SQL Server (Nếu chưa)

👉 **Xem chi tiết tại:** [SQL_SERVER_SETUP.md](SQL_SERVER_SETUP.md)

**Tóm tắt:**
```powershell
# 1. Download SQL Server Express
https://www.microsoft.com/en-us/sql-server/sql-server-downloads

# 2. Cài đặt (chọn SQLEXPRESS)

# 3. Kiểm tra kết nối
sqlcmd -S localhost\SQLEXPRESS -E -Q "SELECT @@VERSION"
```

---

### BƯỚC 2: Cập nhật DATABASE_URL

File: `.env.local`

**Option A: Windows Authentication (Khuyến khích)**
```env
DATABASE_URL="sqlserver://localhost\\SQLEXPRESS;database=university_schedule;integratedSecurity=true;encrypt=false;trustServerCertificate=true"
```

**Option B: SQL Authentication**
```env
DATABASE_URL="sqlserver://sa:YourPassword@localhost,1433;database=university_schedule;encrypt=false;trustServerCertificate=true"
```

---

### BƯỚC 3: Tạo Database

```bash
# Cách 1: Dùng PowerShell
sqlcmd -S localhost\SQLEXPRESS -E -Q "CREATE DATABASE university_schedule"

# Cách 2: Dùng Prisma (sẽ tạo tự động)
pnpm prisma migrate dev --name init
```

---

### BƯỚC 4: Chạy Migration

```bash
# Tạo schema (tables) từ prisma/schema.prisma
pnpm prisma migrate dev --name init
```

**Output mong đợi:**
```
✔ Generated Prisma Client (5.x.x) to ./lib/generated/prisma in 500ms

> Prisma Migrate running...

📄 Your database is now in sync with your Prisma schema
```

---

### BƯỚC 5: Seed Dữ Liệu

```bash
# Chạy script seed
pnpm prisma db seed
```

**Output mong đợi:**
```
🌱 Seeding database...
📚 Creating semesters...
👨‍🏫 Creating instructors...
🏫 Creating rooms...
📖 Creating courses...
⏰ Creating timeslots...
👥 Creating classes...
📅 Creating schedules...
✅ Seed completed successfully!
```

---

### BƯỚC 6: Verify Database

```bash
# Mở Prisma Studio (GUI)
pnpm prisma studio
```

Trình duyệt sẽ mở: **http://localhost:5555**

Kiểm tra:
- ✅ Semesters: 3+ records
- ✅ Instructors: 5+ records
- ✅ Rooms: 6+ records
- ✅ Courses: 6+ records
- ✅ Classes: 5+ records
- ✅ Schedules: 5+ records

---

## 🔄 CHUYỂN ĐỔI API ROUTES

Tôi sẽ chuyển từ Mongoose → Prisma cho tất cả API routes.

### Ví dụ: API Instructors

**TRƯỚC (MongoDB + Mongoose):**
```typescript
import Instructor from "@/lib/models/instructor"

export async function GET(request: NextRequest) {
  const instructors = await Instructor.find()
    .sort({ name: 1 })
  return NextResponse.json({ success: true, data: instructors })
}
```

**SAU (SQL Server + Prisma):**
```typescript
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const instructors = await prisma.instructor.findMany({
    orderBy: { name: 'asc' }
  })
  return NextResponse.json({ success: true, data: instructors })
}
```

---

## 📝 DANH SÁCH THAY ĐỔI CẦN LÀMS

### API Routes cần convert:
- [ ] `app/api/instructors/route.ts` - GET, POST
- [ ] `app/api/instructors/[id]/route.ts` - GET, PUT, DELETE
- [ ] `app/api/courses/route.ts`
- [ ] `app/api/rooms/route.ts`
- [ ] `app/api/classes/route.ts`
- [ ] `app/api/schedules/route.ts`
- [ ] `app/api/semesters/route.ts`
- [ ] `app/api/timeslots/route.ts`

### Components cần kiểm tra:
- [ ] `components/dashboard/instructors.tsx`
- [ ] `components/dashboard/courses.tsx`
- [ ] `components/dashboard/rooms.tsx`
- [ ] `components/dashboard/classes.tsx`
- [ ] `components/dashboard/schedules.tsx`

---

## 🛠️ QUICK COMMANDS

```bash
# Xem schema
cat prisma/schema.prisma

# Tạo migration
pnpm prisma migrate dev --name "migration name"

# Reset database (xóa tất cả)
pnpm prisma migrate reset

# Xem Prisma Studio
pnpm prisma studio

# Generate types
pnpm prisma generate

# Format schema
pnpm prisma format
```

---

## ⚡ CHUYÊN ĐỘ MIGRATION SETUP:

**COMPLETED:**
- ✅ Prisma CLI cài xong
- ✅ Prisma Schema tạo xong (7 models)
- ✅ Prisma Client helper tạo xong
- ✅ Seed script tạo xong
- ✅ package.json cập nhật xong

**REMAINING:**
- ⏳ Cài SQL Server local
- ⏳ Tạo database
- ⏳ Chạy migration
- ⏳ Seed dữ liệu
- ⏳ Convert API routes (Instructors, Courses, Rooms, etc.)
- ⏳ Test components

---

## 📞 SỰ CỐ & GIẢI PHÁP

### ❌ Lỗi: "Failed to connect to SQL Server"
```
Giải pháp:
1. Kiểm tra SQL Server chạy: services.msc
2. Kiểm tra DATABASE_URL đúng .env.local
3. Kiểm tra TCP/IP enabled trong SQL Server Configuration Manager
```

### ❌ Lỗi: "Database does not exist"
```
Giải pháp:
sqlcmd -S localhost\SQLEXPRESS -E -Q "CREATE DATABASE university_schedule"
```

### ❌ Lỗi: "Error running seed"
```
Giải pháp:
1. Xóa database: pnpm prisma migrate reset
2. Chạy lại: pnpm prisma migrate dev --name init
3. Seed: pnpm prisma db seed
```

---

## ✨ TIẾP THEO?

Hãy làm theo các bước:
1. **Cài SQL Server** (xem SQL_SERVER_SETUP.md)
2. **Chạy:** `pnpm prisma migrate dev --name init`
3. **Seed:** `pnpm prisma db seed`
4. **Verify:** `pnpm prisma studio`
5. **Báo cho tôi** để convert API routes & components

---

**Bạn đã sẵn sàng? Hãy cài SQL Server và báo khi xong! 🚀**

# 🗄️ HƯỚNG DẪN CÀI ĐẶT & CHẠY SQL SERVER LOCAL

## ⚠️ KIỂM TRA SQL SERVER ĐÃ CÀI CHƯA?

### Cách 1: Kiểm tra qua PowerShell
```powershell
Get-Service | Where-Object {$_.Name -like "*SQL*"} | Select-Object Name, Status
```

Nếu thấy `MSSQLSERVER` hoặc `MSSQL$SQLEXPRESS`, SQL Server đã cài rồi ✅

---

## 🔧 CÀI ĐẶT SQL SERVER (Nếu chưa cài)

### Windows - Cách 1: SQL Server Express (Miễn phí, Tối đa 10GB)
```
1. Download: https://www.microsoft.com/en-us/sql-server/sql-server-downloads
2. Chọn "SQL Server 2022 Express" hoặc "SQL Server 2019 Express"
3. Chạy installer
4. Chọn "Basic" installation
5. Chọn "SQLEXPRESS" làm instance name
6. SQL Server sẽ chạy tự động khi khởi động
```

### Windows - Cách 2: SQL Server Developer Edition (Đầy đủ, Miễn phí)
```
1. Download: https://www.microsoft.com/en-us/sql-server/sql-server-evaluations
2. Chọn "SQL Server 2022 Developer"
3. Chạy installer
4. Chọn "Express" hoặc "Standard"
5. Tạo instance "SQLEXPRESS" (optional)
```

### Windows - Cách 3: Docker
```powershell
# Chạy SQL Server 2019 trong Docker
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=YourPassword123" `
  -p 1433:1433 `
  --name sqlserver `
  mcr.microsoft.com/mssql/server:2019-latest

# Connection string:
# sqlserver://sa:YourPassword123@localhost,1433;database=university_schedule;encrypt=false;trustServerCertificate=true
```

---

## ✅ KIỂM TRA KẾT NỐI

### Cách 1: Dùng SQL Server Management Studio (SSMS)
```
1. Download: https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms
2. Cài SSMS
3. Chạy SSMS
4. Server name: localhost\SQLEXPRESS (hoặc .)
5. Authentication: Windows Authentication
6. Kết nối thành công ✅
```

### Cách 2: Dùng PowerShell
```powershell
# Test kết nối với Windows Auth
$conn = New-Object System.Data.SqlClient.SqlConnection
$conn.ConnectionString = "Server=localhost\SQLEXPRESS;Integrated Security=true"
$conn.Open()
Write-Host "✅ Kết nối thành công"
$conn.Close()
```

### Cách 3: Dùng sqlcmd
```powershell
# Kiểm tra SQL Server chạy
sqlcmd -S localhost\SQLEXPRESS -E -Q "SELECT @@VERSION"

# Nếu lỗi "not recognized", thêm vào PATH:
# C:\Program Files\Microsoft SQL Server\Client SDK\ODBC\170\Tools\Binn
```

---

## 📝 CẤU HÌNH CONNECTION STRING

### Option 1: Windows Authentication (Khuyến khích - An toàn)
```
DATABASE_URL="sqlserver://localhost\\SQLEXPRESS;database=university_schedule;integratedSecurity=true;encrypt=false;trustServerCertificate=true"
```

**Ưu điểm:**
- ✅ Không cần lưu password
- ✅ Bảo mật cao (dùng Windows user)
- ✅ Đơn giản
- ✅ Không cần tạo SQL login

---

### Option 2: SQL Authentication (Nếu cần)
```
DATABASE_URL="sqlserver://sa:YourPassword@localhost,1433;database=university_schedule;encrypt=false;trustServerCertificate=true"
```

**Tạo SQL Login (nếu dùng SA account mà quên password):**
```sql
-- Chạy trong SQL Server Management Studio
-- Bật SQL Authentication
USE [master]
GO
EXEC xp_instance_regwrite N'HKEY_LOCAL_MACHINE', N'Software\Microsoft\MSSQLServer\MSSQLServer', N'LoginMode', REG_DWORD, 2
GO

-- Restart SQL Server để apply
-- Sau đó dùng sa account với password do bạn set
```

---

## 🚀 CHẠY MIGRATION & SEED DỮ LIỆU

### Bước 1: Tạo database
```bash
# Tạo database "university_schedule"
sqlcmd -S localhost\SQLEXPRESS -E -Q "CREATE DATABASE university_schedule"
```

### Bước 2: Chạy migration
```bash
# Áp dụng schema từ prisma/schema.prisma
pnpm prisma migrate dev --name init
```

### Bước 3: Seed dữ liệu
```bash
# Chạy script seed
pnpm prisma db seed

# Hoặc chạy thủ công
node prisma/seed.js
```

### Bước 4: Verify database
```bash
# Xem Prisma Studio (GUI để quản lý dữ liệu)
pnpm prisma studio
```

---

## 📊 QUẢN LÝ DATABASE

### Xem dữ liệu trong SSMS
```sql
-- Xem danh sách instructors
SELECT TOP 10 * FROM [Instructor]

-- Đếm dữ liệu
SELECT COUNT(*) as TotalInstructors FROM [Instructor]

-- Xem schedules
SELECT TOP 20 * FROM [Schedule]
```

### Xóa database (Nếu cần reset)
```sql
ALTER DATABASE university_schedule SET SINGLE_USER WITH ROLLBACK IMMEDIATE
DROP DATABASE university_schedule
```

### Backup database
```sql
BACKUP DATABASE university_schedule 
TO DISK = 'C:\Backups\university_schedule.bak'
```

---

## ⚡ TROUBLESHOOTING

### ❌ Lỗi: "Cannot open user default database"
```
Giải pháp: 
1. Restart SQL Server
2. Chạy: pnpm prisma migrate dev --name init
```

### ❌ Lỗi: "Named instance not found"
```
Giải pháp:
1. Kiểm tra instance name: sqlcmd -L
2. Cập nhật .env.local với tên instance đúng
3. Restart SQL Server
```

### ❌ Lỗi: "Login failed for user 'sa'"
```
Giải pháp:
1. Reset SA password:
   - Chạy SSMS dưới quyền admin
   - Properties → Security → SA Account
   - Đặt lại password
2. Cập nhật .env.local
```

### ❌ Lỗi: "Connection timeout"
```
Giải pháp:
1. Kiểm tra SQL Server đang chạy: services.msc
2. Bật TCP/IP protocol:
   - SQL Server Configuration Manager
   - SQL Server Network Configuration
   - Protocols for SQLEXPRESS
   - Enable TCP/IP
3. Restart SQL Server
```

---

## 📋 CHECKLIST

- [ ] Cài SQL Server (Express hoặc Developer)
- [ ] Kiểm tra SQL Server đang chạy (services.msc)
- [ ] Cài SSMS (tùy chọn, nhưng khuyến khích)
- [ ] Kiểm tra kết nối: `sqlcmd -S localhost\SQLEXPRESS -E -Q "SELECT @@VERSION"`
- [ ] Cập nhật .env.local với DATABASE_URL
- [ ] Tạo database: `sqlcmd -S localhost\SQLEXPRESS -E -Q "CREATE DATABASE university_schedule"`
- [ ] Chạy migration: `pnpm prisma migrate dev --name init`
- [ ] Seed dữ liệu: `pnpm prisma db seed`
- [ ] Verify: `pnpm prisma studio`

---

## 🔗 THAM KHẢO

- 📚 SQL Server Download: https://www.microsoft.com/sql-server
- 📚 SSMS Download: https://docs.microsoft.com/en-us/sql/ssms
- 📚 Prisma SQL Server: https://www.prisma.io/docs/orm/overview/databases/sql-server
- 📚 Connection Strings: https://www.connectionstrings.com/sql-server

---

**✅ Sau khi cài xong, quay lại step tiếp theo để chuyển code từ MongoDB → Prisma!**

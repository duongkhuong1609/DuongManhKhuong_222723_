

## Tổng Quan Hệ Thống

Hệ thống này là nền tảng quản lý lịch học tập trung, được thiết kế để:

- **Quản lý dữ liệu tập trung**: Lưu trữ thông tin giảng viên, phòng học, môn học, và lịch dạy
- **Cung cấp API đầy đủ**: Cho phép các thuật toán bên ngoài (bao gồm thuật toán tiến hóa) truy cập và xử lý dữ liệu
- **Hỗ trợ tối ưu hóa**: Lịch học có thể được tối ưu hóa bằng các thuật toán tiến hóa để tìm giải pháp tốt nhất

---

## Cơ Sở Dữ Liệu Trực Quan

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

## Khả Năng Tương Thích Thuật Toán Tiến Hóa

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
- Không có xung đột thời gian
- Không vượt giờ dạy tối đa của giảng viên
- Sứ dụng phòng phù hợp với sức chứa lớp
- Tôn trọng sở thích dạy của giảng viên

### 4. **API Hỗ Trợ**
- `GET /api/classes` - Lấy danh sách lớp cần xếp lịch
- `GET /api/instructors` - Lấy thông tin giảng viên (giờ max, sở thích)
- `GET /api/rooms` - Lấy danh sách phòng với sức chứa
- `GET /api/timeslots` - Lấy danh sách tiết học
- `GET /api/schedules` - Lấy lịch hiện tại
- `POST /api/schedules` - Lưu lịch được tối ưu
...


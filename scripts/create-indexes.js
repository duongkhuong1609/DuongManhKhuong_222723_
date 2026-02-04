// MongoDB Indexes Configuration
// File: scripts/create-indexes.js
// Run with: mongosh < scripts/create-indexes.js

const db = db.getSiblingDB("university_schedule");

console.log("🔄 Creating indexes for University Schedule Database...\n");

// ============================================
// SEMESTERS Indexes
// ============================================
console.log("📚 Creating Semester indexes...");
db.semesters.createIndex({ code: 1 }, { unique: true });
db.semesters.createIndex({ academicYear: 1 });
db.semesters.createIndex({ isActive: 1, isCurrent: 1 });
db.semesters.createIndex({ status: 1 });
console.log("✅ Semester indexes created\n");

// ============================================
// INSTRUCTORS Indexes
// ============================================
console.log("👨‍🏫 Creating Instructor indexes...");
db.instructors.createIndex({ code: 1 }, { unique: true });
db.instructors.createIndex({ email: 1 }, { unique: true });
db.instructors.createIndex({ department: 1 });
db.instructors.createIndex({ status: 1 });
db.instructors.createIndex({ department: 1, status: 1 });
db.instructors.createIndex({ maxHoursPerWeek: 1 });
db.instructors.createIndex({ name: "text" }); // Text search
console.log("✅ Instructor indexes created\n");

// ============================================
// ROOMS Indexes
// ============================================
console.log("🏫 Creating Room indexes...");
db.rooms.createIndex({ code: 1 }, { unique: true });
db.rooms.createIndex({ building: 1 });
db.rooms.createIndex({ type: 1 });
db.rooms.createIndex({ status: 1 });
db.rooms.createIndex({ capacity: 1 });
db.rooms.createIndex({ building: 1, floor: 1 });
db.rooms.createIndex({ type: 1, capacity: 1 });
console.log("✅ Room indexes created\n");

// ============================================
// COURSES Indexes
// ============================================
console.log("📖 Creating Course indexes...");
db.courses.createIndex({ code: 1 }, { unique: true });
db.courses.createIndex({ department: 1 });
db.courses.createIndex({ status: 1 });
db.courses.createIndex({ department: 1, status: 1 });
db.courses.createIndex({ name: "text" }); // Text search
console.log("✅ Course indexes created\n");

// ============================================
// TIMESLOTS Indexes
// ============================================
console.log("⏰ Creating Timeslot indexes...");
db.timeslots.createIndex({ code: 1 }, { unique: true });
db.timeslots.createIndex({ period: 1 });
db.timeslots.createIndex({ order: 1 });
db.timeslots.createIndex({ status: 1 });
db.timeslots.createIndex({ period: 1, order: 1 });
console.log("✅ Timeslot indexes created\n");

// ============================================
// CLASSES Indexes
// ============================================
console.log("👥 Creating Class indexes...");
db.classes.createIndex({ code: 1 }, { unique: true });
db.classes.createIndex({ course: 1 });
db.classes.createIndex({ instructor: 1 });
db.classes.createIndex({ semester: 1 });
db.classes.createIndex({ academicYear: 1 });
db.classes.createIndex({ status: 1 });
db.classes.createIndex({ semester: 1, academicYear: 1 });
db.classes.createIndex({ instructor: 1, semester: 1 });
db.classes.createIndex({ course: 1, semester: 1 });
console.log("✅ Class indexes created\n");

// ============================================
// SCHEDULES Indexes (Most Important)
// ============================================
console.log("📅 Creating Schedule indexes...");
db.schedules.createIndex({ class: 1 });
db.schedules.createIndex({ room: 1 });
db.schedules.createIndex({ timeslot: 1 });
db.schedules.createIndex({ semester: 1 });
db.schedules.createIndex({ academicYear: 1 });
db.schedules.createIndex({ dayOfWeek: 1 });
db.schedules.createIndex({ status: 1 });

// Compound indexes for common queries
db.schedules.createIndex({ class: 1, semester: 1 });
db.schedules.createIndex({ room: 1, dayOfWeek: 1 });
db.schedules.createIndex({ room: 1, dayOfWeek: 1, timeslot: 1 }); // Conflict check
db.schedules.createIndex({ semester: 1, status: 1 });
db.schedules.createIndex({ dayOfWeek: 1, timeslot: 1 });
db.schedules.createIndex({ weekStart: 1, weekEnd: 1 }); // Date range queries

// Indexes for conflict detection
db.schedules.createIndex({ room: 1, "weekStart": 1, "weekEnd": 1 });
db.schedules.createIndex({ timeslot: 1, dayOfWeek: 1, semester: 1 });

console.log("✅ Schedule indexes created\n");

// ============================================
// VERIFY ALL INDEXES
// ============================================
console.log("✨ Index Summary:\n");
console.log("Semesters:", db.semesters.getIndexes().length - 1, "indexes");
console.log("Instructors:", db.instructors.getIndexes().length - 1, "indexes");
console.log("Rooms:", db.rooms.getIndexes().length - 1, "indexes");
console.log("Courses:", db.courses.getIndexes().length - 1, "indexes");
console.log("Timeslots:", db.timeslots.getIndexes().length - 1, "indexes");
console.log("Classes:", db.classes.getIndexes().length - 1, "indexes");
console.log("Schedules:", db.schedules.getIndexes().length - 1, "indexes");

console.log("\n✅ All indexes created successfully!");
console.log("📊 Total collections indexed: 7");

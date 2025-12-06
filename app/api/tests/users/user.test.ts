import { createStudent, createTeacher, getStats, getTeachers } from "../../users/admin";
import { authHandler } from "../../users/auth-handler"

describe("GET /api/users/login", () => {
  it("should get blessing, authenticating", async () => {
    const credentials = {
      email: "blessing@gmail.com",
      password: "password123"
    }
    const res = await authHandler(credentials)
    console.log(res)
    expect(res).not.toBe(null);
  }, 10000);
});
describe(" users/admin", () => {
  it("should create a new student and studentProfile", async () => {
    const param = {
      firstName: "saphire",
      lastName: "Ebele",
      email: "saphire@gmail.com",
      password: "indomie123",
      role: "student",
      admissionNumber: "54321"
    }
    const res = await createStudent(param)
    console.log(res)
    expect(res).not.toBe(null);
  }, 10000)
})
describe(" users/admin", () => {
  it("should get all the stats (no of teachers, students, classes, subjects)", async () => {
    
    const stats = await getStats()
    console.log(stats)
    expect(stats.students).toBe(1);
  }, 10000)
})

describe(" users/admin", () => {
  it("should create a new teacher and teacherProfile", async () => {
    const param = {
      firstName: "chioma",
      lastName: "jane",
      name: "chioma jane",
      email: "chiomajane@gmail.com",
      password: "indomie123",
      role: "teacher",
      staffId: "54321"
    }
    const res = await createTeacher(param)
    console.log(res)
    expect(res).not.toBe(null);
  }, 10000)
})

describe(" users/admin", () => {
  it("should get all the teachers in the school", async () => {
    
    const result = await getTeachers()
    console.log(result)
    // expect(result).toBe();
  }, 10000)
})

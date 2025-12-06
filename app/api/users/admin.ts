"use server"
import { connectDB } from "@/db/connect";
import { StudentSchema } from "@/db/models/profile/student"
import { TeacherSchema } from "@/db/models/profile/teacher"
import { ClassSchema } from "@/db/models/class";
import { SubjectSchema } from "@/db/models/subject"
import { StudentProfile } from "@/db/types/student_profile";
import mongoose from "mongoose";
import { UserProp } from "@/db/types/user";
import { AddUser, DeleteUser } from "./auth-handler"
import { TeacherProfile } from "@/db/types/teacher_profile";

const student = mongoose.models.Student || mongoose.model("Student", StudentSchema)
const teacher = mongoose.models.Teacher || mongoose.model("Teacher", TeacherSchema)
const classRoom = mongoose.models.Class || mongoose.model("Class", ClassSchema)
const subject = mongoose.models.Subject || mongoose.model("Subject", SubjectSchema)

//STUDENTS
//create student
async function createStudent( { firstName, lastName, email, password, role, admissionNumber, classId} : UserProp & StudentProfile) {
    await connectDB();
    const user = await AddUser(
        {
            firstName,
            lastName,
            email,
            password,
            role
        }
    )
    const profile = await student.create(
        {
        admissionNumber,
        classId
        }
    )
    profile && (user.studentProfile = profile._id)
    await user.save()

    return {user, profile}
}
//edit student
async function editStudent(updatedObj: StudentProfile, admissionNumber: string) {
    await connectDB();

    const filterObj = {admissionNumber: admissionNumber}
    const usr = await student.updateOne(filterObj, updatedObj)
    return usr.upsertedId;
}
//view student list
async function getStudents(classId : mongoose.Schema.Types.ObjectId) {
    await connectDB();

    const usrs = await student.find({classId: classId})
    return usrs
}

//TEACHERS
//create teacher
async function createTeacher( { firstName, lastName, email, password, role, name, staffId, assignedClass, assignedSubjects} : UserProp & TeacherProfile) {
    await connectDB();
    const user = await AddUser(
        {
            firstName,
            lastName,
            email,
            password,
            role
        }
    )
    const profile = await teacher.create(
        {
        name,
        email,
        assignedSubjects,
        assignedClass,
        staffId
        }
    )
    profile && (user.teacherProfile = profile._id)
    user && (profile.staffId = user._id)
    await user.save()
    await profile.save()

    return JSON.parse(JSON.stringify({user, profile}))
}
//edit teacher
//edit student
async function editTeacher() {
    await connectDB();

    const filterObj = {}
    //check out for any thing changed, does it exist in user and profile?
    const usr = await student.updateOne({},{},{})
    return usr.upsertedId;
}

//view all teachers
async function deleteTeacher(id: string, user_id: string) {
    await connectDB();

    const delProf = await teacher.findByIdAndDelete(id)
    const delUser = await DeleteUser(user_id!)
    return JSON.parse(JSON.stringify({delProf, delUser}))
}
//view all teachers
async function getTeachers() {
    await connectDB();

    const usrs = await teacher.find()
    return JSON.parse(JSON.stringify(usrs))
}

//get all the stats i.e. no of teachers, students, classes, subjects
async function getStats() {
    await connectDB();

    const stats : {teachers? : number, students? : number, classes? : number, subjects? : number} = {}
    stats.students = await student.countDocuments()
    stats.teachers = await teacher.estimatedDocumentCount()
    stats.classes = await classRoom.countDocuments()
    stats.subjects = await subject.countDocuments()

    return stats
}

export {createStudent, editStudent, getStudents, createTeacher, editTeacher,  deleteTeacher,  getTeachers, getStats}
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
async function createStudent( { name, classLevel, gender, dob, guardianName, guardianPhone, firstName, lastName, email, password, role, admissionNo, classId} : UserProp & StudentProfile) {
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
            name,
            email,
            classLevel,
            gender,
            dob,
            guardianName,
            guardianPhone,
            admissionNo,
            classId
        }
    )
    profile && (user.studentProfile = profile._id)
    user && (profile.userId = user._id)
    await user.save()
    await profile.save()

    return JSON.parse(JSON.stringify({user, profile}))
}
//edit student
async function editStudent(updatedObj: StudentProfile, admissionNo: string) {
    await connectDB();

    const filterObj = {admissionNo}
    const usr = await student.updateOne(filterObj, updatedObj)
    return usr.upsertedId;
}
//view student list
async function getStudents() {
    await connectDB();

    const usrs = await student.find()
    return JSON.parse(JSON.stringify(usrs))
}
//delete student
async function deleteStudent(id: string, user_id: string) {
    await connectDB();

    const delProf = await student.findByIdAndDelete(id)
    const delUser = await DeleteUser(user_id!)
    return JSON.parse(JSON.stringify({delProf, delUser}))
}

//TEACHERS
//create teacher
async function createTeacher( { firstName, lastName, email, password, role, name, assignedClass, assignedSubjects} : UserProp & TeacherProfile) {
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
        assignedClass
        }
    )
    profile && (user.teacherProfile = profile._id)
    user && (profile.staffId = user._id)
    await user.save()
    await profile.save()

    return JSON.parse(JSON.stringify({user, profile}))
}
//edit teacher
async function editTeacher() {
    await connectDB();

    const filterObj = {}
    //check out for any thing changed, does it exist in user and profile?
    const usr = await student.updateOne({},{},{})
    return usr.upsertedId;
}

//delete teachers
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

//CLASSES
//create a class
async function createClass({ className, classTeacher, subjects} : {className: string, classTeacher: string, subjects: string}) {
    await connectDB();

    const subs = subjects.split(" ");
    const cl = await classRoom.create(
        {
            name: className,
            teacher: classTeacher,
            subjects: subs
        }
    )
    await cl.save()
    return JSON.stringify(cl)
}
//view all classes
async function getClasses() {
    await connectDB();

    const classes = await classRoom.find()
    return JSON.parse(JSON.stringify(classes))
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

export {createStudent, editStudent, getStudents, deleteStudent, createTeacher, editTeacher,  deleteTeacher,  getTeachers, createClass, getClasses, getStats}
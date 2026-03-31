/* eslint-disable @typescript-eslint/no-explicit-any */
import {connectDB} from "@/db/connect"
import mongoose from "mongoose"
import { UserSchema } from "@/db/models/user"
import { compare, hashPassword} from "@/lib/authenticate/password"
import { UserProp } from "@/db/types/user"

export const user = mongoose.models.User || mongoose.model("User", UserSchema)
//custom conn was used so as to factor in cases when .env variables might be loaded
//using dotenv.config() i.e. in a script or test

export async function authHandler(params : {email: string, password: string}, customConn: () => Promise<any> = connectDB) {
 await customConn();
    const authUser = await user.findOne({email: params.email})
    console.log(authUser)
    const match = await compare(params.password, authUser.password)
    if (match)
        return authUser
    return null
}
export async function getUser(email : string, customConn: () => Promise<any> = connectDB) {
 await customConn();
    const usr = await user.findOne({email: email})
    return usr ?? null
}
export async function AddUser(param : UserProp, customConn: () => Promise<any> = connectDB) {
 await customConn();
 const usr = user.create({...param, password: await hashPassword(param.password)})
 return usr
}
export async function DeleteUser(id: string, customConn: () => Promise<any> = connectDB) {
 await customConn();
 const usr = await user.findByIdAndDelete(id)
 return usr
}
export async function editUser(role : string, identifier : string, updatedObj : any) {
    await connectDB();
    //we would create a dynamic obj based on admin decides to edit
    const updatedField : {
    firstName?: string
    lastName?: string
    email?: string
    password?: string
    role?: string
    classId?: string
    } = updatedObj;
    const filterObj : {staffId? : string, admissionNumber? : string} = {}
    switch (role) {
        case "admin":
            break;
        case "teacher":
            filterObj.staffId = identifier 
            break;
        case "student":
            filterObj.admissionNumber = identifier
            break;
        default:
            break;
    }
    const usr = await user.updateOne(filterObj, updatedField)
    return usr.upsertedId
}
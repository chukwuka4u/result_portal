import {connectDB} from "@/db/connect"
import mongoose from "mongoose"
import { UserSchema } from "@/db/models/user"
import { compare, hashPassword} from "@/lib/authenticate/password"

type UserProp = {
    firstName: string
    lastName: string
    email: string
    password: string
    role: string
    admissionNumber?: string
    classId?: string
    staffId?: string
}

const user = mongoose.models.User || mongoose.model("User", UserSchema)
//custom conn was used so as to factor in cases when .env variables might be loaded
//using dotenv.config() i.e. in a script or test

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function authHandler(params : {email: string, password: string}, customConn: () => Promise<any> = connectDB) {
 await customConn();
    const authUser = await user.findOne({email: params.email})
    console.log(authUser)
    const match = await compare(params.password, authUser.password)
    if (match)
        return authUser
    return null
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getUser(email : string, customConn: () => Promise<any> = connectDB) {
 await customConn();
    const usr = await user.findOne({email: email})
    return usr ?? null
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function AddUser(param : UserProp, customConn: () => Promise<any> = connectDB) {
 await customConn();
 const usr = user.create({...param, password: await hashPassword(param.password)})
 return usr
}
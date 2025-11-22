import {connectDB} from "@/db/connect"
import mongoose from "mongoose"
import { UserSchema } from "@/db/models/user"
import { hashPassword, compare} from "@/lib/authenticate/password"

const user = mongoose.models.User || mongoose.model("User", UserSchema)

export async function authHandler(params : {email: string, password: string}) {
    await connectDB();
    const authUser = await user.findOne({email: params.email})
    console.log(authUser)
    const match = await compare(params.password, authUser.password)
    if (match)
        return authUser
    return null
}
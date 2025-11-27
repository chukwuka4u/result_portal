"use client"
import {useSession} from "next-auth/react"
const Student = () => {
    const { data: session } = useSession()
    return(
        <div>
        <div>THIS IS THE ADMIN PAGE</div>
        <div>email : {session?.user?.email}</div>
        </div>
    )
}
export default Student;
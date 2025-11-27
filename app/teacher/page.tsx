"use client"
import {useSession} from "next-auth/react"
const Teacher = () => {
    const { data: session } = useSession()
    return(
        <>
        <div>THIS IS THE TEACHER PAGE</div>
        <div>{session?.user?.email}</div>
        </>
    )
}
export default Teacher;
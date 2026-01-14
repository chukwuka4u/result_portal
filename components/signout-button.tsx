"use client"
import { signOut } from "next-auth/react"
import Image from "next/image"
export const SignOutButton = () => {
    return(
        <button
          onClick={() => signOut({redirect: true})}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Log out
          </button>
    )
}
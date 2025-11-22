import { hashPassword, compare } from "@/lib/authenticate/password";

const password = "password123"

test("hashing a password works?", async () => {
    const hshpsd = await hashPassword(password)
    console.log(hshpsd)
    expect(hshpsd).not.toBe('')
})
test("comparing passwords work?", async () => {
    const match = await compare(password, "$2b$11$8q7osNtcPylPL1gEtyQX.eJp27ylGJSPWsRbEsl4zESAwiXkXgNAi")
    console.log(match)
    expect(match).toBe(true)
})
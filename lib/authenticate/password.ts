import bcrypt from "bcrypt";

const SALT=11

export async function hashPassword(password : string) : Promise<string> {
    const hashedPassword = await bcrypt.hash(password, SALT)
    return hashedPassword;
}

export async function compare(password : string, hash : string) : Promise<boolean> {
   const same = await bcrypt.compare(password, hash)
    return same;
}
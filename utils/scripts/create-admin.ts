import dotenv from 'dotenv';
dotenv.config({ path: ['.env.local', '.env'] });

import { AddUser, getUser } from "../../app/api/users/auth-handler";
import { connectDB } from '@/db/connect';


const mongoUri = process.env.MONGO_URI!

async function createAdmin() {
  try {
    const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_FIRST_NAME, ADMIN_LAST_NAME } = process.env;

    if (!ADMIN_EMAIL) throw new Error("Missing ADMIN_EMAIL");
    if (!ADMIN_PASSWORD) throw new Error("Missing ADMIN_PASSWORD");
    if (!ADMIN_FIRST_NAME) throw new Error("Missing ADMIN_PASSWORD");
    if (!ADMIN_LAST_NAME) throw new Error("Missing ADMIN_PASSWORD");


    const existingAdmin = await getUser(ADMIN_EMAIL)
    if (existingAdmin) {
        console.log("Admin already exists:", ADMIN_EMAIL);
        process.exit(0);
    }

    const admin = await AddUser({
        firstName: ADMIN_FIRST_NAME,
        lastName: ADMIN_LAST_NAME,
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        role: "admin",
    }, () => connectDB(mongoUri))

    admin && console.log("Admin created successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error creating admin:", err);
    process.exit(1);
  }
}

createAdmin();
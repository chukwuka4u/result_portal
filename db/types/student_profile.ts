export type StudentProfile = {
    name: string
    email: string 
    classLevel: string 
    gender: "Male" | "Female"

    dob: string
    guardianName?: string 
    guardianPhone?: string
    
    admissionNo?: string
    classId?: string

    userId?: string
}
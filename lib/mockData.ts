export interface Teacher {
  _id: string;
  name: string;
  email: string;
  assignedSubjects: string[];
  assignedClass?: string;

  staffId?: string;
}

export interface Student {
  _id: string;
  name: string;
  classLevel: string;
  gender: 'Male' | 'Female';
  dob: string;
  admissionNo: string;
  guardianName: string;
  guardianPhone: string;

  userId?: string;
}

export interface Class {
  _id: string;
  className: string;
  classTeacher: string;
  subjects: string[];
}

export interface Subject {
  id: string;
  subjectName: string;
  subjectCode: string;
}

export interface Result {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  className: string;
  subjectId: string;
  subjectName: string;
  term: string;
  session: string;
  ca1: number;
  ca2: number;
  exam: number;
  total: number;
  grade: string;
  remarks: string;
}

export const mockTeachers: Teacher[] = [
  { _id: 't1', name: 'John Teacher', email: 'teacher@school.com', assignedSubjects: ['Mathematics', 'Physics'], assignedClass: 'SS3' },
  { _id: 't2', name: 'Mary Johnson', email: 'mary@school.com', assignedSubjects: ['English', 'Literature'], assignedClass: 'SS2' },
  { _id: 't3', name: 'David Wilson', email: 'david@school.com', assignedSubjects: ['Chemistry', 'Biology'], assignedClass: 'SS1' },
];

export const mockStudents: Student[] = [
  { _id: 's1', name: 'Jane Student', classLevel: 'SS3', gender: 'Female', dob: '2008-05-12', admissionNo: 'ADM001', guardianName: 'Mr. Student', guardianPhone: '08012345678' },
  { _id: 's2', name: 'Michael Brown', classLevel: 'SS3', gender: 'Male', dob: '2007-09-23', admissionNo: 'ADM002', guardianName: 'Mrs. Brown', guardianPhone: '08098765432' },
  { _id: 's3', name: 'Sarah Davis', classLevel: 'SS2', gender: 'Female', dob: '2008-03-15', admissionNo: 'ADM003', guardianName: 'Mr. Davis', guardianPhone: '08011122233' },
  { _id: 's4', name: 'Chris Wilson', classLevel: 'SS1', gender: 'Male', dob: '2009-11-30', admissionNo: 'ADM004', guardianName: 'Mrs. Wilson', guardianPhone: '08033344455' },
];

export const mockClasses: Class[] = [
  { _id: 'c1', className: 'SS3', classTeacher: 'John Teacher', subjects: ['Mathematics', 'Physics', 'Chemistry', 'English'] },
  { _id: 'c2', className: 'SS2', classTeacher: 'Mary Johnson', subjects: ['English', 'Literature', 'Biology', 'Chemistry'] },
  { _id: 'c3', className: 'SS1', classTeacher: 'David Wilson', subjects: ['Mathematics', 'Chemistry', 'Biology', 'English'] },
  { _id: 'c4', className: 'JS3', classTeacher: 'John Teacher', subjects: ['Mathematics', 'Physics', 'Chemistry', 'English'] },
  { _id: 'c5', className: 'JS2', classTeacher: 'Mary Johnson', subjects: ['English', 'Literature', 'Biology', 'Chemistry'] },
  { _id: 'c6', className: 'JS1', classTeacher: 'David Wilson', subjects: ['Mathematics', 'Chemistry', 'Biology', 'English'] },
];

export const mockSubjects: Subject[] = [
  { id: 'sub1', subjectName: 'Mathematics', subjectCode: 'MTH101' },
  { id: 'sub2', subjectName: 'Physics', subjectCode: 'PHY101' },
  { id: 'sub3', subjectName: 'Chemistry', subjectCode: 'CHM101' },
  { id: 'sub4', subjectName: 'Biology', subjectCode: 'BIO101' },
  { id: 'sub5', subjectName: 'English', subjectCode: 'ENG101' },
  { id: 'sub6', subjectName: 'Literature', subjectCode: 'LIT101' },
];

export const mockResults: Result[] = [
  { 
    id: 'r1', 
    studentId: 's1', 
    studentName: 'Jane Student',
    classId: 'c1', 
    className: 'SS3',
    subjectId: 'sub1', 
    subjectName: 'Mathematics',
    term: 'First Term', 
    session: '2023/2024', 
    ca1: 15, 
    ca2: 18, 
    exam: 62, 
    total: 95, 
    grade: 'A', 
    remarks: 'Excellent' 
  },
  { 
    id: 'r2', 
    studentId: 's1', 
    studentName: 'Jane Student',
    classId: 'c1', 
    className: 'SS3',
    subjectId: 'sub2', 
    subjectName: 'Physics',
    term: 'First Term', 
    session: '2023/2024', 
    ca1: 14, 
    ca2: 16, 
    exam: 58, 
    total: 88, 
    grade: 'A', 
    remarks: 'Excellent' 
  },
  { 
    id: 'r3', 
    studentId: 's1', 
    studentName: 'Jane Student',
    classId: 'c1', 
    className: 'SS3',
    subjectId: 'sub3', 
    subjectName: 'Chemistry',
    term: 'First Term', 
    session: '2023/2024', 
    ca1: 13, 
    ca2: 15, 
    exam: 54, 
    total: 82, 
    grade: 'A', 
    remarks: 'Very Good' 
  },
];

export const computeGrade = (total: number): string => {
  if (total >= 90) return 'A';
  if (total >= 80) return 'B';
  if (total >= 70) return 'C';
  if (total >= 60) return 'D';
  if (total >= 50) return 'E';
  return 'F';
};

export const computeRemarks = (grade: string): string => {
  switch (grade) {
    case 'A': return 'Excellent';
    case 'B': return 'Very Good';
    case 'C': return 'Good';
    case 'D': return 'Fair';
    case 'E': return 'Pass';
    case 'F': return 'Fail';
    default: return '';
  }
};

"use client"
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockStudents, mockSubjects, computeGrade, computeRemarks } from '@/lib/mockData';
import { toast } from 'sonner';

const UploadResults = () => {
  const [formData, setFormData] = useState({
    studentId: '',
    subjectId: '',
    term: 'First Term',
    session: '2023/2024',
    ca1: '',
    ca2: '',
    exam: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ca1 = Number(formData.ca1);
    const ca2 = Number(formData.ca2);
    const exam = Number(formData.exam);
    const total = ca1 + ca2 + exam;
    const grade = computeGrade(total);
    const remarks = computeRemarks(grade);

    toast.success(`Result uploaded: Total = ${total}, Grade = ${grade}, Remarks = ${remarks}`);
    setFormData({ studentId: '', subjectId: '', term: 'First Term', session: '2023/2024', ca1: '', ca2: '', exam: '' });
  };

  const ss3Students = mockStudents.filter(s => s.classLevel === 'SS3');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Upload Results</h1>
        <p className="text-muted-foreground">Enter student assessment scores</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Result Entry Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="student">Student</Label>
                <Select value={formData.studentId} onValueChange={(value) => setFormData({ ...formData, studentId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    {ss3Students.map((student) => (
                      <SelectItem key={student._id} value={student._id}>{student.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select value={formData.subjectId} onValueChange={(value) => setFormData({ ...formData, subjectId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockSubjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>{subject.subjectName}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="term">Term</Label>
                <Select value={formData.term} onValueChange={(value) => setFormData({ ...formData, term: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="First Term">First Term</SelectItem>
                    <SelectItem value="Second Term">Second Term</SelectItem>
                    <SelectItem value="Third Term">Third Term</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="session">Session</Label>
                <Input
                  id="session"
                  value={formData.session}
                  onChange={(e) => setFormData({ ...formData, session: e.target.value })}
                  placeholder="2023/2024"
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="ca1">CA1 (Max 20)</Label>
                <Input
                  id="ca1"
                  type="number"
                  min="0"
                  max="20"
                  value={formData.ca1}
                  onChange={(e) => setFormData({ ...formData, ca1: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ca2">CA2 (Max 20)</Label>
                <Input
                  id="ca2"
                  type="number"
                  min="0"
                  max="20"
                  value={formData.ca2}
                  onChange={(e) => setFormData({ ...formData, ca2: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="exam">Exam (Max 60)</Label>
                <Input
                  id="exam"
                  type="number"
                  min="0"
                  max="60"
                  value={formData.exam}
                  onChange={(e) => setFormData({ ...formData, exam: e.target.value })}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full">Upload Result</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadResults;

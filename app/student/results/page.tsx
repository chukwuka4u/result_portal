"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockResults, mockStudents } from '@/lib/mockData';
import { FileText, Download } from 'lucide-react';
import { toast } from 'sonner';

const StudentResults = () => {
  const student = mockStudents[0]; // Using first student as logged-in user
  const studentResults = mockResults.filter(r => r.studentId === student._id);

  const handleDownloadPDF = () => {
    toast.success('PDF download would start here (mock functionality)');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Results</h1>
          <p className="text-muted-foreground">View your academic performance</p>
        </div>
        <Button onClick={handleDownloadPDF}>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {student.name} - {student.classLevel}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Term</TableHead>
                <TableHead>Session</TableHead>
                <TableHead>CA1</TableHead>
                <TableHead>CA2</TableHead>
                <TableHead>Exam</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Remarks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentResults.map((result) => (
                <TableRow key={result.id}>
                  <TableCell className="font-medium">{result.subjectName}</TableCell>
                  <TableCell>{result.term}</TableCell>
                  <TableCell>{result.session}</TableCell>
                  <TableCell>{result.ca1}</TableCell>
                  <TableCell>{result.ca2}</TableCell>
                  <TableCell>{result.exam}</TableCell>
                  <TableCell className="font-bold">{result.total}</TableCell>
                  <TableCell>
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${
                      result.grade === 'A' ? 'bg-green-100 text-green-800' :
                      result.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                      result.grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {result.grade}
                    </span>
                  </TableCell>
                  <TableCell>{result.remarks}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {studentResults.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">
              No results available yet
            </div>
          )}
        </CardContent>
      </Card>

      {studentResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm text-muted-foreground">Total Subjects</p>
                <p className="text-2xl font-bold">{studentResults.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Average Score</p>
                <p className="text-2xl font-bold">
                  {(studentResults.reduce((acc, r) => acc + r.total, 0) / studentResults.length).toFixed(1)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Overall Grade</p>
                <p className="text-2xl font-bold">A</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudentResults;

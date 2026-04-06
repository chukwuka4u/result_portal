import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockResults } from '@/lib/mockData';
import { FileText } from 'lucide-react';

const Results = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Results Management</h1>
        <p className="text-muted-foreground">View all student results</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            All Results ({mockResults.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Term</TableHead>
                <TableHead>CA1</TableHead>
                <TableHead>CA2</TableHead>
                <TableHead>Exam</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Remarks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockResults.map((result) => (
                <TableRow key={result.id}>
                  <TableCell className="font-medium">{result.studentName}</TableCell>
                  <TableCell>{result.className}</TableCell>
                  <TableCell>{result.subjectName}</TableCell>
                  <TableCell>{result.term}</TableCell>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Results;

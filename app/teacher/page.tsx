import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, School, BookOpen } from 'lucide-react';
import { mockTeachers } from '@/lib/mockData';

const TeacherDashboard = () => {
  const teacher = mockTeachers[0]; // Using first teacher as logged-in user

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {teacher.name}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Class</CardTitle>
            <School className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teacher.assignedClass}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subjects</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teacher.assignedSubjects.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Results Uploaded</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Subjects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {teacher.assignedSubjects.map((subject, idx) => (
                <div key={idx} className="flex items-center gap-2 rounded-lg border p-3">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span className="font-medium">{subject}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">• Upload student results</p>
            <p className="text-sm text-muted-foreground">• View class performance</p>
            <p className="text-sm text-muted-foreground">• Generate subject reports</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, GraduationCap, School, BookOpen } from 'lucide-react';
import { mockTeachers, mockStudents, mockClasses, mockSubjects } from '@/lib/mockData';
import { getStats } from '../api/users/admin';

const AdminPage = async () => {
	const statistics = await getStats()
  const stats = [
    { title: 'Total Teachers', value: statistics.teachers, icon: Users, color: 'text-blue-600' },
    { title: 'Total Students', value: statistics.students, icon: GraduationCap, color: 'text-green-600' },
    { title: 'Total Classes', value: statistics.classes, icon: School, color: 'text-purple-600' },
    { title: 'Total Subjects', value: statistics.subjects, icon: BookOpen, color: 'text-orange-600' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the school management portal</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">• Manage teachers, students, and classes</p>
            <p className="text-sm text-muted-foreground">• View and analyze student results</p>
            <p className="text-sm text-muted-foreground">• Generate reports and statistics</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">• 3 new students enrolled</p>
            <p className="text-sm text-muted-foreground">• Results uploaded for SS3</p>
            <p className="text-sm text-muted-foreground">• 2 teachers assigned to classes</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPage;

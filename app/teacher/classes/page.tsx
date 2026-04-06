import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockClasses, mockTeachers } from '@/lib/mockData';
import { School, BookOpen } from 'lucide-react';

const TeacherClasses = () => {
  const teacher = mockTeachers[0];
  const myClass = mockClasses.find(c => c.classTeacher === teacher.name);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Classes</h1>
        <p className="text-muted-foreground">View your assigned class information</p>
      </div>

      {myClass && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <School className="h-5 w-5 text-primary" />
              {myClass.className}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Class Teacher</p>
              <p className="font-medium">{myClass.classTeacher}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Subjects
              </p>
              <div className="flex flex-wrap gap-2">
                {myClass.subjects.map((subject, idx) => (
                  <span key={idx} className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TeacherClasses;

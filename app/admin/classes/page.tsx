import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockClasses } from '@/lib/mockData';
import { School, User, BookOpen } from 'lucide-react';

const Classes = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Classes Management</h1>
        <p className="text-muted-foreground">View and manage all classes</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockClasses.map((cls) => (
          <Card key={cls.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <School className="h-5 w-5 text-primary" />
                {cls.className}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Class Teacher:</span>
                <span className="font-medium">{cls.classTeacher}</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Subjects:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {cls.subjects.map((subject, idx) => (
                    <span key={idx} className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Classes;

"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DialogHeader, Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { mockClasses, mockSubjects } from '@/lib/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { School, User, BookOpen, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { createClass, getClasses } from '@/app/api/users/admin';
import { toast } from 'sonner';
import { CheckBox } from '@/components/ui/checkbox';

const Classes = () => {
  const [classes, setClasses] = useState()
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    className: "",
    classTeacher: "",
    subjects: ""
  })

  useEffect(() => {
        (
          async function () {
            const c = await getClasses()
            // setClasses(c)
            console.log(c)
          }
        )()
      },[])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cl = await createClass(formData)
    console.log(cl)
    setIsOpen(false);
    toast.success('Class added successfully');
    setFormData({className: "", classTeacher: "", subjects: ""});
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
        <h1 className="text-3xl font-bold">Classes Management</h1>
        <p className="text-muted-foreground">View and manage all classes</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Class
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Class</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.classTeacher}
                  onChange={(e) => setFormData({ ...formData, classTeacher: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="class">Class</Label>
                <Select value={formData.className} onValueChange={(value) => setFormData({ ...formData, className: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockClasses.map((cls) => (
                      <SelectItem key={cls._id} value={cls.className}>{cls.className}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* <div className="space-y-2">
                <Label htmlFor="class">Subjects</Label>
                <Select value={formData.subjects} onValueChange={(value) => setFormData({ ...formData, subjects: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockSubjects.map((cls) => (
                      <SelectItem key={cls.id} value={cls.subjectCode}>{cls.subjectName}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div> */}
              <div className="select-none">
                <CheckBox name="MATHS101" value="MTH101"/>
              </div>
              <Button type="submit" className="w-full">Add Student</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockClasses.map((cls) => (
          <Card key={cls._id}>
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

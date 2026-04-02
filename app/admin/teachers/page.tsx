"use client"
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockClasses, mockSubjects, Teacher } from '@/lib/mockData';
import { Plus, Pencil, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { createTeacher, getTeachers, editTeacher, deleteTeacher } from '@/app/api/users/admin';

const Teachers = () => {
  const [teachers, setTeachers] = useState<Teacher[] | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', name: '', email: '', assignedClass: '', assignedSubjects: [] as string[], password: '', role: 'teacher'});
  
  
  useEffect(() => {
    (
      async function () {
        const s = await getTeachers()
        setTeachers(s)
        console.log(s)
      }
    )()
  },[])
  const handleDelete = async (id: string, staffId : string) => {
    const del = await deleteTeacher(id, staffId)
    console.log(del)
    toast.success('Teacher deleted successfully');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const teacher = await createTeacher({...formData, name: formData.firstName + " " + formData.lastName})
    console.log(teacher)
    toast.success('Teacher added successfully');
    setIsOpen(false);
    setFormData({firstName: '', lastName: '', name: '', email: '', assignedClass: '', assignedSubjects: [], password: '', role: 'teacher'});
  };
  

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Teachers Management</h1>
          <p className="text-muted-foreground">Manage all teachers in the system</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Teacher
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Teacher</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Password</Label>
                <Input
                  id="name"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="class">Assigned Class</Label>
                <Select value={formData.assignedClass} onValueChange={(value) => setFormData({ ...formData, assignedClass: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockClasses.map((cls) => (
                      <SelectItem key={cls._id} value={cls.className}>{cls.className}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Label htmlFor="class">Assigned Subjects</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, assignedSubjects: [value] })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subjects" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockSubjects.map((cls) => (
                      <SelectItem key={cls.id} value={cls.subjectName}>{cls.subjectName}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">Add Teacher</Button>
            </form>
          </DialogContent>
        </Dialog>
        
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Teachers ({teachers ? teachers.length : 0})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Assigned Class</TableHead>
                <TableHead>Subjects</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers 
              ?
              teachers.map((teacher) => (
                <TableRow key={teacher._id}>
                  <TableCell className="font-medium">{teacher.name}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>{teacher.assignedClass}</TableCell>
                  <TableCell>{teacher.assignedSubjects && teacher.assignedSubjects.join(', ')}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(teacher._id, teacher.staffId!)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
              :
              <TableRow>
                <TableCell>No Teacher Found</TableCell>
              </TableRow>
            }
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Teachers;

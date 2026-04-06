"use client"
import { useState } from 'react';
import { signIn, useSession } from "next-auth/react"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { School } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    signIn("credentials", {email: email, password : password, callbackUrl: "/"});
    
    if (session?.user?.email) {
      toast.success('Login successful!');
    } else {
      toast.error('Invalid email or password');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
            <School className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">School Result Portal</CardTitle>
          <CardDescription>Enter your credentials to access the portal</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          <Button type='button' className="w-full my-4" onClick={() => signIn("google", { callbackUrl: "/" })}>
              Login with Google
            </Button>
          <div className="mt-6 space-y-2 rounded-lg bg-muted p-4 text-sm">
            <p className="font-semibold">Demo Credentials:</p>
            <div className="space-y-1">
              <p><strong>Admin:</strong> kennedy@gmail.com / qwerty@123</p>
              <p><strong>Student:</strong> blessing@gmail.com / password123</p>
              <p>sign in with google works but not without your email already belonging to an account</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

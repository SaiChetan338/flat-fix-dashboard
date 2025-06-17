
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

interface LoginFormProps {
  onBack: () => void;
  onSwitchToSignup: () => void;
}

const LoginForm = ({ onBack, onSwitchToSignup }: LoginFormProps) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Demo credentials for testing
    const demoUsers = [
      {
        phone: '+1234567890',
        password: 'admin123',
        role: 'admin',
        name: 'Admin John Smith',
        flatNumber: '101',
        numberOfFlats: 3,
        ownedFlats: ['101', '102', '103'],
        apartmentCode: 'DEMO001'
      },
      {
        phone: '+1234567891',
        password: 'resident123',
        role: 'tenant',
        name: 'Resident Jane Doe',
        flatNumber: '201',
        numberOfFlats: 2,
        ownedFlats: ['201', '202'],
        apartmentCode: 'DEMO001'
      },
      {
        phone: '+1234567892',
        password: 'resident456',
        role: 'tenant',
        name: 'Resident Mike Wilson',
        flatNumber: '301',
        numberOfFlats: 1,
        ownedFlats: ['301'],
        apartmentCode: 'DEMO001'
      },
      {
        phone: '+1234567893',
        password: 'admin456',
        role: 'admin',
        name: 'Admin Sarah Johnson',
        flatNumber: '401',
        numberOfFlats: 4,
        ownedFlats: ['401', '402', '403', '404'],
        apartmentCode: 'DEMO002'
      }
    ];

    // Simulate API call
    setTimeout(() => {
      const user = demoUsers.find(u => u.phone === phone && u.password === password);
      
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        toast({ 
          title: 'Welcome back!', 
          description: `Logged in successfully as ${user.role === 'admin' ? 'Admin' : 'Resident'}` 
        });
        navigate('/dashboard');
      } else {
        toast({ 
          title: 'Login failed', 
          description: 'Invalid credentials. Please use the demo credentials provided below.',
          variant: 'destructive'
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="absolute top-4 left-4 p-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Fix My Flat</span>
          </div>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={onSwitchToSignup}
                className="text-blue-600 hover:underline font-medium"
              >
                Register here
              </button>
            </p>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-3 font-medium">Demo Credentials (Copy & Paste):</p>
            
            <div className="space-y-3">
              <div className="bg-white p-3 rounded border">
                <p className="text-xs font-medium text-gray-700 mb-1">Admin (Multiple Flats):</p>
                <p className="text-xs text-gray-600 font-mono">Phone: +1234567890</p>
                <p className="text-xs text-gray-600 font-mono">Password: admin123</p>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <p className="text-xs font-medium text-gray-700 mb-1">Admin (4 Flats):</p>
                <p className="text-xs text-gray-600 font-mono">Phone: +1234567893</p>
                <p className="text-xs text-gray-600 font-mono">Password: admin456</p>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <p className="text-xs font-medium text-gray-700 mb-1">Resident (Multiple Flats):</p>
                <p className="text-xs text-gray-600 font-mono">Phone: +1234567891</p>
                <p className="text-xs text-gray-600 font-mono">Password: resident123</p>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <p className="text-xs font-medium text-gray-700 mb-1">Resident (Single Flat):</p>
                <p className="text-xs text-gray-600 font-mono">Phone: +1234567892</p>
                <p className="text-xs text-gray-600 font-mono">Password: resident456</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;

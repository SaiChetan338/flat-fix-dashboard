
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface SignupFormProps {
  onBack: () => void;
  onSwitchToLogin: () => void;
}

const SignupForm = ({ onBack, onSwitchToLogin }: SignupFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    flatNumber: '',
    apartmentCode: '',
    password: '',
    confirmPassword: '',
    role: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingNewApartment, setIsCreatingNewApartment] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateApartmentCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setFormData(prev => ({ ...prev, apartmentCode: code }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({ 
        title: 'Password mismatch', 
        description: 'Passwords do not match',
        variant: 'destructive'
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({ 
        title: 'Password too short', 
        description: 'Password must be at least 6 characters',
        variant: 'destructive'
      });
      return;
    }

    if (!formData.phone.match(/^\+?[\d\s\-\(\)]+$/)) {
      toast({ 
        title: 'Invalid phone number', 
        description: 'Please enter a valid phone number',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify({ 
        phone: formData.phone, 
        role: formData.role, 
        name: formData.name,
        flatNumber: formData.flatNumber,
        apartmentCode: formData.apartmentCode
      }));
      
      const roleText = formData.role === 'admin' ? 'Admin' : 'Resident';
      toast({ 
        title: 'Account created!', 
        description: `Welcome to Fix My Flat as ${roleText}` 
      });
      navigate('/dashboard');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-beam">
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
          <CardTitle className="text-2xl">Register Account</CardTitle>
          <CardDescription>
            Join our apartment management platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={formData.role} onValueChange={(value) => handleChange('role', value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tenant">Resident</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="flatNumber">Flat Number</Label>
              <Input
                id="flatNumber"
                value={formData.flatNumber}
                onChange={(e) => handleChange('flatNumber', e.target.value)}
                placeholder="e.g., 2A, 15B, 101"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apartmentCode">Apartment Code</Label>
              {formData.role === 'admin' ? (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      id="apartmentCode"
                      value={formData.apartmentCode}
                      onChange={(e) => handleChange('apartmentCode', e.target.value)}
                      placeholder="Create apartment code"
                      required
                    />
                    <Button 
                      type="button" 
                      onClick={generateApartmentCode}
                      variant="outline"
                      size="sm"
                    >
                      Generate
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    As an admin, you can create a new apartment code for residents to join
                  </p>
                </div>
              ) : (
                <div>
                  <Input
                    id="apartmentCode"
                    value={formData.apartmentCode}
                    onChange={(e) => handleChange('apartmentCode', e.target.value)}
                    placeholder="Enter apartment code provided by admin"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Get this code from your apartment admin or another resident
                  </p>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="Create a password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  placeholder="Confirm your password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Register'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-blue-600 hover:underline font-medium"
              >
                Sign in here
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupForm;

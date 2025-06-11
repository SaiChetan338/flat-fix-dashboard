
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Building2, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const AdminRegistration = () => {
  const [formData, setFormData] = useState({
    phone: '',
    flatNumber: '',
    apartmentCode: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apartmentName, setApartmentName] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Get apartment code from URL and apartment info from session storage
    const code = searchParams.get('code');
    if (code) {
      setFormData(prev => ({ ...prev, apartmentCode: code }));
      
      const apartmentInfo = sessionStorage.getItem('newApartment');
      if (apartmentInfo) {
        const parsed = JSON.parse(apartmentInfo);
        setApartmentName(parsed.name);
      }
    }
  }, [searchParams]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
        role: 'admin', 
        name: `Admin of ${apartmentName}`,
        flatNumber: formData.flatNumber,
        apartmentCode: formData.apartmentCode
      }));
      
      // Clean up session storage
      sessionStorage.removeItem('newApartment');
      
      toast({ 
        title: 'Admin account created!', 
        description: `Welcome as admin of ${apartmentName}` 
      });
      navigate('/dashboard');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="absolute top-4 left-4 p-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Fix My Flat</span>
          </div>
          <CardTitle className="text-2xl">Admin Registration</CardTitle>
          <CardDescription>
            {apartmentName ? `Setup admin account for ${apartmentName}` : 'Complete your admin registration'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <Input
                id="apartmentCode"
                value={formData.apartmentCode}
                onChange={(e) => handleChange('apartmentCode', e.target.value)}
                placeholder="Generated apartment code"
                readOnly
                className="bg-gray-100"
              />
              <p className="text-xs text-gray-500">
                Share this code with residents to let them join your apartment
              </p>
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
              {isLoading ? 'Creating Admin Account...' : 'Complete Registration'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminRegistration;

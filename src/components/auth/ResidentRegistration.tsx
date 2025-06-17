
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const ResidentRegistration = () => {
  const [formData, setFormData] = useState({
    phone: '',
    numberOfFlats: '1',
    apartmentCode: '',
    password: ''
  });
  const [flatNumbers, setFlatNumbers] = useState<string[]>(['']);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Update flat number fields when numberOfFlats changes
    if (field === 'numberOfFlats') {
      const numFlats = parseInt(value) || 1;
      const newFlatNumbers = Array(numFlats).fill('').map((_, index) => 
        flatNumbers[index] || ''
      );
      setFlatNumbers(newFlatNumbers);
    }
  };

  const handleFlatNumberChange = (index: number, value: string) => {
    const newFlatNumbers = [...flatNumbers];
    newFlatNumbers[index] = value;
    setFlatNumbers(newFlatNumbers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

    if (!formData.apartmentCode.trim()) {
      toast({ 
        title: 'Missing apartment code', 
        description: 'Please enter the apartment code provided by your admin',
        variant: 'destructive'
      });
      return;
    }

    if (parseInt(formData.numberOfFlats) < 1) {
      toast({ 
        title: 'Invalid number of flats', 
        description: 'Number of flats must be at least 1',
        variant: 'destructive'
      });
      return;
    }

    // Check if all flat numbers are filled
    const emptyFlats = flatNumbers.some(flat => !flat.trim());
    if (emptyFlats) {
      toast({ 
        title: 'Missing flat numbers', 
        description: 'Please enter all flat numbers',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify({ 
        phone: formData.phone, 
        role: 'tenant', 
        name: `Resident of Flat ${flatNumbers[0]}`,
        flatNumber: flatNumbers[0],
        numberOfFlats: parseInt(formData.numberOfFlats),
        ownedFlats: flatNumbers,
        apartmentCode: formData.apartmentCode
      }));
      
      toast({ 
        title: 'Resident account created!', 
        description: 'Welcome to your apartment community' 
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
          <CardTitle className="text-2xl">Resident Registration</CardTitle>
          <CardDescription>
            Join your apartment community as a resident
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
              <Label htmlFor="numberOfFlats">Number of Flats Owned</Label>
              <Input
                id="numberOfFlats"
                type="number"
                min="1"
                value={formData.numberOfFlats}
                onChange={(e) => handleChange('numberOfFlats', e.target.value)}
                placeholder="How many flats do you own?"
                required
              />
            </div>

            {/* Dynamic flat number fields */}
            {flatNumbers.map((flatNumber, index) => (
              <div key={index} className="space-y-2">
                <Label htmlFor={`flat-${index}`}>
                  {flatNumbers.length === 1 ? 'Flat Number' : `Flat ${index + 1} Number`}
                </Label>
                <Input
                  id={`flat-${index}`}
                  value={flatNumber}
                  onChange={(e) => handleFlatNumberChange(index, e.target.value)}
                  placeholder={`e.g., 2A, 15B, ${101 + index}`}
                  required
                />
              </div>
            ))}

            <div className="space-y-2">
              <Label htmlFor="apartmentCode">Apartment Code</Label>
              <Input
                id="apartmentCode"
                value={formData.apartmentCode}
                onChange={(e) => handleChange('apartmentCode', e.target.value)}
                placeholder="Enter code provided by admin"
                required
              />
              <p className="text-xs text-gray-500">
                Get this code from your apartment admin or another resident
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

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Join Apartment'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Need to create a new apartment?{' '}
              <Button
                variant="link"
                onClick={() => navigate('/register-apartment')}
                className="p-0 h-auto text-blue-600 hover:underline font-medium"
              >
                Register new apartment
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResidentRegistration;


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import TenantDashboard from '@/components/dashboard/TenantDashboard';
import { toast } from '@/hooks/use-toast';

interface User {
  phone: string;
  role: string;
  name: string;
  flatNumber?: string;
  numberOfFlats?: number;
  ownedFlats?: string[];
  apartmentCode?: string;
  selectedFlat?: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      // Add demo credentials for testing
      const demoUsers = [
        {
          phone: '+1234567890',
          role: 'admin',
          name: 'Admin John Smith',
          flatNumber: '101',
          numberOfFlats: 3,
          ownedFlats: ['101', '102', '103'],
          apartmentCode: 'DEMO001'
        },
        {
          phone: '+1234567891',
          role: 'tenant',
          name: 'Resident Jane Doe',
          flatNumber: '201',
          numberOfFlats: 2,
          ownedFlats: ['201', '202'],
          apartmentCode: 'DEMO001'
        },
        {
          phone: '+1234567892',
          role: 'tenant',
          name: 'Resident Mike Wilson',
          flatNumber: '301',
          numberOfFlats: 1,
          ownedFlats: ['301'],
          apartmentCode: 'DEMO001'
        },
        {
          phone: '+1234567893',
          role: 'admin',
          name: 'Admin Sarah Johnson',
          flatNumber: '401',
          numberOfFlats: 4,
          ownedFlats: ['401', '402', '403', '404'],
          apartmentCode: 'DEMO002'
        }
      ];
      
      console.log('Demo credentials available:', demoUsers);
      toast({ 
        title: 'Access denied', 
        description: 'Please log in to access the dashboard',
        variant: 'destructive'
      });
      navigate('/');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('user');
      navigate('/');
    }
    setIsLoading(false);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user.role === 'admin' ? (
        <AdminDashboard user={user} />
      ) : (
        <TenantDashboard user={user} />
      )}
    </div>
  );
};

export default Dashboard;

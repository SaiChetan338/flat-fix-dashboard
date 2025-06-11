
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import TenantDashboard from '@/components/dashboard/TenantDashboard';
import { toast } from '@/hooks/use-toast';

interface User {
  email: string;
  role: string;
  name: string;
  phone?: string;
  apartmentNumber?: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
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

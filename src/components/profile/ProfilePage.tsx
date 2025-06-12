
import { User, Phone, Building, Home } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface User {
  phone: string;
  role: string;
  name: string;
  flatNumber?: string;
  apartmentCode?: string;
}

interface ProfilePageProps {
  user: User;
}

const ProfilePage = ({ user }: ProfilePageProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <User className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold">My Profile</h2>
      </div>
      
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-lg">
                {user.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <span>{user.name}</span>
              <CardDescription className="capitalize">{user.role}</CardDescription>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Phone className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Phone Number</p>
              <p className="font-medium">{user.phone}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Building className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Apartment Code</p>
              <p className="font-medium">{user.apartmentCode || 'N/A'}</p>
            </div>
          </div>
          
          {user.flatNumber && (
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Home className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Flat Number</p>
                <p className="font-medium">{user.flatNumber}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;

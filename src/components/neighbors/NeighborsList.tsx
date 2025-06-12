
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, Users, Home } from 'lucide-react';

interface Neighbor {
  id: string;
  name: string;
  phone: string;
  email: string;
  flatNumber: string;
  apartmentCode: string;
}

interface NeighborsListProps {
  apartmentCode: string;
  currentUserFlatNumber?: string;
}

const NeighborsList = ({ apartmentCode, currentUserFlatNumber }: NeighborsListProps) => {
  const [neighbors, setNeighbors] = useState<Neighbor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data for now - will be replaced with actual database call
    const mockNeighbors: Neighbor[] = [
      {
        id: '1',
        name: 'Alice Johnson',
        phone: '+1-555-0201',
        email: 'alice.johnson@email.com',
        flatNumber: '101',
        apartmentCode
      },
      {
        id: '2',
        name: 'Bob Martinez',
        phone: '+1-555-0202',
        email: 'bob.martinez@email.com',
        flatNumber: '102',
        apartmentCode
      },
      {
        id: '3',
        name: 'Carol Davis',
        phone: '+1-555-0203',
        email: 'carol.davis@email.com',
        flatNumber: '201',
        apartmentCode
      },
      {
        id: '4',
        name: 'Daniel Lee',
        phone: '+1-555-0204',
        email: 'daniel.lee@email.com',
        flatNumber: '202',
        apartmentCode
      }
    ].filter(neighbor => neighbor.flatNumber !== currentUserFlatNumber);

    setTimeout(() => {
      setNeighbors(mockNeighbors);
      setIsLoading(false);
    }, 500);
  }, [apartmentCode, currentUserFlatNumber]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
        <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
        <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Users className="h-6 w-6 text-green-600" />
        <h2 className="text-2xl font-bold">My Neighbors</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {neighbors.map((neighbor) => (
          <Card key={neighbor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>{neighbor.name}</span>
              </CardTitle>
              <CardDescription className="flex items-center space-x-2">
                <Home className="h-4 w-4" />
                <span>Apartment {neighbor.flatNumber}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-green-600" />
                <span>{neighbor.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-blue-600" />
                <span className="truncate">{neighbor.email}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NeighborsList;

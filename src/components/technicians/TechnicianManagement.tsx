
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, Search, UserPlus, Wrench, Star, Clock } from 'lucide-react';

interface Technician {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  status: 'available' | 'busy' | 'offline';
  rating: number;
  completedJobs: number;
  activeJobs: number;
}

const TechnicianManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [technicians] = useState<Technician[]>([
    {
      id: '1',
      name: 'Mike Johnson',
      email: 'mike.johnson@contractors.com',
      phone: '(555) 111-2222',
      specialty: 'Plumbing',
      status: 'available',
      rating: 4.8,
      completedJobs: 145,
      activeJobs: 2
    },
    {
      id: '2',
      name: 'Sarah Davis',
      email: 'sarah.davis@contractors.com',
      phone: '(555) 222-3333',
      specialty: 'Electrical',
      status: 'busy',
      rating: 4.9,
      completedJobs: 98,
      activeJobs: 3
    },
    {
      id: '3',
      name: 'Tom Rodriguez',
      email: 'tom.rodriguez@contractors.com',
      phone: '(555) 333-4444',
      specialty: 'HVAC',
      status: 'available',
      rating: 4.6,
      completedJobs: 67,
      activeJobs: 1
    },
    {
      id: '4',
      name: 'Lisa Chen',
      email: 'lisa.chen@contractors.com',
      phone: '(555) 444-5555',
      specialty: 'General Maintenance',
      status: 'offline',
      rating: 4.7,
      completedJobs: 203,
      activeJobs: 0
    }
  ]);

  const filteredTechnicians = technicians.filter(tech =>
    tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tech.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tech.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'default';
      case 'busy': return 'destructive';
      case 'offline': return 'secondary';
      default: return 'outline';
    }
  };

  const getSpecialtyIcon = (specialty: string) => {
    return <Wrench className="h-4 w-4" />;
  };

  const totalTechnicians = technicians.length;
  const availableTechnicians = technicians.filter(t => t.status === 'available').length;
  const activeTasks = technicians.reduce((sum, tech) => sum + tech.activeJobs, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Technician Management</h2>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Add New Technician
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Technicians</CardDescription>
            <CardTitle className="text-3xl">{totalTechnicians}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Registered contractors</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Available Now</CardDescription>
            <CardTitle className="text-3xl">{availableTechnicians}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Ready for assignments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Active Tasks</CardDescription>
            <CardTitle className="text-3xl">{activeTasks}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Currently in progress</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Technician Directory</CardTitle>
          <CardDescription>Manage contractor information and availability</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name, specialty, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>

          {/* Technicians List */}
          <div className="space-y-4">
            {filteredTechnicians.map((technician) => (
              <Card key={technician.id} className="border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium">
                            {technician.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{technician.name}</h3>
                          <p className="text-gray-500 flex items-center">
                            {getSpecialtyIcon(technician.specialty)}
                            <span className="ml-1">{technician.specialty}</span>
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Mail className="h-4 w-4" />
                          <span>{technician.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Phone className="h-4 w-4" />
                          <span>{technician.phone}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{technician.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{technician.completedJobs} jobs completed</span>
                        <span>•</span>
                        <span>{technician.activeJobs} active assignments</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end space-y-2">
                      <Badge variant={getStatusColor(technician.status) as any}>
                        {technician.status}
                      </Badge>
                      {technician.activeJobs > 0 && (
                        <Badge variant="outline">
                          <Clock className="h-3 w-3 mr-1" />
                          {technician.activeJobs} Active
                        </Badge>
                      )}
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Contact
                        </Button>
                        <Button variant="outline" size="sm">
                          Assign Task
                        </Button>
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTechnicians.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No technicians found matching your search</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TechnicianManagement;

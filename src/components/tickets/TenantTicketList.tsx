import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, User, Wrench, CheckCircle, AlertCircle, MessageSquare, Filter } from 'lucide-react';

interface User {
  name: string;
  apartmentNumber?: string;
}

interface TenantTicketListProps {
  user: User;
}

interface Ticket {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'unassigned' | 'in-progress' | 'resolved';
  createdAt: string;
  tenant: string;
  apartment: string;
  assignedTo?: string;
}

const TenantTicketList = ({ user }: TenantTicketListProps) => {
  const [tickets] = useState<Ticket[]>([
    {
      id: 'TKT001',
      title: 'Leaking Faucet in Kitchen',
      description: 'The kitchen faucet has been leaking for 2 days. Water is dripping constantly.',
      category: 'Plumbing',
      status: 'in-progress',
      createdAt: '2024-01-15',
      tenant: 'John Doe',
      apartment: '2A',
      assignedTo: 'Mike Johnson (Plumber)'
    },
    {
      id: 'TKT002',
      title: 'AC Unit Making Noise',
      description: 'The air conditioning unit is making unusual noises.',
      category: 'HVAC',
      status: 'unassigned',
      createdAt: '2024-01-14',
      tenant: 'Jane Smith',
      apartment: '3B'
    },
    {
      id: 'TKT003',
      title: 'Electrical Outlet Fixed',
      description: 'The outlet in the living room was not working.',
      category: 'Electrical',
      status: 'resolved',
      createdAt: '2024-01-10',
      tenant: 'Bob Wilson',
      apartment: '1C',
      assignedTo: 'Sarah Davis (Electrician)'
    },
    {
      id: 'TKT004',
      title: 'Elevator Maintenance',
      description: 'Elevator making strange sounds and moving slowly.',
      category: 'Mechanical',
      status: 'in-progress',
      createdAt: '2024-01-12',
      tenant: 'Alice Brown',
      apartment: '4A',
      assignedTo: 'Maintenance Team'
    },
    {
      id: 'TKT005',
      title: 'Water Pressure Low',
      description: 'Low water pressure in bathroom shower.',
      category: 'Plumbing',
      status: 'unassigned',
      createdAt: '2024-01-16',
      tenant: 'Mike Davis',
      apartment: '2C'
    }
  ]);

  const [othersStatusFilter, setOthersStatusFilter] = useState<string>('all');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'unassigned': return <AlertCircle className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unassigned': return 'destructive';
      case 'in-progress': return 'default';
      case 'resolved': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusBorderColor = (status: string) => {
    switch (status) {
      case 'unassigned': return 'border-l-red-500';
      case 'in-progress': return 'border-l-blue-500';  
      case 'resolved': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  // Get current user's tickets (assuming we identify by tenant name)
  const myTickets = tickets.filter(ticket => ticket.tenant === user.name);
  
  // Get other users' tickets
  const othersTickets = tickets.filter(ticket => ticket.tenant !== user.name);

  // Filter others' tickets based on status filter
  const filteredOthersTickets = othersTickets.filter(ticket => {
    if (othersStatusFilter === 'all') return true;
    return ticket.status === othersStatusFilter;
  });

  const renderTicketCard = (ticket: Ticket) => (
    <Card key={ticket.id} className={`border-l-4 ${getStatusBorderColor(ticket.status)}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">#{ticket.id} - {ticket.title}</CardTitle>
            <CardDescription className="mt-1">
              Submitted by {ticket.tenant} (Apt {ticket.apartment}) on {ticket.createdAt}
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Badge variant={getStatusColor(ticket.status) as any}>
              {getStatusIcon(ticket.status)}
              <span className="ml-1 capitalize">{ticket.status.replace('-', ' ')}</span>
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{ticket.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <Wrench className="h-4 w-4 mr-1" />
              {ticket.category}
            </span>
          </div>
          <Button variant="outline" size="sm">
            <MessageSquare className="h-4 w-4 mr-1" />
            Add Comment
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* My Tickets Section */}
      <Card>
        <CardHeader>
          <CardTitle>My Tickets</CardTitle>
          <CardDescription>
            Your maintenance requests ({myTickets.length} tickets)
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {myTickets.length > 0 ? (
          myTickets.map(renderTicketCard)
        ) : (
          <Card>
            <CardContent className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">You haven't submitted any tickets yet</p>
              <p className="text-sm text-gray-400 mt-1">
                Use the "Report Issue" section to submit a new maintenance request
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Others' Tickets Section */}
      <Card>
        <CardHeader>
          <CardTitle>Other Residents' Tickets</CardTitle>
          <CardDescription>
            View maintenance requests from other residents in the building
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Filter Section for Others' Tickets */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={othersStatusFilter} onValueChange={setOthersStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tickets ({othersTickets.length})</SelectItem>
                <SelectItem value="unassigned">Unassigned ({othersTickets.filter(t => t.status === 'unassigned').length})</SelectItem>
                <SelectItem value="in-progress">In Progress ({othersTickets.filter(t => t.status === 'in-progress').length})</SelectItem>
                <SelectItem value="resolved">Resolved ({othersTickets.filter(t => t.status === 'resolved').length})</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Others' Tickets List */}
      <div className="space-y-4">
        {filteredOthersTickets.length > 0 ? (
          filteredOthersTickets.map(renderTicketCard)
        ) : (
          <Card>
            <CardContent className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No tickets found for the selected filter</p>
              <p className="text-sm text-gray-400 mt-1">
                Try selecting a different status filter
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TenantTicketList;

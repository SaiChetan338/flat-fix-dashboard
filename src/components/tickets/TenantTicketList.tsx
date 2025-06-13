
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, User, Wrench, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';

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
  status: 'open' | 'in-progress' | 'resolved';
  createdAt: string;
  assignedTo?: string;
  estimatedCompletion?: string;
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
      assignedTo: 'Mike Johnson (Plumber)',
      estimatedCompletion: '2024-01-17'
    },
    {
      id: 'TKT002',
      title: 'AC Unit Making Noise',
      description: 'The air conditioning unit is making unusual noises.',
      category: 'HVAC',
      status: 'open',
      createdAt: '2024-01-14'
    },
    {
      id: 'TKT003',
      title: 'Electrical Outlet Fixed',
      description: 'The outlet in the living room was not working.',
      category: 'Electrical',
      status: 'resolved',
      createdAt: '2024-01-10',
      assignedTo: 'Sarah Davis (Electrician)'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertCircle className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'destructive';
      case 'in-progress': return 'default';
      case 'resolved': return 'secondary';
      default: return 'outline';
    }
  };

  const openTickets = tickets.filter(t => t.status !== 'resolved');
  const resolvedTickets = tickets.filter(t => t.status === 'resolved');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Maintenance Requests</CardTitle>
          <CardDescription>
            Track the status of your maintenance requests for apartment {user.apartmentNumber}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Active Tickets */}
      {openTickets.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Active Requests</h3>
          {openTickets.map((ticket) => (
            <Card key={ticket.id} className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">#{ticket.id} - {ticket.title}</CardTitle>
                    <CardDescription className="mt-1">
                      Submitted on {ticket.createdAt}
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
          ))}
        </div>
      )}

      {/* Resolved Tickets */}
      {resolvedTickets.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Recently Resolved</h3>
          {resolvedTickets.map((ticket) => (
            <Card key={ticket.id} className="border-l-4 border-l-green-500 bg-gray-50">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">#{ticket.id} - {ticket.title}</CardTitle>
                    <CardDescription className="mt-1">
                      Submitted on {ticket.createdAt}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Badge variant="secondary">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Resolved
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
                    Rate Service
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tickets.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No maintenance requests yet</p>
            <p className="text-sm text-gray-400 mt-1">
              When you report issues, they'll appear here
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TenantTicketList;

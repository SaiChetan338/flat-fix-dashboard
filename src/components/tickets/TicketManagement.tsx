
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, User, Wrench, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Ticket {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: 'unassigned' | 'assigned' | 'cleared';
  tenant: string;
  apartment: string;
  createdAt: string;
  assignedTo?: string;
}

const TicketManagement = () => {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: '001',
      title: 'Leaking Faucet in Kitchen',
      description: 'The kitchen faucet has been leaking for 2 days. Water is dripping constantly.',
      category: 'Plumbing',
      priority: 'Medium',
      status: 'unassigned',
      tenant: 'John Doe',
      apartment: '2A',
      createdAt: '2024-01-15'
    },
    {
      id: '002',
      title: 'Electrical Outlet Not Working',
      description: 'The outlet in the living room stopped working yesterday.',
      category: 'Electrical',
      priority: 'High',
      status: 'assigned',
      tenant: 'Jane Smith',
      apartment: '3B',
      createdAt: '2024-01-14',
      assignedTo: 'Mike Johnson (Electrician)'
    },
    {
      id: '003',
      title: 'AC Unit Making Noise',
      description: 'The air conditioning unit is making unusual noises.',
      category: 'HVAC',
      priority: 'Low',
      status: 'cleared',
      tenant: 'Bob Wilson',
      apartment: '1C',
      createdAt: '2024-01-13',
      assignedTo: 'Sarah Davis (HVAC Tech)'
    }
  ]);

  const updateTicketStatus = (ticketId: string, newStatus: 'unassigned' | 'assigned' | 'cleared', assignedTo?: string) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, status: newStatus, assignedTo }
        : ticket
    ));
    
    const statusText = newStatus === 'unassigned' ? 'unassigned' : 
                     newStatus === 'assigned' ? 'assigned' : 'cleared';
    toast({ 
      title: 'Ticket updated', 
      description: `Ticket #${ticketId} has been ${statusText}` 
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'unassigned': return <AlertCircle className="h-4 w-4" />;
      case 'assigned': return <User className="h-4 w-4" />;
      case 'cleared': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unassigned': return 'destructive';
      case 'assigned': return 'default';
      case 'cleared': return 'secondary';
      default: return 'outline';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderTicketCard = (ticket: Ticket) => (
    <Card key={ticket.id} className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">#{ticket.id} - {ticket.title}</CardTitle>
            <CardDescription className="mt-1">
              {ticket.tenant} • Apartment {ticket.apartment} • {ticket.createdAt}
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Badge className={getPriorityColor(ticket.priority)}>
              {ticket.priority}
            </Badge>
            <Badge variant={getStatusColor(ticket.status) as any}>
              {getStatusIcon(ticket.status)}
              <span className="ml-1 capitalize">{ticket.status}</span>
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
            {ticket.assignedTo && (
              <span className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                {ticket.assignedTo}
              </span>
            )}
          </div>
          <div className="flex space-x-2">
            {ticket.status !== 'unassigned' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateTicketStatus(ticket.id, 'unassigned')}
              >
                Unassign
              </Button>
            )}
            {ticket.status !== 'assigned' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateTicketStatus(ticket.id, 'assigned', 'Auto-assigned')}
              >
                Assign
              </Button>
            )}
            {ticket.status !== 'cleared' && (
              <Button
                variant="default"
                size="sm"
                onClick={() => updateTicketStatus(ticket.id, 'cleared', ticket.assignedTo)}
              >
                Mark Cleared
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const unassignedTickets = tickets.filter(t => t.status === 'unassigned');
  const assignedTickets = tickets.filter(t => t.status === 'assigned');
  const clearedTickets = tickets.filter(t => t.status === 'cleared');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Ticket Management</h2>
        <div className="flex space-x-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="plumbing">Plumbing</SelectItem>
              <SelectItem value="electrical">Electrical</SelectItem>
              <SelectItem value="hvac">HVAC</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="unassigned" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="unassigned" className="flex items-center space-x-2">
            <AlertCircle className="h-4 w-4" />
            <span>Unassigned ({unassignedTickets.length})</span>
          </TabsTrigger>
          <TabsTrigger value="assigned" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>Assigned ({assignedTickets.length})</span>
          </TabsTrigger>
          <TabsTrigger value="cleared" className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4" />
            <span>Cleared ({clearedTickets.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="unassigned" className="space-y-4">
          {unassignedTickets.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-500">No unassigned tickets</p>
              </CardContent>
            </Card>
          ) : (
            unassignedTickets.map(renderTicketCard)
          )}
        </TabsContent>

        <TabsContent value="assigned" className="space-y-4">
          {assignedTickets.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-500">No assigned tickets</p>
              </CardContent>
            </Card>
          ) : (
            assignedTickets.map(renderTicketCard)
          )}
        </TabsContent>

        <TabsContent value="cleared" className="space-y-4">
          {clearedTickets.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-500">No cleared tickets</p>
              </CardContent>
            </Card>
          ) : (
            clearedTickets.map(renderTicketCard)
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TicketManagement;

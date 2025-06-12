
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, DollarSign, Plus, CheckCircle, XCircle, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface MaintenanceRecord {
  id: string;
  description: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  submittedBy: string;
  flatNumber: string;
  submittedDate: string;
  approvedBy?: string;
  approvedDate?: string;
}

interface MaintenanceHistoryProps {
  apartmentCode: string;
  isAdmin: boolean;
  userFlatNumber?: string;
  userName: string;
}

const MaintenanceHistory = ({ apartmentCode, isAdmin, userFlatNumber, userName }: MaintenanceHistoryProps) => {
  const [records, setRecords] = useState<MaintenanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [newRequest, setNewRequest] = useState({
    description: '',
    amount: ''
  });

  useEffect(() => {
    // Mock data for now - will be replaced with actual database call
    const mockRecords: MaintenanceRecord[] = [
      {
        id: '1',
        description: 'Plumbing repair in bathroom',
        amount: 150,
        status: 'approved',
        submittedBy: 'Alice Johnson',
        flatNumber: '101',
        submittedDate: '2024-01-15',
        approvedBy: 'Admin User',
        approvedDate: '2024-01-16'
      },
      {
        id: '2',
        description: 'Electrical outlet replacement',
        amount: 85,
        status: 'pending',
        submittedBy: 'Bob Martinez',
        flatNumber: '102',
        submittedDate: '2024-01-18'
      },
      {
        id: '3',
        description: 'Air conditioning maintenance',
        amount: 200,
        status: 'rejected',
        submittedBy: 'Carol Davis',
        flatNumber: '201',
        submittedDate: '2024-01-10',
        approvedBy: 'Admin User',
        approvedDate: '2024-01-12'
      }
    ];

    setTimeout(() => {
      const filteredRecords = isAdmin 
        ? mockRecords 
        : mockRecords.filter(record => record.flatNumber === userFlatNumber);
      setRecords(filteredRecords);
      setIsLoading(false);
    }, 500);
  }, [apartmentCode, isAdmin, userFlatNumber]);

  const handleSubmitRequest = () => {
    if (!newRequest.description || !newRequest.amount) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive'
      });
      return;
    }

    const newRecord: MaintenanceRecord = {
      id: Date.now().toString(),
      description: newRequest.description,
      amount: parseFloat(newRequest.amount),
      status: 'pending',
      submittedBy: userName,
      flatNumber: userFlatNumber || '',
      submittedDate: new Date().toISOString().split('T')[0]
    };

    setRecords(prev => [newRecord, ...prev]);
    setNewRequest({ description: '', amount: '' });
    setShowSubmitDialog(false);

    toast({
      title: 'Success',
      description: 'Maintenance payment request submitted'
    });
  };

  const handleStatusChange = (recordId: string, newStatus: 'approved' | 'rejected') => {
    setRecords(prev => prev.map(record => 
      record.id === recordId 
        ? { 
            ...record, 
            status: newStatus, 
            approvedBy: 'Admin User',
            approvedDate: new Date().toISOString().split('T')[0]
          }
        : record
    ));

    toast({
      title: 'Success',
      description: `Request ${newStatus} successfully`
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
        <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <DollarSign className="h-6 w-6 text-green-600" />
          <h2 className="text-2xl font-bold">Maintenance Payments</h2>
        </div>
        
        {!isAdmin && (
          <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Submit Payment Request
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit Maintenance Payment Request</DialogTitle>
                <DialogDescription>
                  Submit a request for maintenance expenses you've paid for.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the maintenance work performed..."
                    value={newRequest.description}
                    onChange={(e) => setNewRequest(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="amount">Amount ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={newRequest.amount}
                    onChange={(e) => setNewRequest(prev => ({ ...prev, amount: e.target.value }))}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleSubmitRequest} className="flex-1">
                    Submit Request
                  </Button>
                  <Button variant="outline" onClick={() => setShowSubmitDialog(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="space-y-4">
        {records.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500">No maintenance requests found.</p>
            </CardContent>
          </Card>
        ) : (
          records.map((record) => (
            <Card key={record.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    {getStatusIcon(record.status)}
                    <span>${record.amount.toFixed(2)}</span>
                  </CardTitle>
                  <Badge className={getStatusColor(record.status)}>
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </Badge>
                </div>
                <CardDescription className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{record.submittedDate}</span>
                  </span>
                  {isAdmin && (
                    <span>Apt {record.flatNumber} - {record.submittedBy}</span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{record.description}</p>
                
                {record.approvedBy && record.approvedDate && (
                  <p className="text-sm text-gray-500">
                    {record.status === 'approved' ? 'Approved' : 'Rejected'} by {record.approvedBy} on {record.approvedDate}
                  </p>
                )}

                {isAdmin && record.status === 'pending' && (
                  <div className="flex space-x-2 mt-4">
                    <Button 
                      size="sm" 
                      onClick={() => handleStatusChange(record.id, 'approved')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleStatusChange(record.id, 'rejected')}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default MaintenanceHistory;

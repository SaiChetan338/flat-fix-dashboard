
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, User, Mail, Home } from 'lucide-react';

interface Complaint {
  id: string;
  title: string;
  description: string;
  status: 'in-progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  category: string;
  createdDate: string;
  residentName: string;
  unit: string;
  building: string;
  residentEmail: string;
  assignedTo: string;
}

interface ComplaintCardProps {
  complaint: Complaint;
  onUpdate: (complaint: Complaint) => void;
  onDelete: (id: string) => void;
}

const ComplaintCard = ({ complaint, onUpdate, onDelete }: ComplaintCardProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'completed' ? 'default' : 'secondary';
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{complaint.title}</CardTitle>
            <div className="flex gap-2 mb-2">
              <Badge variant={getPriorityColor(complaint.priority)}>
                {complaint.priority}
              </Badge>
              <Badge variant={getStatusColor(complaint.status)}>
                {complaint.status === 'completed' ? (
                  <CheckCircle className="h-3 w-3 mr-1" />
                ) : (
                  <AlertCircle className="h-3 w-3 mr-1" />
                )}
                {complaint.status}
              </Badge>
            </div>
            <Badge variant="outline" className="mb-2">
              {complaint.category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4">
          {complaint.description}
        </CardDescription>
        
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{complaint.residentName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span>{complaint.unit}, {complaint.building}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>{complaint.residentEmail}</span>
          </div>
          <div className="text-xs">
            Created: {complaint.createdDate}
          </div>
          {complaint.assignedTo && (
            <div className="text-xs">
              Assigned to: {complaint.assignedTo}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplaintCard;

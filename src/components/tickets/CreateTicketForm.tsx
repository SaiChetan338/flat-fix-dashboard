
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

interface User {
  name: string;
  apartmentNumber?: string;
}

interface CreateTicketFormProps {
  user: User;
  onSuccess: () => void;
}

const CreateTicketForm = ({ user, onSuccess }: CreateTicketFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: '',
    urgency: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const ticketId = Math.random().toString(36).substr(2, 6).toUpperCase();
      toast({ 
        title: 'Ticket created successfully!', 
        description: `Your ticket #${ticketId} has been submitted and will be reviewed shortly.` 
      });
      setIsSubmitting(false);
      onSuccess();
    }, 1000);
  };

  const categories = [
    'Plumbing',
    'Electrical',
    'HVAC',
    'Appliances',
    'Maintenance',
    'Security',
    'Other'
  ];

  const priorities = [
    { value: 'low', label: 'Low - Can wait a few days' },
    { value: 'medium', label: 'Medium - Should be addressed soon' },
    { value: 'high', label: 'High - Urgent attention needed' },
    { value: 'emergency', label: 'Emergency - Immediate response required' }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Report a Maintenance Issue</CardTitle>
          <CardDescription>
            Fill out the form below to submit a maintenance request for apartment {user.apartmentNumber}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Issue Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Brief description of the issue"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleChange('category', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority *</Label>
                <Select value={formData.priority} onValueChange={(value) => handleChange('priority', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem key={priority.value} value={priority.value}>
                        {priority.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Detailed Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Please provide as much detail as possible about the issue, including when it started, specific location in your apartment, and any relevant details..."
                rows={5}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="urgency">Additional Information</Label>
              <Textarea
                id="urgency"
                value={formData.urgency}
                onChange={(e) => handleChange('urgency', e.target.value)}
                placeholder="Any additional information that might be helpful (preferred time for maintenance visit, access instructions, etc.)"
                rows={3}
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Your request will be reviewed by our maintenance team</li>
                <li>• You'll receive a confirmation with a ticket number</li>
                <li>• We'll contact you to schedule the repair</li>
                <li>• You can track the status in your dashboard</li>
              </ul>
            </div>

            <div className="flex space-x-4">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
              </Button>
              <Button type="button" variant="outline" onClick={onSuccess}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTicketForm;

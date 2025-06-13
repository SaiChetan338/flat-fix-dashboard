
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
    category: '',
    description: ''
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
    'Others'
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Report a Maintenance Issue</CardTitle>
          <CardDescription>
            Fill out the form below to submit a maintenance request
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">First Name</Label>
                <Input
                  id="name"
                  value={user.name}
                  disabled
                  className="bg-gray-100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="apartment">Apartment ID</Label>
                <Input
                  id="apartment"
                  value={user.apartmentNumber || ''}
                  disabled
                  className="bg-gray-100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Complaint Category *</Label>
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
              <Label htmlFor="description">Complaint Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Please provide a detailed description of the issue..."
                rows={5}
                required
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTicketForm;

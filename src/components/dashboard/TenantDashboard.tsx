
import { useState } from 'react';
import { Building2, Plus, Ticket, LogOut, Menu, X, Wrench, Users, DollarSign, User, Search, Filter, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import CreateTicketForm from '@/components/tickets/CreateTicketForm';
import TenantTicketList from '@/components/tickets/TenantTicketList';
import TechniciansList from '@/components/technicians/TechniciansList';
import NeighborsList from '@/components/neighbors/NeighborsList';
import MaintenanceHistory from '@/components/maintenance/MaintenanceHistory';
import ProfilePage from '@/components/profile/ProfilePage';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface User {
  phone: string;
  role: string;
  name: string;
  flatNumber?: string;
  apartmentCode?: string;
}

interface TenantDashboardProps {
  user: User;
}

const TenantDashboard = ({ user }: TenantDashboardProps) => {
  const [activeView, setActiveView] = useState('tickets');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [quickComplaintType, setQuickComplaintType] = useState("");
  const [customComplaintType, setCustomComplaintType] = useState("");
  const [quickComplaintDescription, setQuickComplaintDescription] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast({ title: 'Logged out', description: 'You have been logged out successfully' });
    navigate('/');
  };

  const handleQuickComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const complaintType = quickComplaintType === "Other" ? customComplaintType : quickComplaintType;
    if (!complaintType || !quickComplaintDescription.trim()) return;
    
    // This would normally submit to your database
    console.log('Submitting complaint:', {
      type: complaintType,
      description: quickComplaintDescription,
      user: user
    });
    
    // Reset form
    setQuickComplaintType("");
    setCustomComplaintType("");
    setQuickComplaintDescription("");
    
    toast({ title: 'Complaint submitted', description: 'Your complaint has been submitted successfully' });
  };

  const stats = [
    { title: 'Active Tickets', value: '3', description: 'Currently open requests' },
    { title: 'Resolved', value: '12', description: 'Issues resolved this year' },
    { title: 'Average Response', value: '2.5 hrs', description: 'Typical response time' }
  ];

  const menuItems = [
    { id: 'tickets', label: 'My Tickets', icon: Ticket },
    { id: 'create', label: 'Report Issue', icon: Plus },
    { id: 'technicians', label: 'Technicians', icon: Wrench },
    { id: 'neighbors', label: 'My Neighbors', icon: Users },
    { id: 'maintenance', label: 'Maintenance', icon: DollarSign }
  ];

  const getPageTitle = () => {
    if (activeView === 'profile') return 'My Profile';
    const item = menuItems.find(item => item.id === activeView);
    return item?.label || 'Dashboard';
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-3">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Fix My Flat</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* User Info */}
          <div className="p-6 border-b">
            <button
              onClick={() => {
                setActiveView('profile');
                setSidebarOpen(false);
              }}
              className="flex items-center space-x-3 w-full hover:bg-gray-50 p-2 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">Apt {user.flatNumber}</p>
              </div>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeView === item.id 
                    ? 'bg-green-100 text-green-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-6 border-t">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">
                {getPageTitle()}
              </h1>
            </div>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              Tenant Portal
            </Badge>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {activeView === 'profile' && <ProfilePage user={user} />}
          
          {activeView === 'tickets' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              {/* Welcome Header */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Hey! {user.name}
                </h2>
                <p className="text-gray-600">
                  Track and manage all your building complaints efficiently.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
                    <CardHeader className="pb-3">
                      <CardDescription>{stat.title}</CardDescription>
                      <CardTitle className="text-3xl">{stat.value}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">{stat.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Complaint Form */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Quick Complaint Submission</CardTitle>
                  <CardDescription>Submit a new complaint quickly</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleQuickComplaintSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                        <Input value={user.name} disabled className="bg-gray-50" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Apartment</label>
                        <Input value={`${user.flatNumber}, ${user.apartmentCode}`} disabled className="bg-gray-50" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Complaint Type</label>
                        <Select value={quickComplaintType} onValueChange={setQuickComplaintType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select complaint type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Plumbing">Plumbing</SelectItem>
                            <SelectItem value="Electrical">Electrical</SelectItem>
                            <SelectItem value="HVAC">HVAC</SelectItem>
                            <SelectItem value="Mechanical">Mechanical</SelectItem>
                            <SelectItem value="Noise">Noise</SelectItem>
                            <SelectItem value="Parking">Parking</SelectItem>
                            <SelectItem value="Security">Security</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {quickComplaintType === "Other" && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Custom Type</label>
                          <Input
                            value={customComplaintType}
                            onChange={(e) => setCustomComplaintType(e.target.value)}
                            placeholder="Enter complaint type"
                          />
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <Textarea
                        value={quickComplaintDescription}
                        onChange={(e) => setQuickComplaintDescription(e.target.value)}
                        placeholder="Describe your complaint in detail..."
                        className="min-h-[80px]"
                      />
                    </div>
                    
                    <Button 
                      type="submit"
                      disabled={!quickComplaintType || (quickComplaintType === "Other" && !customComplaintType.trim()) || !quickComplaintDescription.trim()}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Submit Complaint
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Filters */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <Input 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search complaints..."
                      className="max-w-md"
                    />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedFilter("all")}>
                          All Complaints
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSelectedFilter("completed")}>
                          Completed
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSelectedFilter("in-progress")}>
                          In Progress
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSelectedFilter("your-complaints")}>
                          Your Complaints
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>

              <TenantTicketList user={user} />
            </div>
          )}

          {activeView === 'create' && (
            <CreateTicketForm 
              user={user} 
              onSuccess={() => setActiveView('tickets')} 
            />
          )}

          {activeView === 'technicians' && (
            <TechniciansList 
              apartmentCode={user.apartmentCode || ''} 
              isAdmin={false}
            />
          )}

          {activeView === 'neighbors' && (
            <NeighborsList 
              apartmentCode={user.apartmentCode || ''} 
              currentUserFlatNumber={user.flatNumber}
            />
          )}

          {activeView === 'maintenance' && (
            <MaintenanceHistory 
              apartmentCode={user.apartmentCode || ''} 
              isAdmin={false}
              userFlatNumber={user.flatNumber}
              userName={user.name}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default TenantDashboard;

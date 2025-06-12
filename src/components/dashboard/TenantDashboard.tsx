import { useState } from 'react';
import { Building2, Plus, Ticket, LogOut, Menu, X, Wrench, Users, User, Search, Filter, Send } from 'lucide-react';
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
import ComplaintCard from '@/components/ComplaintCard';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { useSidebar } from '@/contexts/SidebarContext';

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
  const { isExpanded, setIsExpanded } = useSidebar();
  const [activeView, setActiveView] = useState('tickets');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [quickComplaintType, setQuickComplaintType] = useState("");
  const [customComplaintType, setCustomComplaintType] = useState("");
  const [quickComplaintDescription, setQuickComplaintDescription] = useState("");
  const navigate = useNavigate();

  // Mock complaints data - in real app, this would come from database
  const initialComplaints = [
    {
      id: "1",
      title: "Water Leakage in Bathroom",
      description: "There is a continuous water leak from the bathroom ceiling causing damage to the floor.",
      status: "in-progress" as const,
      priority: "high" as const,
      category: "Plumbing",
      createdDate: "2023-11-15",
      residentName: user.name,
      unit: user.flatNumber || "A-101",
      building: user.apartmentCode || "Building A",
      residentEmail: user.phone,
      assignedTo: "John Maintenance"
    },
    {
      id: "2",
      title: "Air Conditioning Not Working", 
      description: "The AC unit in my apartment stopped working and needs repair.",
      status: "completed" as const,
      priority: "medium" as const,
      category: "HVAC",
      createdDate: "2023-11-10",
      residentName: user.name,
      unit: user.flatNumber || "A-101",
      building: user.apartmentCode || "Building A",
      residentEmail: user.phone,
      assignedTo: "HVAC Specialist"
    }
  ];

  const [complaints, setComplaints] = useState(initialComplaints);

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast({ title: 'Logged out', description: 'You have been logged out successfully' });
    navigate('/');
  };

  const handleQuickComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const complaintType = quickComplaintType === "Other" ? customComplaintType : quickComplaintType;
    if (!complaintType || !quickComplaintDescription.trim()) return;
    
    const newComplaint = {
      id: Date.now().toString(),
      title: `${complaintType} Issue`,
      description: quickComplaintDescription,
      status: "in-progress" as const,
      priority: "medium" as const,
      category: complaintType,
      createdDate: new Date().toISOString().split('T')[0],
      residentName: user.name,
      unit: user.flatNumber || "A-101", 
      building: user.apartmentCode || "Building A",
      residentEmail: user.phone,
      assignedTo: ""
    };
    
    setComplaints([...complaints, newComplaint]);
    setQuickComplaintType("");
    setCustomComplaintType("");
    setQuickComplaintDescription("");
    
    toast({ title: 'Complaint submitted', description: 'Your complaint has been submitted successfully' });
  };

  const updateComplaint = (updatedComplaint: any) => {
    setComplaints(complaints.map(c => c.id === updatedComplaint.id ? updatedComplaint : c));
  };

  const deleteComplaint = (id: string) => {
    setComplaints(complaints.filter(c => c.id !== id));
  };

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === "completed") return matchesSearch && complaint.status === "completed";
    if (selectedFilter === "in-progress") return matchesSearch && complaint.status === "in-progress";
    if (selectedFilter === "your-complaints") return matchesSearch && complaint.residentEmail === user.phone;
    return matchesSearch;
  });

  const inProgressCount = complaints.filter(c => c.status === "in-progress").length;
  const completedCount = complaints.filter(c => c.status === "completed").length;

  const menuItems = [
    { id: 'tickets', label: 'My Tickets', icon: Ticket },
    { id: 'create', label: 'Report Issue', icon: Plus },
    { id: 'technicians', label: 'Technicians', icon: Wrench },
    { id: 'neighbors', label: 'My Neighbors', icon: Users }
  ];

  const getPageTitle = () => {
    if (activeView === 'profile') return 'My Profile';
    const item = menuItems.find(item => item.id === activeView);
    return item?.label || 'Dashboard';
  };

  if (activeView === 'profile') {
    return (
      <div className="flex h-screen bg-gray-50">
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
                onClick={() => setActiveView('profile')}
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
                  onClick={() => setActiveView(item.id)}
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

          <main className="flex-1 overflow-auto p-4 lg:p-6">
            <ProfilePage user={user} />
          </main>
        </div>
      </div>
    );
  }

  if (activeView !== 'tickets') {
    return (
      <div className="flex h-screen bg-gray-50">
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
                onClick={() => setActiveView('profile')}
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
                  onClick={() => setActiveView(item.id)}
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

        <div className="flex-1 flex flex-col overflow-hidden">
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

          <main className="flex-1 overflow-auto p-4 lg:p-6">
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
          </main>
        </div>
      </div>
    );
  }

  // New tickets view with the provided structure
  return (
    <div className="flex min-h-screen">
      {/* Fixed Sidebar */}
      <aside className={`fixed top-0 left-0 bottom-0 bg-white border-r border-border overflow-y-auto overflow-x-hidden flex flex-col transition-all duration-300 ease-in-out z-50 ${
        sidebarOpen ? 'w-70 translate-x-0' : 'w-0 -translate-x-full'
      } lg:w-70 lg:translate-x-0`}>
        {/* Resident Name at Top */}
        <div className="p-4 border-b border-border bg-secondary/50">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            <p className="text-base font-semibold text-foreground">
              {user.name}
            </p>
          </div>
        </div>

        {/* User Details */}
        <div className="p-4 border-b border-border">
          <div className="text-sm text-muted-foreground">
            <p>Unit: {user.flatNumber}</p>
            <p>Building: {user.apartmentCode}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="list-none p-0 m-0 space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Button
                  variant={activeView === item.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveView(item.id)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Button>
              </li>
            ))}
            <li>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => setActiveView('profile')}
              >
                <User className="w-5 h-5 mr-3" />
                Profile
              </Button>
            </li>
          </ul>
        </nav>

        {/* Logout section */}
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 bg-background min-h-screen p-8 transition-margin duration-300 ease-in-out ${
        sidebarOpen ? 'lg:ml-70' : 'lg:ml-70'
      }`}>
        {/* Header with Logo and Title */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </Button>
            <div className="flex items-center gap-3">
              <Building2 className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Fix My Flat
                </h1>
                <p className="text-sm text-muted-foreground">
                  Complaint Management System
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Complaint Management
            </h1>
            <div className="mb-2">
              <h2 className="text-2xl font-semibold text-muted-foreground">
                Hey! {user.name}
              </h2>
            </div>
            <p className="text-muted-foreground">
              Track and manage all building complaints efficiently.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-100 rounded-full">
                    <Ticket className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">In Progress Complaints</p>
                    <p className="text-2xl font-bold text-foreground">{inProgressCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Ticket className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Completed Complaints</p>
                    <p className="text-2xl font-bold text-foreground">{completedCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Complaint Submission Bar */}
          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-md mb-8">
            <CardContent className="p-6">
              <form onSubmit={handleQuickComplaintSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Your Name</label>
                    <Input
                      value={user.name}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Apartment ID</label>
                    <Input
                      value={`${user.flatNumber}, ${user.apartmentCode}`}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Complaint Type</label>
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
                      <label className="block text-sm font-medium text-foreground mb-1">Custom Complaint Type</label>
                      <Input
                        value={customComplaintType}
                        onChange={(e) => setCustomComplaintType(e.target.value)}
                        placeholder="Enter complaint type"
                      />
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Complaint Description</label>
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
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredComplaints.length} of {complaints.length} complaints
            </p>
          </div>

          {/* Filter Bar Card */}
          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-md mb-8">
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
                      Completed Complaints
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedFilter("in-progress")}>
                      In Progress Complaints
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedFilter("your-complaints")}>
                      Your Complaints
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>

          {/* Complaints Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredComplaints.map((complaint) => (
              <ComplaintCard
                key={complaint.id}
                complaint={complaint}
                onUpdate={updateComplaint}
                onDelete={deleteComplaint}
              />
            ))}
          </div>

          {/* No Complaints Message */}
          {filteredComplaints.length === 0 && (
            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-md">
              <CardContent className="p-12 text-center">
                <Ticket className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No complaints found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or submit a new complaint using the form above.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default TenantDashboard;

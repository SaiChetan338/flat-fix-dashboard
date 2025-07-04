
import { useState } from 'react';
import { Building2, Ticket, Users, Wrench, LogOut, Menu, X, DollarSign, User, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import TicketManagement from '@/components/tickets/TicketManagement';
import CreateTicketForm from '@/components/tickets/CreateTicketForm';
import TechnicianManagement from '@/components/technicians/TechnicianManagement';
import NeighborsList from '@/components/neighbors/NeighborsList';
import MaintenanceHistory from '@/components/maintenance/MaintenanceHistory';
import ProfilePage from '@/components/profile/ProfilePage';
import FlatSelector from '@/components/dashboard/FlatSelector';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface User {
  phone: string;
  role: string;
  name: string;
  flatNumber?: string;
  numberOfFlats?: number;
  ownedFlats?: string[];
  apartmentCode?: string;
  selectedFlat?: string;
}

interface AdminDashboardProps {
  user: User;
}

const AdminDashboard = ({ user }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFlat, setSelectedFlat] = useState(user.selectedFlat || user.flatNumber || '');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast({ title: 'Logged out', description: 'You have been logged out successfully' });
    navigate('/');
  };

  const handleFlatChange = (flat: string) => {
    setSelectedFlat(flat);
    // Update user object with selected flat for components that need it
    const updatedUser = { ...user, selectedFlat: flat };
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const stats = [
    { title: 'Total Tickets', value: '24', description: 'Active maintenance requests' },
    { title: 'Unassigned', value: '8', description: 'Waiting for assignment' },
    { title: 'In Progress', value: '12', description: 'Currently being handled' },
    { title: 'Completed', value: '156', description: 'Resolved this month' }
  ];

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Building2 },
    { id: 'tickets', label: 'Tickets', icon: Ticket },
    { id: 'create-ticket', label: 'Report Issue', icon: Plus },
    { id: 'technicians', label: 'Technicians', icon: Wrench },
    { id: 'neighbors', label: 'All Residents', icon: Users },
    { id: 'maintenance', label: 'Maintenance', icon: DollarSign }
  ];

  const getPageTitle = () => {
    if (activeTab === 'profile') return 'My Profile';
    if (activeTab === 'create-ticket') return 'Report Issue';
    const item = menuItems.find(item => item.id === activeTab);
    return item?.label || 'Dashboard';
  };

  const userWithSelectedFlat = { ...user, selectedFlat };

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
                setActiveTab('profile');
                setSidebarOpen(false);
              }}
              className="flex items-center space-x-3 w-full hover:bg-gray-50 p-2 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">Administrator</p>
              </div>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium text-sm">{item.label}</span>
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
            <div className="flex items-center space-x-4">
              <FlatSelector 
                ownedFlats={user.ownedFlats || [user.flatNumber || '']}
                selectedFlat={selectedFlat}
                onFlatChange={handleFlatChange}
              />
              <Badge variant="secondary" className="hidden sm:inline-flex">
                Admin Panel
              </Badge>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {activeTab === 'profile' && <ProfilePage user={userWithSelectedFlat} />}
          
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index}>
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

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Manage your property efficiently</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button onClick={() => setActiveTab('tickets')} className="h-20 flex-col space-y-2">
                      <Ticket className="h-6 w-6" />
                      <span>Manage Tickets</span>
                    </Button>
                    <Button onClick={() => setActiveTab('technicians')} variant="outline" className="h-20 flex-col space-y-2">
                      <Wrench className="h-6 w-6" />
                      <span>Manage Technicians</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'tickets' && <TicketManagement />}
          
          {activeTab === 'create-ticket' && (
            <CreateTicketForm 
              user={userWithSelectedFlat} 
              onSuccess={() => setActiveTab('tickets')} 
            />
          )}
          
          {activeTab === 'technicians' && <TechnicianManagement />}

          {activeTab === 'neighbors' && (
            <NeighborsList 
              apartmentCode={user.apartmentCode || ''}
            />
          )}

          {activeTab === 'maintenance' && (
            <MaintenanceHistory 
              apartmentCode={user.apartmentCode || ''} 
              isAdmin={true}
              userName={user.name}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

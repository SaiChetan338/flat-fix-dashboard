
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Wrench, Users, Shield, CheckCircle, ArrowRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LoginForm from '@/components/auth/LoginForm';

const Index = () => {
  const [showLogin, setShowLogin] = useState(false);

  const features = [
    {
      icon: Wrench,
      title: "Easy Ticket Management",
      description: "Report and track maintenance issues with just a few clicks"
    },
    {
      icon: Users,
      title: "Tenant Communication", 
      description: "Streamlined communication between tenants and management"
    },
    {
      icon: Shield,
      title: "Admin Dashboard",
      description: "Comprehensive management tools for property administrators"
    },
    {
      icon: CheckCircle,
      title: "Quick Resolution",
      description: "Fast assignment and tracking of maintenance requests"
    }
  ];

  const handleSwitchToSignup = () => {
    // For now, just hide login and show main page
    // This can be expanded later to show a signup form
    setShowLogin(false);
  };

  if (showLogin) {
    return <LoginForm onBack={() => setShowLogin(false)} onSwitchToSignup={handleSwitchToSignup} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Fix My Flat</span>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => setShowLogin(true)}>
                Login
              </Button>
              <Button asChild>
                <Link to="/register-apartment">
                  <Plus className="mr-2 h-4 w-4" />
                  Register Apartment
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Simplify Your
            <span className="text-blue-600 block">Apartment Management</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Streamline maintenance requests, manage tenants, and keep your property running smoothly with our comprehensive apartment administration platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="text-lg px-8 py-3">
              <Link to="/register-apartment">
                Register New Apartment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-3">
              <Link to="/resident-registration">
                Join as Resident
              </Link>
            </Button>
            <Button size="lg" variant="outline" onClick={() => setShowLogin(true)} className="text-lg px-8 py-3">
              Sign In to Dashboard
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Your Property
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From tenant requests to technician management, we've got you covered.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <feature.icon className="icon" />
                <div className="textBox">
                  <p className="text head">{feature.title}</p>
                  <span>Feature</span>
                  <p className="text description">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Property Management?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of property managers who have streamlined their operations with Fix My Flat.
          </p>
          <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-3">
            <Link to="/register-apartment">
              Register Free
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Building2 className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold">Fix My Flat</span>
          </div>
          <p className="text-center text-gray-400">
            © 2024 Fix My Flat. All rights reserved. Simplifying apartment management one property at a time.
          </p>
        </div>
      </footer>

      <style jsx>{`
        .feature-card {
          width: 195px;
          height: 285px;
          background: #313131;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          transition: 0.2s ease-in-out;
          margin: 0 auto;
          position: relative;
        }

        .icon {
          height: 30%;
          width: 30%;
          position: absolute;
          transition: 0.2s ease-in-out;
          z-index: 1;
          color: white;
        }

        .textBox {
          opacity: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 15px;
          transition: 0.2s ease-in-out;
          z-index: 2;
          padding: 20px;
          text-align: center;
        }

        .textBox > .text {
          font-weight: bold;
          margin: 0;
        }

        .textBox > .head {
          font-size: 20px;
        }

        .textBox > .description {
          font-size: 14px;
          line-height: 1.4;
        }

        .textBox > span {
          font-size: 12px;
          color: lightgrey;
        }

        .feature-card:hover > .textBox {
          opacity: 1;
        }

        .feature-card:hover > .icon {
          height: 65%;
          width: 65%;
          filter: blur(7px);
          animation: anim 3s infinite;
        }

        @keyframes anim {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0);
          }
        }

        .feature-card:hover {
          transform: scale(1.04) rotate(-1deg);
        }
      `}</style>
    </div>
  );
};

export default Index;

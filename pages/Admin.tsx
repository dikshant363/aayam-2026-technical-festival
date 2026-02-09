
import React, { useState, useEffect } from 'react';
import { storageService } from '../services/storage';
import { SponsorApplication, ContactMessage } from '../types';
import { LogOut, LayoutDashboard, MessageSquare, Download, Users, Briefcase, CheckCircle, Clock } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell 
} from 'recharts';

const COLORS = ['#2E5090', '#FF6B35', '#28A745', '#FFBB28', '#8884d8', '#82ca9d'];

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(storageService.isAuthenticated());
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'applications' | 'messages'>('dashboard');
  
  const [applications, setApplications] = useState<SponsorApplication[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      setApplications(storageService.getApplications());
      setMessages(storageService.getMessages());
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (storageService.login('admin@aayam.com', password)) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password (Try: admin123)');
    }
  };

  const handleLogout = () => {
    storageService.logout();
    setIsAuthenticated(false);
  };

  const updateStatus = (id: string, newStatus: SponsorApplication['status']) => {
    storageService.updateApplicationStatus(id, newStatus);
    setApplications(storageService.getApplications());
  };

  // Analytics Logic
  const confirmedCount = applications.filter(a => a.status === 'confirmed').length;
  const pendingCount = applications.filter(a => a.status === 'pending').length;

  // Prepare Chart Data
  const getPackageData = () => {
    const counts: Record<string, number> = {};
    applications.forEach(app => {
      // Normalize package name to remove price if present or just use first word for cleaner chart
      const key = app.package.split('(')[0].trim();
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
  };

  const getCategoryData = () => {
    const counts: Record<string, number> = {};
    applications.forEach(app => {
      counts[app.category] = (counts[app.category] || 0) + 1;
    });
    return Object.keys(counts).map(key => ({ name: key, applicants: counts[key] }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Admin Login</h2>
            <p className="mt-2 text-sm text-gray-600">Enter password to access dashboard</p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Sign in
              </button>
            </div>
            <div className="text-center text-xs text-gray-400">Hint: admin123</div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-body">
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-800 font-heading">AAYAM Admin</span>
            </div>
            <div className="flex items-center">
              <button onClick={handleLogout} className="flex items-center text-gray-500 hover:text-red-600 transition-colors">
                <LogOut size={18} className="mr-2" /> Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-6 bg-white px-4 rounded-t-lg shadow-sm">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`${activeTab === 'dashboard' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <LayoutDashboard size={16} className="mr-2" /> Dashboard
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`${activeTab === 'applications' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <Briefcase size={16} className="mr-2" /> All Applications
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`${activeTab === 'messages' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <MessageSquare size={16} className="mr-2" /> Messages
            </button>
          </nav>
        </div>

        {/* Dashboard View */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white overflow-hidden shadow rounded-lg p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Applications</dt>
                      <dd className="text-3xl font-semibold text-gray-900">{applications.length}</dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Confirmed Sponsors</dt>
                      <dd className="text-3xl font-semibold text-gray-900">{confirmedCount}</dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Pending Review</dt>
                      <dd className="text-3xl font-semibold text-gray-900">{pendingCount}</dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-orange-100 rounded-md p-3">
                    <MessageSquare className="h-6 w-6 text-secondary" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">New Messages</dt>
                      <dd className="text-3xl font-semibold text-gray-900">{messages.length}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pie Chart */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-bold text-gray-800 mb-4 font-heading">Applications by Package</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={getPackageData()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {getPackageData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-bold text-gray-800 mb-4 font-heading">Applications by Industry</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={getCategoryData()}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="applicants" fill="#2E5090" name="Applicants" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Recent Applications Table (Compact) */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 font-heading">
                  Recent Applications
                </h3>
              </div>
              <ul className="divide-y divide-gray-200">
                {applications.slice(0, 5).map((app) => (
                  <li key={app.id}>
                    <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-primary">{app.companyName}</p>
                        <p className="text-sm text-gray-500">{app.package} • {app.contactPerson}</p>
                      </div>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${app.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                          app.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {app.status}
                      </span>
                    </div>
                  </li>
                ))}
                {applications.length === 0 && (
                   <li className="px-4 py-8 text-center text-gray-500">No applications found.</li>
                )}
              </ul>
              <div className="bg-gray-50 px-4 py-4 sm:px-6 text-center">
                <button onClick={() => setActiveTab('applications')} className="text-sm text-primary font-medium hover:text-blue-800">
                  View All Applications
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Applications List View */}
        {activeTab === 'applications' && (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {applications.length === 0 ? (
               <div className="p-6 text-center text-gray-500">No applications yet.</div>
            ) : (
            <ul className="divide-y divide-gray-200">
              {applications.map((app) => (
                <li key={app.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-primary truncate">{app.companyName}</p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${app.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                            app.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                            'bg-yellow-100 text-yellow-800'}`}>
                          {app.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500 mr-6">
                          <Users size={14} className="mr-1.5 text-gray-400" />
                          {app.contactPerson}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          <Briefcase size={14} className="mr-1.5 text-gray-400" />
                          {app.package}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          <Clock size={14} className="mr-1.5 text-gray-400" />
                          {new Date(app.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                       <span className="font-semibold">Contact:</span> {app.email} | {app.phone}
                    </div>
                    {/* Action Buttons */}
                    <div className="mt-4 flex space-x-3 justify-end border-t border-gray-100 pt-3">
                       <button onClick={() => updateStatus(app.id, 'confirmed')} className="text-xs bg-green-50 text-green-700 hover:bg-green-100 px-3 py-1 rounded border border-green-200 font-bold transition-colors">Confirm</button>
                       <button onClick={() => updateStatus(app.id, 'contacted')} className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1 rounded border border-blue-200 font-bold transition-colors">Mark Contacted</button>
                       <button onClick={() => updateStatus(app.id, 'rejected')} className="text-xs bg-red-50 text-red-700 hover:bg-red-100 px-3 py-1 rounded border border-red-200 font-bold transition-colors">Reject</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            )}
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                 <Download size={16} className="mr-2"/> Export CSV (Demo)
              </button>
            </div>
          </div>
        )}

        {/* Messages View */}
        {activeTab === 'messages' && (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {messages.length === 0 ? (
              <div className="p-6 text-center text-gray-500">No messages yet.</div>
            ) : (
            <ul className="divide-y divide-gray-200">
               {messages.map((msg) => (
                 <li key={msg.id} className="px-4 py-4 sm:px-6">
                   <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold text-gray-900">{msg.name} <span className="text-gray-400 font-normal ml-1">&lt;{msg.email}&gt;</span></h4>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{new Date(msg.timestamp).toLocaleDateString()}</span>
                   </div>
                   <div className="mt-1 text-xs text-gray-500">{msg.phone}</div>
                   <p className="mt-3 text-sm text-gray-700 bg-gray-50 p-3 rounded">{msg.message}</p>
                 </li>
               ))}
            </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;

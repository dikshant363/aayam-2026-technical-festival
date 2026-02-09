
import React, { useEffect, useState } from 'react';
import { storageService } from '../services/storage';
import { SponsorApplication, ContactMessage } from '../types';
import { Users, CheckCircle, Clock, TrendingUp, MessageSquare, Download, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell 
} from 'recharts';

const COLORS = ['#2E5090', '#FF6B35', '#28A745', '#FFBB28', '#8884d8', '#82ca9d'];

const AdminDashboard: React.FC = () => {
  const [applications, setApplications] = useState<SponsorApplication[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    setApplications(storageService.getApplications());
    setMessages(storageService.getMessages());
  }, []);

  const pendingCount = applications.filter(a => a.status === 'pending').length;
  const confirmedCount = applications.filter(a => a.status === 'confirmed').length;
  
  // Calculate mock revenue
  const revenue = applications
    .filter(a => a.status === 'confirmed')
    .reduce((acc, curr) => {
        const val = parseInt(curr.budget.replace(/[^0-9]/g, '')) || 0;
        // Simple heuristic for demo: if value < 100 assume it's Lakhs, else thousands.
        return acc + (val < 100 ? val * 100000 : val);
    }, 0);

  const getPackageData = () => {
    const counts: Record<string, number> = {};
    applications.forEach(app => {
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-heading">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-gray-500">Total Applications</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-2">{applications.length}</h3>
                </div>
                <div className="p-3 bg-blue-50 text-primary rounded-lg">
                    <Users size={24} />
                </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
                <span className="text-green-500 font-medium flex items-center">
                    <TrendingUp size={16} className="mr-1" /> +12%
                </span>
                <span className="text-gray-400 ml-2">from last week</span>
            </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-gray-500">Pending Review</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-2">{pendingCount}</h3>
                </div>
                <div className="p-3 bg-yellow-50 text-yellow-600 rounded-lg">
                    <Clock size={24} />
                </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
                Requires immediate attention
            </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-gray-500">Confirmed Revenue</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-2">₹{(revenue/1000).toFixed(1)}k</h3>
                </div>
                <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                    <CheckCircle size={24} />
                </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
                From {confirmedCount} sponsors
            </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-gray-500">New Messages</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-2">{messages.filter(m => m.status === 'unread').length}</h3>
                </div>
                <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
                    <MessageSquare size={24} />
                </div>
            </div>
             <div className="mt-4 text-sm text-primary hover:underline">
                <Link to="/admin/messages">View all messages</Link>
            </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <h3 className="text-lg font-bold text-gray-800 mb-6 font-heading">Applications by Package</h3>
           <div className="h-80">
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

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <h3 className="text-lg font-bold text-gray-800 mb-6 font-heading">Applications by Industry</h3>
           <div className="h-80">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart
                 data={getCategoryData()}
                 margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
               >
                 <CartesianGrid strokeDasharray="3 3" />
                 <XAxis dataKey="name" />
                 <YAxis allowDecimals={false} />
                 <Tooltip />
                 <Bar dataKey="applicants" fill="#2E5090" radius={[4, 4, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>

      {/* Recent Applications Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-900 font-heading">Recent Applications</h3>
            <Link to="/admin/applications" className="text-sm text-primary font-medium hover:text-blue-800 flex items-center">
                View All <ArrowRight size={16} className="ml-1" />
            </Link>
        </div>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {applications.slice(0, 5).map((app) => (
                        <tr key={app.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{app.companyName}</div>
                                <div className="text-sm text-gray-500">{app.contactPerson}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {app.package}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(app.timestamp).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                  ${app.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                                    app.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                                    'bg-yellow-100 text-yellow-800'}`}>
                                  {app.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                    {applications.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No applications found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

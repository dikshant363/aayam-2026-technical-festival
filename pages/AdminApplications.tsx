
import React, { useState, useEffect, useMemo } from 'react';
import { storageService } from '../services/storage';
import { SponsorApplication } from '../types';
import { Search, Filter, Download, MoreVertical, X, Check, Eye, Trash2 } from 'lucide-react';

const AdminApplications: React.FC = () => {
  const [applications, setApplications] = useState<SponsorApplication[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApp, setSelectedApp] = useState<SponsorApplication | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    setApplications(storageService.getApplications());
  }, []);

  const filteredApps = useMemo(() => {
    return applications.filter(app => {
      const matchesStatus = filterStatus === 'All' || app.status === filterStatus.toLowerCase();
      const matchesSearch = app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            app.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            app.email.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [applications, filterStatus, searchTerm]);

  const handleView = (app: SponsorApplication) => {
    setSelectedApp(app);
    setNotes(app.notes || '');
    setIsModalOpen(true);
  };

  const handleUpdateStatus = (newStatus: SponsorApplication['status']) => {
    if (selectedApp) {
        const updated = { ...selectedApp, status: newStatus, notes };
        storageService.updateApplication(updated);
        setApplications(storageService.getApplications());
        setSelectedApp(updated);
        // Toast logic could go here
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
        storageService.deleteApplication(id);
        setApplications(storageService.getApplications());
        setIsModalOpen(false);
    }
  };

  const handleSaveNotes = () => {
      if (selectedApp) {
          const updated = { ...selectedApp, notes };
          storageService.updateApplication(updated);
          setApplications(storageService.getApplications());
          alert('Notes saved!');
      }
  };

  const exportCSV = () => {
      const headers = ['Company', 'Contact Person', 'Email', 'Phone', 'Package', 'Budget', 'Status', 'Date'];
      const rows = filteredApps.map(app => [
          app.companyName,
          app.contactPerson,
          app.email,
          app.phone,
          app.package,
          app.budget,
          app.status,
          new Date(app.timestamp).toLocaleDateString()
      ]);
      
      const csvContent = "data:text/csv;charset=utf-8," 
          + headers.join(",") + "\n" 
          + rows.map(e => e.join(",")).join("\n");
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "applications_export.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 font-heading">Applications Management</h1>
        <button 
            onClick={exportCSV}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
            <Download size={16} className="mr-2" /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
                type="text" 
                placeholder="Search company, name or email..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
            <Filter size={18} className="text-gray-500" />
            {['All', 'Pending', 'Confirmed', 'Contacted', 'Rejected'].map(status => (
                <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                        filterStatus === status 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    {status}
                </button>
            ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Info</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {filteredApps.length > 0 ? (
                        filteredApps.map((app) => (
                            <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(app.timestamp).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-gray-900">{app.companyName}</div>
                                    <div className="text-sm text-gray-500">{app.contactPerson}</div>
                                    <div className="text-xs text-gray-400">{app.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{app.package}</div>
                                    <div className="text-xs text-gray-500">Budget: {app.budget}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                    ${app.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                                        app.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                                        'bg-yellow-100 text-yellow-800'}`}>
                                    {app.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button 
                                        onClick={() => handleView(app)}
                                        className="text-primary hover:text-blue-900 bg-blue-50 p-2 rounded-full hover:bg-blue-100 transition-colors"
                                    >
                                        <Eye size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                No applications found matching your filters.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        {/* Pagination placeholder */}
        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6 flex justify-between items-center">
            <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{filteredApps.length}</span> results
            </div>
            <div className="flex-1 flex justify-end space-x-3">
                <button disabled className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-400 cursor-not-allowed">Previous</button>
                <button disabled className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-400 cursor-not-allowed">Next</button>
            </div>
        </div>
      </div>

      {/* Detail Modal */}
      {isModalOpen && selectedApp && (
        <div className="fixed inset-0 z-[60] overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={() => setIsModalOpen(false)}>
                    <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                    <div className="absolute top-0 right-0 pt-4 pr-4">
                        <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="px-6 pt-6 pb-4 bg-gray-50 border-b border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900">{selectedApp.companyName}</h3>
                        <p className="text-sm text-gray-500">Application ID: {selectedApp.id}</p>
                    </div>

                    <div className="px-6 py-6 space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Contact Info</h4>
                                <div className="mt-2 space-y-1">
                                    <p className="text-sm font-bold">{selectedApp.contactPerson}</p>
                                    <p className="text-sm text-gray-600">{selectedApp.email}</p>
                                    <p className="text-sm text-gray-600">{selectedApp.phone}</p>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Package Details</h4>
                                <div className="mt-2 space-y-1">
                                    <p className="text-sm font-bold text-primary">{selectedApp.package}</p>
                                    <p className="text-sm text-gray-600">Category: {selectedApp.category}</p>
                                    <p className="text-sm text-gray-600">Budget: {selectedApp.budget}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Message</h4>
                            <p className="mt-2 text-sm text-gray-700 bg-gray-50 p-3 rounded-md border border-gray-200">
                                {selectedApp.message || 'No message provided.'}
                            </p>
                        </div>

                        <div>
                            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Internal Notes</h4>
                            <textarea 
                                className="w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
                                rows={3}
                                placeholder="Add internal notes here..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            ></textarea>
                            <div className="mt-2 flex justify-end">
                                <button onClick={handleSaveNotes} className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-gray-700 font-medium">
                                    Save Notes
                                </button>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-6">
                            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Update Status</h4>
                            <div className="flex flex-wrap gap-3">
                                <button 
                                    onClick={() => handleUpdateStatus('confirmed')}
                                    className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${selectedApp.status === 'confirmed' ? 'bg-green-600 text-white ring-2 ring-offset-2 ring-green-600' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                                >
                                    <Check className="mr-2" size={16} /> Confirm
                                </button>
                                <button 
                                    onClick={() => handleUpdateStatus('contacted')}
                                    className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${selectedApp.status === 'contacted' ? 'bg-blue-600 text-white ring-2 ring-offset-2 ring-blue-600' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                                >
                                    Mark Contacted
                                </button>
                                <button 
                                    onClick={() => handleUpdateStatus('rejected')}
                                    className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${selectedApp.status === 'rejected' ? 'bg-red-600 text-white ring-2 ring-offset-2 ring-red-600' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                                >
                                    Reject
                                </button>
                                <div className="flex-1"></div>
                                <button 
                                    onClick={() => handleDelete(selectedApp.id)}
                                    className="flex items-center px-4 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 border border-transparent"
                                >
                                    <Trash2 className="mr-2" size={16} /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default AdminApplications;

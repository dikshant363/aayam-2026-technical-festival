
import React, { useState, useEffect } from 'react';
import { storageService } from '../services/storage';
import { TeamMember, FaqItem } from '../types';
import { Plus, Trash2, Edit2, Save, X, Users, HelpCircle } from 'lucide-react';

const AdminContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'team' | 'faq'>('team');
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  
  // Edit States
  const [editingTeam, setEditingTeam] = useState<Partial<TeamMember> | null>(null);
  const [editingFaq, setEditingFaq] = useState<Partial<FaqItem> | null>(null);

  useEffect(() => {
    setTeam(storageService.getTeam());
    setFaqs(storageService.getFaqs());
  }, []);

  // Team Helpers
  const handleSaveTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeam?.name || !editingTeam?.role) return;
    
    const member: TeamMember = {
        id: editingTeam.id || crypto.randomUUID(),
        name: editingTeam.name,
        role: editingTeam.role,
        image: editingTeam.image || 'https://picsum.photos/seed/new/300/300',
        category: editingTeam.category || 'Organizing',
        email: editingTeam.email,
        phone: editingTeam.phone
    };
    storageService.saveTeamMember(member);
    setTeam(storageService.getTeam());
    setEditingTeam(null);
  };

  const handleDeleteTeam = (id: string) => {
    if(window.confirm('Delete member?')) {
        storageService.deleteTeamMember(id);
        setTeam(storageService.getTeam());
    }
  };

  // FAQ Helpers
  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq?.question || !editingFaq?.answer) return;

    const faq: FaqItem = {
        id: editingFaq.id || crypto.randomUUID(),
        question: editingFaq.question,
        answer: editingFaq.answer,
        category: editingFaq.category || 'General'
    };
    storageService.saveFaq(faq);
    setFaqs(storageService.getFaqs());
    setEditingFaq(null);
  };

  const handleDeleteFaq = (id: string) => {
      if(window.confirm('Delete FAQ?')) {
          storageService.deleteFaq(id);
          setFaqs(storageService.getFaqs());
      }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold text-gray-900 font-heading">Content Manager</h1>
            <p className="text-gray-500">Update team members and FAQs.</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-lg">
            <button
                onClick={() => setActiveTab('team')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'team' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
                <Users size={16} className="inline mr-2" /> Team
            </button>
            <button
                onClick={() => setActiveTab('faq')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'faq' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
                <HelpCircle size={16} className="inline mr-2" /> FAQs
            </button>
        </div>
      </div>

      {activeTab === 'team' && (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800">Team Members ({team.length})</h3>
                <button 
                    onClick={() => setEditingTeam({})} 
                    className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center hover:bg-blue-800"
                >
                    <Plus size={16} className="mr-2" /> Add Member
                </button>
            </div>

            {/* Edit Modal */}
            {editingTeam && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">{editingTeam.id ? 'Edit Member' : 'Add New Member'}</h3>
                            <button onClick={() => setEditingTeam(null)}><X size={20} className="text-gray-400" /></button>
                        </div>
                        <form onSubmit={handleSaveTeam} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input className="w-full border rounded-md p-2 mt-1" required value={editingTeam.name || ''} onChange={e => setEditingTeam({...editingTeam, name: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Role</label>
                                <input className="w-full border rounded-md p-2 mt-1" required value={editingTeam.role || ''} onChange={e => setEditingTeam({...editingTeam, role: e.target.value})} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Category</label>
                                    <select className="w-full border rounded-md p-2 mt-1" value={editingTeam.category || 'Organizing'} onChange={e => setEditingTeam({...editingTeam, category: e.target.value as any})}>
                                        <option value="Faculty">Faculty</option>
                                        <option value="Sponsorship">Sponsorship</option>
                                        <option value="Organizing">Organizing</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                                    <input className="w-full border rounded-md p-2 mt-1" placeholder="https://..." value={editingTeam.image || ''} onChange={e => setEditingTeam({...editingTeam, image: e.target.value})} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email (Optional)</label>
                                    <input className="w-full border rounded-md p-2 mt-1" type="email" value={editingTeam.email || ''} onChange={e => setEditingTeam({...editingTeam, email: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone (Optional)</label>
                                    <input className="w-full border rounded-md p-2 mt-1" value={editingTeam.phone || ''} onChange={e => setEditingTeam({...editingTeam, phone: e.target.value})} />
                                </div>
                            </div>
                            <div className="pt-4">
                                <button type="submit" className="w-full bg-primary text-white py-2 rounded-md font-bold hover:bg-blue-800">Save Member</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {team.map(member => (
                    <div key={member.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
                        <img src={member.image} alt={member.name} className="w-16 h-16 rounded-full object-cover bg-gray-100" />
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900 truncate">{member.name}</h4>
                            <p className="text-xs text-gray-500 truncate">{member.role}</p>
                            <span className="text-[10px] uppercase bg-gray-100 px-2 py-0.5 rounded text-gray-600 mt-1 inline-block">{member.category}</span>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <button onClick={() => setEditingTeam(member)} className="text-blue-500 hover:bg-blue-50 p-1.5 rounded"><Edit2 size={16} /></button>
                            <button onClick={() => handleDeleteTeam(member.id)} className="text-red-500 hover:bg-red-50 p-1.5 rounded"><Trash2 size={16} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )}

      {activeTab === 'faq' && (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800">Frequently Asked Questions ({faqs.length})</h3>
                <button 
                    onClick={() => setEditingFaq({})} 
                    className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center hover:bg-blue-800"
                >
                    <Plus size={16} className="mr-2" /> Add FAQ
                </button>
            </div>

            {/* Edit Modal */}
            {editingFaq && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">{editingFaq.id ? 'Edit FAQ' : 'Add New FAQ'}</h3>
                            <button onClick={() => setEditingFaq(null)}><X size={20} className="text-gray-400" /></button>
                        </div>
                        <form onSubmit={handleSaveFaq} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Question</label>
                                <input className="w-full border rounded-md p-2 mt-1" required value={editingFaq.question || ''} onChange={e => setEditingFaq({...editingFaq, question: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Answer</label>
                                <textarea className="w-full border rounded-md p-2 mt-1" rows={4} required value={editingFaq.answer || ''} onChange={e => setEditingFaq({...editingFaq, answer: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <select className="w-full border rounded-md p-2 mt-1" value={editingFaq.category || 'General'} onChange={e => setEditingFaq({...editingFaq, category: e.target.value as any})}>
                                    <option value="General">General</option>
                                    <option value="Sponsorship">Sponsorship</option>
                                    <option value="Events">Events</option>
                                    <option value="Logistics">Logistics</option>
                                </select>
                            </div>
                            <div className="pt-4">
                                <button type="submit" className="w-full bg-primary text-white py-2 rounded-md font-bold hover:bg-blue-800">Save FAQ</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="space-y-4">
                {faqs.map(faq => (
                    <div key={faq.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative group">
                        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => setEditingFaq(faq)} className="text-blue-500 hover:bg-blue-50 p-2 rounded"><Edit2 size={16} /></button>
                            <button onClick={() => handleDeleteFaq(faq.id)} className="text-red-500 hover:bg-red-50 p-2 rounded"><Trash2 size={16} /></button>
                        </div>
                        <span className="text-xs font-bold text-primary bg-blue-50 px-2 py-1 rounded mb-2 inline-block">{faq.category}</span>
                        <h4 className="font-bold text-gray-900 mb-2 pr-12">{faq.question}</h4>
                        <p className="text-sm text-gray-600">{faq.answer}</p>
                    </div>
                ))}
            </div>
        </div>
      )}
    </div>
  );
};

export default AdminContent;

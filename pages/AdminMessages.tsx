
import React, { useState, useEffect } from 'react';
import { storageService } from '../services/storage';
import { ContactMessage } from '../types';
import { Mail, Phone, Trash2, CheckCircle, Clock } from 'lucide-react';

const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    setMessages(storageService.getMessages());
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this message?')) {
      storageService.deleteMessage(id);
      setMessages(storageService.getMessages());
    }
  };

  const handleMarkStatus = (id: string, status: ContactMessage['status']) => {
    storageService.updateMessageStatus(id, status);
    setMessages(storageService.getMessages());
  };

  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-2xl font-bold text-gray-900 font-heading">Messages</h1>
        <p className="text-gray-500">Manage inquiries from the contact form.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {messages.length === 0 ? (
          <div className="bg-white p-12 rounded-xl text-center text-gray-500 border border-gray-200">
            <Mail size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-lg">No messages found.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`bg-white p-6 rounded-xl shadow-sm border transition-all ${msg.status === 'unread' ? 'border-l-4 border-l-primary border-t-gray-100 border-r-gray-100 border-b-gray-100' : 'border-gray-100 opacity-90'}`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white mr-3 ${msg.status === 'unread' ? 'bg-primary' : 'bg-gray-400'}`}>
                    {msg.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{msg.name}</h3>
                    <div className="text-xs text-gray-500 flex items-center">
                      <Clock size={12} className="mr-1" />
                      {new Date(msg.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                   {msg.status !== 'replied' && (
                     <button 
                        onClick={() => handleMarkStatus(msg.id, 'replied')}
                        className="text-green-600 hover:bg-green-50 p-2 rounded-full transition-colors"
                        title="Mark as Replied"
                     >
                        <CheckCircle size={20} />
                     </button>
                   )}
                   <button 
                      onClick={() => handleDelete(msg.id)}
                      className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-colors"
                      title="Delete"
                   >
                      <Trash2 size={20} />
                   </button>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-4 text-gray-700 text-sm leading-relaxed border border-gray-100">
                {msg.message}
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center bg-white px-3 py-1 rounded-full border border-gray-200">
                   <Mail size={14} className="mr-2 text-primary" />
                   <a href={`mailto:${msg.email}`} className="hover:text-primary hover:underline">{msg.email}</a>
                </div>
                <div className="flex items-center bg-white px-3 py-1 rounded-full border border-gray-200">
                   <Phone size={14} className="mr-2 text-primary" />
                   <a href={`tel:${msg.phone}`} className="hover:text-primary hover:underline">{msg.phone}</a>
                </div>
                <div className="flex-1"></div>
                <div className="flex items-center">
                   <span className={`px-2 py-0.5 text-xs font-bold rounded uppercase ${
                      msg.status === 'unread' ? 'bg-blue-100 text-blue-800' :
                      msg.status === 'replied' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                   }`}>
                      {msg.status}
                   </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminMessages;

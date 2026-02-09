
import React from 'react';
import { storageService } from '../services/storage';
import { Save, Lock, User, Bell } from 'lucide-react';

const AdminSettings: React.FC = () => {
  const user = storageService.getCurrentUser();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-heading">Settings</h1>
        <p className="text-gray-500">Manage your profile and system preferences.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
                <User className="mr-2" size={20} /> Profile Information
            </h3>
        </div>
        <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" defaultValue={user?.name} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary focus:border-primary sm:text-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input type="email" defaultValue={user?.email} disabled className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50 text-gray-500 sm:text-sm cursor-not-allowed" />
                </div>
            </div>
            <div className="flex justify-end">
                <button className="bg-primary text-white px-4 py-2 rounded-md font-medium text-sm flex items-center hover:bg-blue-800">
                    <Save size={16} className="mr-2" /> Save Profile
                </button>
            </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
                <Lock className="mr-2" size={20} /> Security
            </h3>
        </div>
        <div className="p-6 space-y-6">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Current Password</label>
                    <input type="password" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary focus:border-primary sm:text-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                    <input type="password" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary focus:border-primary sm:text-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                    <input type="password" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary focus:border-primary sm:text-sm" />
                </div>
            </div>
            <div className="flex justify-end">
                <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium text-sm flex items-center hover:bg-gray-50">
                    Update Password
                </button>
            </div>
        </div>
      </div>

       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
                <Bell className="mr-2" size={20} /> Notifications (Simulated)
            </h3>
        </div>
        <div className="p-6">
            <div className="space-y-4">
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input id="email_notif" type="checkbox" defaultChecked className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded" />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="email_notif" className="font-medium text-gray-700">Email Notifications</label>
                        <p className="text-gray-500">Get notified when a new sponsorship application is submitted.</p>
                    </div>
                </div>
                 <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input id="daily_digest" type="checkbox" className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded" />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="daily_digest" className="font-medium text-gray-700">Daily Digest</label>
                        <p className="text-gray-500">Receive a daily summary of all activities.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;

import { useState } from 'react';
import { Settings, User, Lock, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';

export const SettingsPage = ({ onNavigate }) => {
  const { token } = useAuth();
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [autoSaveInterval, setAutoSaveInterval] = useState('2');
  
  const [isAccountOpen, setIsAccountOpen] = useState(true);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [isDangerZoneOpen, setIsDangerZoneOpen] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    // TODO: Add API call to update profile
    console.log('Update profile:', { fullName, email });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    // TODO: Add validation and API call
    console.log('Change password');
  };

  // Consider worflows and UI variations like a dark mode 
  const handleUpdatePreferences = async () => {
    // TODO: Add API call to save preferences
    console.log('Update preferences:', { 
      autoSaveInterval
    });
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // TODO: Add API call to delete account
      console.log('Delete account');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar activePage="settings" onNavigate={onNavigate} />
        
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Settings size={32} className="text-blue-600" />
                Settings
              </h1>
              <p className="text-gray-600 mt-2"> Hi name! Welcome to your Unison account management. </p>
            </div>

            {/* Feedback Messages */}
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                {success}
              </div>
            )}

            <div className="space-y-6">
              {/* Account Settings Section */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <button
                  onClick={() => setIsAccountOpen(!isAccountOpen)}
                  className="w-full border-b border-gray-200 px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <User size={24} className="text-blue-600" />
                    Account Settings
                  </h2>
                  {isAccountOpen ? (
                    <ChevronUp size={24} className="text-gray-400" />
                  ) : (
                    <ChevronDown size={24} className="text-gray-400" />
                  )}
                </button>
                
                {isAccountOpen && (
                  <div className="p-6 space-y-6">
                  {/* Profile Information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your email"
                        />
                      </div>
                      
                      <button
                        onClick={handleUpdateProfile}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Update Profile
                      </button>
                    </div>
                  </div>

                  {/* Change Password */}
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <Lock size={20} className="text-gray-600" />
                      Change Password
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter current password"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter new password (min 8 characters)"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Confirm new password"
                        />
                      </div>
                      
                      <button
                        onClick={handleChangePassword}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>
                )}
              </div>

              {/* Danger Zone Section */}
              <div className="bg-white rounded-lg shadow-sm border border-red-200">
                <button
                  onClick={() => setIsDangerZoneOpen(!isDangerZoneOpen)}
                  className="w-full border-b border-red-200 px-6 py-4 flex items-center justify-between hover:bg-red-50 transition-colors"
                >
                  <h2 className="text-xl font-semibold text-red-600 flex items-center gap-2">
                    <Trash2 size={24} />
                    Danger Zone
                  </h2>
                  {isDangerZoneOpen ? (
                    <ChevronUp size={24} className="text-red-400" />
                  ) : (
                    <ChevronDown size={24} className="text-red-400" />
                  )}
                </button>
                
                {isDangerZoneOpen && (
                  <div className="p-6">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="font-semibold text-red-900 mb-2">Delete Account</h3>
                    <p className="text-sm text-red-700 mb-4">
                      Once you delete your account, there is no going back. All your data including 
                      projects, tasks, and notes will be permanently deleted.
                    </p>
                    <button
                      onClick={handleDeleteAccount}
                      className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Delete My Account
                    </button>
                  </div>
                </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
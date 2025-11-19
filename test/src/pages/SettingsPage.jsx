import { useState, useEffect } from 'react';
import { Settings, User, Lock, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';

export const SettingsPage = ({ onNavigate }) => {
  const { token } = useAuth();

  // User info state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  
  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Preferences state
  const [autoSaveInterval, setAutoSaveInterval] = useState('2');

  // UI toggles
  const [isAccountOpen, setIsAccountOpen] = useState(true);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [isDangerZoneOpen, setIsDangerZoneOpen] = useState(false);

  // Loading and messages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState(null);

  // Fetch current user info on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/me', {
          headers: {
            'x-access-token': token
          }
        });
        const data = await res.json();
        if (!res.ok) {
          setUserError(data.error || 'Failed to fetch user info');
        } else {
          setFullName(data.full_name);
          setEmail(data.email);
        }
      } catch (err) {
        setUserError('Network error fetching user info');
      } finally {
        setUserLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  const showMessage = (err, msg) => {
    setError(err);
    setSuccess(msg);
    setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 3000);
  };

  // Update profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        },
        body: JSON.stringify({
          full_name: fullName || undefined,
          email: email || undefined
        })
      });

      const data = await response.json();
      if (!response.ok) {
        showMessage(data.error || "Failed to update profile", null);
      } else {
        showMessage(null, "Profile updated successfully!");
      }
    } catch (err) {
      showMessage("Network error updating profile", null);
    }

    setLoading(false);
  };

  // Change password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/me/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword
        })
      });

      const data = await response.json();
      if (!response.ok) {
        showMessage(data.error || "Failed to change password", null);
      } else {
        showMessage(null, "Password changed successfully!");
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      showMessage("Network error changing password", null);
    }
  };

  // Update preferences
  const handleUpdatePreferences = async () => {
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("http://localhost:5000/api/auth/me/preferences", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        },
        body: JSON.stringify({
          auto_save_interval: Number(autoSaveInterval)
        })
      });

      const data = await response.json();
      if (!response.ok) {
        showMessage(data.error || "Failed to update preferences", null);
      } else {
        showMessage(null, "Preferences updated!");
      }
    } catch (err) {
      showMessage("Network error updating preferences", null);
    }
  };

  // Delete account
  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure? This cannot be undone.")) return;

    try {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        method: "DELETE",
        headers: {
          "x-access-token": token
        }
      });

      const data = await response.json();
      if (!response.ok) {
        showMessage(data.error || "Failed to delete account", null);
      } else {
        alert("Account deleted. Logging out...");
        localStorage.clear();
        window.location.reload();
      }
    } catch (err) {
      showMessage("Network error deleting account", null);
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

              {userLoading ? (
                <p className="text-gray-600 mt-2">Loading user info...</p>
              ) : userError ? (
                <p className="text-red-600 mt-2">{userError}</p>
              ) : (
                <p className="text-gray-600 mt-2">Hi {fullName}! Welcome to your Unison account management.</p>
              )}
            </div>

            {/* Feedback Messages */}
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>
            )}
            {success && (
              <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">{success}</div>
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
                  {isAccountOpen ? <ChevronUp size={24} className="text-gray-400" /> : <ChevronDown size={24} className="text-gray-400" />}
                </button>

                {isAccountOpen && (
                  <div className="p-6 space-y-6">
                    {/* Profile Information */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                          <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        <Lock size={20} className="text-gray-600" /> Change Password
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                          <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                          <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                          <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    <Trash2 size={24} /> Danger Zone
                  </h2>
                  {isDangerZoneOpen ? <ChevronUp size={24} className="text-red-400" /> : <ChevronDown size={24} className="text-red-400" />}
                </button>

                {isDangerZoneOpen && (
                  <div className="p-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h3 className="font-semibold text-red-900 mb-2">Delete Account</h3>
                      <p className="text-sm text-red-700 mb-4">
                        Once you delete your account, there is no going back. All your data including projects, tasks, and notes will be permanently deleted.
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

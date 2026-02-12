import { useState } from 'react';

export default function Settings() {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [currency, setCurrency] = useState('INR');

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 animate-fade-in-up max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">
                Admin Settings
            </h2>

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Email Notifications</h3>
                        <p className="text-sm text-gray-500">Receive summaries of daily activity</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={notifications}
                            onChange={() => setNotifications(!notifications)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                </div>

                <div className="border-t border-gray-100 pt-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Display Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                            <select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                className="input-field"
                            >
                                <option value="INR">Indian Rupee (₹)</option>
                                <option value="USD">US Dollar ($)</option>
                                <option value="EUR">Euro (€)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                            <select
                                value={darkMode ? 'dark' : 'light'}
                                onChange={(e) => setDarkMode(e.target.value === 'dark')}
                                className="input-field"
                            >
                                <option value="light">Light Mode</option>
                                <option value="dark">Dark Mode (Beta)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                    <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
                    <button
                        className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium flex items-center gap-2"
                        onClick={() => alert('This would reset all data. Disabled for safety.')}
                    >
                        <i className="fas fa-trash-alt"></i>
                        Reset All Data
                    </button>
                </div>

                <div className="flex justify-end pt-6">
                    <button className="btn-primary px-6 py-2">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

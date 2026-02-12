import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCarStore } from '../store/carStore';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const setAdmin = useCarStore((state) => state.setAdmin);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Accept multiple credentials for ease of use
        const validEmails = ['admin@sritiruchendur.com', 'admin@sritiruchendurcars.com', 'admin'];
        const validPasswords = ['admin123', 'admin'];

        if (validEmails.includes(email.toLowerCase()) && validPasswords.includes(password)) {
            setAdmin(true);
            navigate('/dashboard');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-secondary via-gray-900 to-secondary flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <i className="fas fa-user-shield text-primary text-5xl mb-4"></i>
                    <h2 className="text-3xl font-bold text-secondary">Admin Access</h2>
                    <p className="text-gray-500 mt-2">Sign in to manage inventory</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                        <input
                            type="text"
                            placeholder="admin@sritiruchendur.com"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError('');
                            }}
                            className="input-field"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError('');
                            }}
                            className="input-field"
                            required
                        />
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center border border-red-100 flex items-center justify-center gap-2">
                            <i className="fas fa-exclamation-circle"></i>
                            {error}
                        </div>
                    )}

                    <button type="submit" className="btn-primary w-full py-3 text-lg font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                        Sign In
                    </button>
                </form>

                <div className="mt-8 text-center border-t border-gray-100 pt-6">
                    <Link to="/" className="text-gray-500 hover:text-primary transition flex items-center justify-center gap-2 group">
                        <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
                        Back to Website
                    </Link>
                </div>
            </div>
        </div>
    );
}

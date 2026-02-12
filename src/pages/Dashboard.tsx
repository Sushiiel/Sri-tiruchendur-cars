import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCarStore } from '../store/carStore';
import DashboardHome from '../components/dashboard/DashboardHome';
import CarList from '../components/dashboard/CarList';
import CarForm from '../components/dashboard/CarForm';
import Settings from '../components/dashboard/Settings';

type View = 'dashboard' | 'cars' | 'add-car' | 'edit-car' | 'settings';

export default function Dashboard() {
    const [currentView, setCurrentView] = useState<View>('dashboard');
    const [editingCarId, setEditingCarId] = useState<number | null>(null);
    const { isAdmin, setAdmin } = useCarStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAdmin) {
            navigate('/admin');
        }
    }, [isAdmin, navigate]);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Close sidebar when view changes on mobile
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [currentView]);

    const handleLogout = () => {
        setAdmin(false);
        navigate('/');
    };

    const handleEditCar = (id: number) => {
        setEditingCarId(id);
        setCurrentView('edit-car');
    };

    const renderContent = () => {
        switch (currentView) {
            case 'dashboard':
                return <DashboardHome />;
            case 'cars':
                return <CarList onEdit={handleEditCar} onAdd={() => setCurrentView('add-car')} />;
            case 'add-car':
                return <CarForm onCancel={() => setCurrentView('cars')} onSuccess={() => setCurrentView('cars')} />;
            case 'edit-car':
                return <CarForm carId={editingCarId} onCancel={() => setCurrentView('cars')} onSuccess={() => setCurrentView('cars')} />;
            case 'settings':
                return <Settings />;
            default:
                return <DashboardHome />;
        }
    };

    if (!isAdmin) return null;

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans overflow-x-hidden">
            {/* Sidebar Overlay for Mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-10 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`w-64 bg-secondary text-white fixed h-full z-20 transition-transform duration-300 shadow-xl ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0`}>
                <div className="p-6 border-b border-gray-700/50 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50">
                            <i className="fas fa-car text-primary text-xl"></i>
                        </div>
                        <div>
                            <h2 className="font-bold text-lg tracking-wide">STC Admin</h2>
                            <p className="text-xs text-gray-400">Management Portal</p>
                        </div>
                    </div>
                    {/* Close button for mobile inside sidebar */}
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="md:hidden text-gray-400 hover:text-white"
                    >
                        <i className="fas fa-times text-xl"></i>
                    </button>
                </div>

                <nav className="p-4 space-y-2">
                    <NavItem
                        icon="fa-chart-pie"
                        label="Overview"
                        active={currentView === 'dashboard'}
                        onClick={() => setCurrentView('dashboard')}
                    />
                    <NavItem
                        icon="fa-car"
                        label="Inventory"
                        active={currentView === 'cars' || currentView === 'add-car' || currentView === 'edit-car'}
                        onClick={() => setCurrentView('cars')}
                    />
                    <NavItem
                        icon="fa-cog"
                        label="Settings"
                        active={currentView === 'settings'}
                        onClick={() => setCurrentView('settings')}
                    />
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-gray-700/50">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors group"
                    >
                        <i className="fas fa-sign-out-alt group-hover:-translate-x-1 transition-transform"></i>
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-4 md:p-8 w-full transition-all">
                {/* Mobile Header */}
                <div className="md:hidden flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm sticky top-0 z-0">
                    <div className="font-bold text-secondary flex items-center gap-2">
                        <i className="fas fa-shield-alt text-primary"></i>
                        Admin Dashboard
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="text-gray-600 hover:text-primary p-2 active:scale-95 transition-transform"
                    >
                        <i className="fas fa-bars text-xl"></i>
                    </button>
                </div>

                {renderContent()}
            </main>
        </div>
    );
}

function NavItem({ icon, label, active, onClick }: { icon: string, label: string, active: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${active
                ? 'bg-primary text-white shadow-lg shadow-orange-500/30 font-medium'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
        >
            <i className={`fas ${icon} w-5 text-center`}></i>
            {label}
        </button>
    );
}

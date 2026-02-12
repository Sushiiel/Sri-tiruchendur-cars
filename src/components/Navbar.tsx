import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const isAdmin = location.pathname.startsWith('/admin') || location.pathname.startsWith('/dashboard');

    if (isAdmin) return null;

    // Close menu when route changes
    const handleLinkClick = () => setIsOpen(false);

    return (
        <nav className="bg-white/95 backdrop-blur-md fixed w-full z-50 shadow-sm border-b border-gray-100 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group" onClick={handleLinkClick}>
                        <div className="relative w-10 h-10 overflow-hidden rounded-full border-2 border-primary group-hover:scale-105 transition-transform duration-300">
                            <img src="/logo_small.png" alt="Sri Tiruchendur Cars Logo" className="object-cover w-full h-full" />
                        </div>
                        <span className="text-secondary font-bold text-xl tracking-tight group-hover:text-primary transition-colors duration-300">
                            Sri Tiruchendur <span className="text-primary">Cars</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink to="/" label="Home" active={location.pathname === '/'} />
                        <NavLink to="/cars" label="Buy Car" active={location.pathname === '/cars'} />
                        <NavLink to="/sell" label="Sell Car" active={location.pathname === '/sell'} />
                        <NavLink to="/contact" label="Contact" active={location.pathname === '/contact'} />

                        <Link
                            to="/admin"
                            className="px-5 py-2.5 rounded-full bg-gray-50 text-gray-600 hover:bg-orange-50 hover:text-primary border border-gray-200 hover:border-primary transition-all duration-300 text-sm font-medium flex items-center gap-2"
                        >
                            <i className="fas fa-user-shield text-xs"></i>
                            Admin Login
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-primary p-2 focus:outline-none transition-colors"
                        >
                            <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0 animate-fade-in-down">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <MobileNavLink to="/" label="Home" active={location.pathname === '/'} onClick={handleLinkClick} />
                        <MobileNavLink to="/cars" label="Buy Car" active={location.pathname === '/cars'} onClick={handleLinkClick} />
                        <MobileNavLink to="/sell" label="Sell Car" active={location.pathname === '/sell'} onClick={handleLinkClick} />
                        <MobileNavLink to="/contact" label="Contact" active={location.pathname === '/contact'} onClick={handleLinkClick} />

                        <div className="pt-4 mt-4 border-t border-gray-100">
                            <Link
                                to="/admin"
                                onClick={handleLinkClick}
                                className="block w-full text-center px-5 py-3 rounded-lg bg-gray-50 text-gray-600 font-medium hover:bg-orange-50 hover:text-primary border border-gray-200 transition-colors"
                            >
                                <i className="fas fa-user-shield mr-2"></i>
                                Admin Login
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

function NavLink({ to, label, active }: { to: string, label: string, active: boolean }) {
    return (
        <Link
            to={to}
            className={`relative text-sm font-medium transition-colors duration-300 ${active ? 'text-primary' : 'text-gray-600 hover:text-primary'
                }`}
        >
            {label}
            {active && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full animate-fade-in"></span>
            )}
        </Link>
    );
}

function MobileNavLink({ to, label, active, onClick }: { to: string, label: string, active: boolean, onClick: () => void }) {
    return (
        <Link
            to={to}
            onClick={onClick}
            className={`block px-3 py-3 rounded-lg text-base font-medium transition-colors ${active
                    ? 'bg-orange-50 text-primary'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                }`}
        >
            {label}
        </Link>
    );
}

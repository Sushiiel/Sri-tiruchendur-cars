import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-secondary text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="relative w-8 h-8 overflow-hidden rounded-full border border-primary">
                                <img src="/logo_small.png" alt="Logo" className="object-cover w-full h-full" />
                            </div>
                            <span className="text-xl font-bold">Sri Tiruchendur <span className="text-primary">Cars</span></span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Your trusted partner for buying and selling premium pre-owned cars in Tiruchendur.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link to="/" className="hover:text-primary transition">Home</Link></li>
                            <li><Link to="/cars" className="hover:text-primary transition">Buy Car</Link></li>
                            <li><Link to="/sell" className="hover:text-primary transition">Sell Car</Link></li>
                            <li><Link to="/contact" className="hover:text-primary transition">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-4">Services</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>Car Sales</li>
                            <li>Car Purchase</li>
                            <li>Car Finance</li>
                            <li>Car Insurance</li>
                            <li>RTO Services</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-4">Contact Us</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li className="flex items-start gap-2">
                                <i className="fas fa-map-marker-alt mt-1 text-primary"></i>
                                <span>Tiruchendur, Tamil Nadu</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fas fa-phone text-primary"></i>
                                <span>+91 98427 54254</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fas fa-envelope text-primary"></i>
                                <span>contact@sritiruchendurcars.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Sri Tiruchendur Cars. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

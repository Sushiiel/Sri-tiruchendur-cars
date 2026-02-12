import { Link } from 'react-router-dom';
import { useCarStore } from '../store/carStore';
import CarCard from '../components/CarCard';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

export default function Home() {
    const cars = useCarStore((state) => state.cars);

    // Get featured cars (first 3)
    const featuredCars = cars.slice(0, 3);

    return (
        <div className="bg-gray-50 min-h-screen">

            {/* Hero Section */}
            <div className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-50 to-white absolute inset-0 z-0"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
                        >
                            Premium <span className="text-primary">Pre-Owned Cars</span> <br />in Tiruchendur
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed"
                        >
                            Discover the finest selection of quality tested cars at unbeatable prices.
                            We ensure transparency, trust, and complete peace of mind.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <Link to="/cars" className="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                                Browse Cars
                            </Link>
                            <Link to="/sell" className="btn-outline text-lg px-8 py-4 bg-white hover:bg-gray-50 text-gray-800 border-gray-300 hover:border-primary transform hover:-translate-y-1 transition-all duration-300">
                                Sell Your Car
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">We provide a comprehensive range of automotive services to meet all your needs.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <ServiceCard
                            icon="fa-car-side"
                            title="Buy Cars"
                            description="Wide range of quality checked pre-owned cars at best prices."
                        />
                        <ServiceCard
                            icon="fa-hand-holding-usd"
                            title="Sell Cars"
                            description="Get the best market value for your car with instant payment."
                        />
                        <ServiceCard
                            icon="fa-file-contract"
                            title="Finance"
                            description="Easy loan options with low interest rates and quick approval."
                        />
                        <ServiceCard
                            icon="fa-shield-alt"
                            title="Insurance"
                            description="Hassle-free insurance renewal and new policy issuance."
                        />
                    </div>
                </div>
            </section>

            {/* Featured Cars Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Cars</h2>
                            <p className="text-gray-600">Explore our latest arrivals</p>
                        </div>
                        <Link to="/cars" className="text-primary font-semibold hover:text-orange-700 transition hidden sm:inline-block">
                            View All Cars <i className="fas fa-arrow-right ml-1"></i>
                        </Link>
                    </div>

                    {featuredCars.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredCars.map(car => (
                                <CarCard key={car.id} car={car} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                            <i className="fas fa-car text-gray-300 text-5xl mb-4"></i>
                            <p className="text-gray-500 text-lg">No cars listed yet. Check back soon!</p>
                            {/* Only visible to admin in reality, but for demo purposes */}
                            <p className="text-sm text-gray-400 mt-2">Admin: Login to add cars</p>
                        </div>
                    )}

                    <div className="mt-8 text-center sm:hidden">
                        <Link to="/cars" className="btn-outline w-full justify-center">
                            View All Cars
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose <span className="text-primary">Sri Tiruchendur Cars?</span></h2>
                            <div className="space-y-6">
                                <FeatureItem
                                    icon="fa-check-circle"
                                    title="Quality Tested"
                                    description="Every car undergoes a rigorous 150+ point inspection process."
                                />
                                <FeatureItem
                                    icon="fa-tag"
                                    title="Best Prices"
                                    description="Transparent pricing with no hidden charges. Best value guaranteed."
                                />
                                <FeatureItem
                                    icon="fa-file-alt"
                                    title="Paperwork Assistance"
                                    description="Complete support for RC transfer, insurance, and loan documentation."
                                />
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-4 bg-orange-100 rounded-full blur-3xl opacity-30"></div>
                            <img
                                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"
                                alt="Car Dealer Shake Hands"
                                className="relative rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

function ServiceCard({ icon, title, description }: { icon: string, title: string, description: string }) {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group text-center">
            <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors duration-300">
                <i className={`fas ${icon} text-primary text-xl group-hover:text-white transition-colors duration-300`}></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
    );
}

function FeatureItem({ icon, title, description }: { icon: string, title: string, description: string }) {
    return (
        <div className="flex gap-4">
            <div className="flex-shrink-0 mt-1">
                <i className={`fas ${icon} text-primary text-xl`}></i>
            </div>
            <div>
                <h4 className="text-lg font-bold text-gray-900 mb-1">{title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
            </div>
        </div>
    );
}

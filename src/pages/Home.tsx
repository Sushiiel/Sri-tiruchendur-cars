import { Link } from 'react-router-dom';
import { useCarStore } from '../store/carStore';
import CarCard from '../components/CarCard';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Footer from '../components/Footer';

// Reusable scroll-triggered section wrapper
function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, delay, ease: 'easeOut' }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default function Home() {
    const cars = useCarStore((state) => state.cars);

    // Get featured cars (first 3)
    const featuredCars = cars.slice(0, 3);

    return (
        <div className="bg-gray-50 min-h-screen">

            {/* Hero Section - Full Page */}
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Animated gradient background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-orange-50/30"></div>
                    {/* Floating decorative blobs */}
                    <motion.div
                        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute top-20 right-1/4 w-72 h-72 bg-orange-100/40 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{ x: [0, -20, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                        className="absolute bottom-32 left-1/4 w-96 h-96 bg-orange-50/50 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{ x: [0, 15, 0], y: [0, -15, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                        className="absolute top-1/3 left-10 w-48 h-48 bg-primary/5 rounded-full blur-2xl"
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 text-primary text-sm font-medium px-4 py-2 rounded-full mb-6"
                        >
                            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                            Trusted by 500+ Happy Customers
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.15 }}
                            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
                        >
                            Premium <span className="text-primary bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">Pre-Owned Cars</span> <br />in Tiruchendur
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed"
                        >
                            Discover the finest selection of quality tested cars at unbeatable prices.
                            We ensure transparency, trust, and complete peace of mind.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.45 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <Link to="/cars" className="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group">
                                Browse Cars <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                            </Link>
                            <Link to="/sell" className="btn-outline text-lg px-8 py-4 bg-white/80 backdrop-blur-sm hover:bg-gray-50 text-gray-800 border-gray-300 hover:border-primary transform hover:-translate-y-1 transition-all duration-300">
                                Sell Your Car
                            </Link>
                        </motion.div>

                        {/* Trust indicators */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-gray-500"
                        >
                            <div className="flex items-center gap-2"><i className="fas fa-shield-alt text-green-500"></i> 100% Verified</div>
                            <div className="flex items-center gap-2"><i className="fas fa-exchange-alt text-blue-500"></i> Easy Transfer</div>
                            <div className="flex items-center gap-2"><i className="fas fa-rupee-sign text-primary"></i> Best Price</div>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="flex flex-col items-center gap-2"
                    >
                        <span className="text-xs text-gray-400 tracking-widest uppercase">Scroll</span>
                        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center pt-2">
                            <motion.div
                                animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Services Section */}
            <section className="py-16 bg-white relative overflow-hidden">
                {/* Subtle background decoration */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-200 to-transparent"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection>
                        <div className="text-center mb-12">
                            <span className="text-primary font-semibold text-sm tracking-wider uppercase">What We Offer</span>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-2">Our Services</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">We provide a comprehensive range of automotive services to meet all your needs.</p>
                        </div>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { icon: 'fa-car-side', title: 'Buy Cars', description: 'Wide range of quality checked pre-owned cars at best prices.' },
                            { icon: 'fa-hand-holding-usd', title: 'Sell Cars', description: 'Get the best market value for your car with instant payment.' },
                            { icon: 'fa-file-contract', title: 'Finance', description: 'Easy loan options with low interest rates and quick approval.' },
                            { icon: 'fa-shield-alt', title: 'Insurance', description: 'Hassle-free insurance renewal and new policy issuance.' },
                        ].map((service, i) => (
                            <AnimatedSection key={service.title} delay={i * 0.1}>
                                <ServiceCard {...service} />
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Cars Section */}
            <section className="py-16 bg-gray-50 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection>
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <span className="text-primary font-semibold text-sm tracking-wider uppercase">Top Picks</span>
                                <h2 className="text-3xl font-bold text-gray-900 mb-2 mt-2">Featured Cars</h2>
                                <p className="text-gray-600">Explore our latest arrivals</p>
                            </div>
                            <Link to="/cars" className="text-primary font-semibold hover:text-orange-700 transition hidden sm:inline-flex items-center gap-2 group">
                                View All Cars <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
                            </Link>
                        </div>
                    </AnimatedSection>

                    {featuredCars.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredCars.map((car, i) => (
                                <AnimatedSection key={car.id} delay={i * 0.1}>
                                    <CarCard car={car} />
                                </AnimatedSection>
                            ))}
                        </div>
                    ) : (
                        <AnimatedSection>
                            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                                <i className="fas fa-car text-gray-300 text-5xl mb-4"></i>
                                <p className="text-gray-500 text-lg">No cars listed yet. Check back soon!</p>
                                {/* Only visible to admin in reality, but for demo purposes */}
                                <p className="text-sm text-gray-400 mt-2">Admin: Login to add cars</p>
                            </div>
                        </AnimatedSection>
                    )}

                    <div className="mt-8 text-center sm:hidden">
                        <Link to="/cars" className="btn-outline w-full justify-center">
                            View All Cars
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 bg-white overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-200 to-transparent"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <AnimatedSection>
                            <div className="text-center lg:text-left">
                                <span className="text-primary font-semibold text-sm tracking-wider uppercase">Why Us</span>
                                <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-2">Why Choose <span className="text-primary">Sri Tiruchendur Cars?</span></h2>
                                <div className="space-y-6 inline-block text-left">
                                    <FeatureItem
                                        icon="fa-check-circle"
                                        title="Quality Tested"
                                        description="Every car undergoes a rigorous 150+ point inspection process."
                                        delay={0.15}
                                    />
                                    <FeatureItem
                                        icon="fa-tag"
                                        title="Best Prices"
                                        description="Transparent pricing with no hidden charges. Best value guaranteed."
                                        delay={0.3}
                                    />
                                    <FeatureItem
                                        icon="fa-file-alt"
                                        title="Paperwork Assistance"
                                        description="Complete support for RC transfer, insurance, and loan documentation."
                                        delay={0.45}
                                    />
                                </div>
                            </div>
                        </AnimatedSection>
                        <AnimatedSection delay={0.2}>
                            <div className="relative flex justify-center lg:justify-end">
                                <div className="absolute -inset-4 bg-orange-100 rounded-full blur-3xl opacity-30"></div>
                                {/* Decorative ring behind the photo */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                                    className="absolute -inset-6 border-2 border-dashed border-orange-200/40 rounded-2xl"
                                />
                                <img
                                    src="/Anand Picture.jpeg"
                                    alt="V. Anand - Sri Tiruchendur Cars"
                                    className="relative rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500 hover:shadow-3xl max-h-[32rem] w-auto"
                                />
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Stats Section (new) */}
            <section className="py-12 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <StatItem number="500+" label="Happy Customers" />
                        <StatItem number="300+" label="Cars Sold" />
                        <StatItem number="10+" label="Years Experience" />
                        <StatItem number="100%" label="Customer Trust" />
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

function ServiceCard({ icon, title, description }: { icon: string, title: string, description: string }) {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group text-center relative overflow-hidden">
            {/* Subtle gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50/0 to-orange-50/0 group-hover:from-orange-50/50 group-hover:to-white transition-all duration-500"></div>
            <div className="relative z-10">
                <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <i className={`fas ${icon} text-primary text-xl group-hover:text-white transition-colors duration-300`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
            </div>
        </div>
    );
}

function FeatureItem({ icon, title, description, delay = 0 }: { icon: string, title: string, description: string, delay?: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-40px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay, ease: 'easeOut' }}
            className="flex gap-4 group"
        >
            <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <i className={`fas ${icon} text-primary text-lg group-hover:text-white transition-colors duration-300`}></i>
                </div>
            </div>
            <div>
                <h4 className="text-lg font-bold text-gray-900 mb-1">{title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
            </div>
        </motion.div>
    );
}

function StatItem({ number, label }: { number: string, label: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center"
        >
            <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{number}</div>
            <div className="text-gray-400 text-sm">{label}</div>
        </motion.div>
    );
}

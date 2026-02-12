import { useParams, Link } from 'react-router-dom';
import { useCarStore } from '../store/carStore';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function CarDetails() {
    const { id } = useParams<{ id: string }>();
    const cars = useCarStore((state) => state.cars);

    const car = cars.find(c => c.id === Number(id));

    if (!car) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
                <Navbar />
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Car Not Found</h2>
                <Link to="/cars" className="btn-primary">Back to Listings</Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* LEFT COLUMN: Media & Key Specs */}
                    <div className="space-y-6">
                        {/* Video / Image Player */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                            {car.video ? (
                                <div className="aspect-w-16 aspect-h-9 bg-black">
                                    {car.video.includes('youtube') || car.video.includes('youtu.be') ? (
                                        <iframe
                                            src={car.video.replace('watch?v=', 'embed/')}
                                            title={car.name}
                                            className="w-full h-96 object-cover"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    ) : (
                                        <video controls autoPlay className="w-full h-96 object-cover">
                                            <source src={car.video} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                </div>
                            ) : (
                                <div className="relative h-96">
                                    <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                        <p className="text-white bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                                            <i className="fas fa-video-slash mr-2"></i> No Video Available
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Price Card (Mobile only maybe? No keep it here) */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 lg:hidden">
                            <h1 className="text-3xl font-bold text-gray-900 mb-1">{car.brand} {car.model}</h1>
                            <p className="text-gray-500 mb-4">{car.variant} • {car.year}</p>
                            <div className="flex items-end gap-2 mb-4">
                                <span className="text-4xl font-bold text-primary">₹ {car.price}</span>
                                <span className="text-sm text-gray-500 mb-2">{car.priceType || 'Fixed'}</span>
                            </div>
                            {car.advanceAmount && <p className="text-gray-600 font-medium mb-4 text-sm bg-gray-50 p-2 rounded">Advance: ₹ {car.advanceAmount}</p>}
                            <div className="flex gap-2 mb-4">
                                {car.exchange && <span className="badge bg-blue-100 text-blue-700">Exchange Available</span>}
                                {car.finance && <span className="badge bg-green-100 text-green-700">Finance Available</span>}
                            </div>
                        </div>

                        {/* Condition Report Card */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="section-title mb-4">Vehicle Condition</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <ConditionRow label="Overall" value={car.condition} />
                                <ConditionRow label="Accident History" value={car.accident} />
                                <ConditionRow label="Flood Affected" value={car.flood} />
                                <ConditionRow label="Service History" value={car.serviceHistory} />
                                <ConditionRow label="Tyres" value={car.tyreCondition} />
                                <ConditionRow label="Battery" value={car.batteryCondition} />
                            </div>
                            {car.majorIssues && (
                                <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                                    <span className="font-bold">Note:</span> {car.majorIssues}
                                </div>
                            )}
                        </div>

                        {/* Buyer Support */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="section-title mb-4">Buyer Support Services</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <SupportItem label="RC Transfer" active={car.support?.rcTransfer} />
                                <SupportItem label="Insurance Assist" active={car.support?.insurance} />
                                <SupportItem label="Loan Assist" active={car.support?.loan} />
                                <SupportItem label="Warranty" active={car.support?.warranty} />
                                <SupportItem label="Return Policy" active={car.support?.returnPolicy} />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Details & Seller */}
                    <div className="space-y-8">
                        <div className="hidden lg:block">
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">{car.brand} {car.model} <span className="text-gray-500 font-normal text-2xl">{car.variant}</span></h1>
                            <div className="flex items-center gap-4 text-gray-600 mb-6">
                                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">{car.km} km</span>
                                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                <span>{car.fuel}</span>
                                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                <span>{car.owner}</span>
                            </div>
                            <div className="flex items-end gap-3 mb-2">
                                <p className="text-5xl font-bold text-primary">₹ {car.price}</p>
                                <span className="text-gray-500 text-lg mb-2">{car.priceType}</span>
                            </div>
                            {car.advanceAmount && <p className="text-gray-600 font-medium mb-6 text-lg">Advance Amount: <span className="text-gray-900 font-bold">₹ {car.advanceAmount}</span></p>}
                            <div className="flex gap-3 mb-6">
                                {car.exchange && <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded text-sm font-bold border border-blue-100">Exchange Available</span>}
                                {car.finance && <span className="bg-green-50 text-green-700 px-3 py-1 rounded text-sm font-bold border border-green-100">Finance Available</span>}
                            </div>
                        </div>

                        {/* Tabular Specs */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="bg-gray-50 px-6 py-3 border-b border-gray-100 font-semibold text-gray-700">
                                Specifications
                            </div>
                            <div className="p-6 grid grid-cols-2 gap-y-4 gap-x-8">
                                <SpecRow icon="fa-calendar" label="Registration Year" value={car.year} />
                                <SpecRow icon="fa-calendar-check" label="Mfg. Year" value={car.mfgYear} />
                                <SpecRow icon="fa-tachometer-alt" label="Kilometers" value={`${car.km} km`} />
                                <SpecRow icon="fa-gas-pump" label="Fuel Type" value={car.fuel} />
                                <SpecRow icon="fa-cogs" label="Transmission" value={car.transmission} />
                                <SpecRow icon="fa-user" label="Ownership" value={car.owner} />
                                <SpecRow icon="fa-paint-brush" label="Color" value={car.color || 'N/A'} />
                                <SpecRow icon="fa-car" label="Body Type" value={car.bodyType || 'N/A'} />
                            </div>

                            <div className="bg-gray-50 px-6 py-3 border-t border-b border-gray-100 font-semibold text-gray-700 mt-2">
                                Registration & Insurance
                            </div>
                            <div className="p-6 grid grid-cols-2 gap-y-4 gap-x-8">
                                <SpecRow icon="fa-id-card" label="Reg. Number" value={car.regNumber || 'N/A'} />
                                <SpecRow icon="fa-map-marker-alt" label="RTO" value={car.rto || 'N/A'} />
                                <SpecRow icon="fa-file-contract" label="Insurance" value={`${car.insuranceStatus || 'N/A'} (${car.insuranceType || ''})`} />
                                <SpecRow icon="fa-calendar-day" label="Valid Till" value={car.insuranceValidTill || 'N/A'} />
                                <SpecRow icon="fa-file-signature" label="NOC Available" value={car.noc || 'N/A'} />
                                <SpecRow icon="fa-university" label="Loan / Hypothecation" value={car.loan || 'N/A'} />
                            </div>
                        </div>

                        {/* Features */}
                        {car.features && car.features.length > 0 && (
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <h3 className="section-title mb-4">Features</h3>
                                <div className="flex flex-wrap gap-3">
                                    {car.features.map((feature, index) => (
                                        <span key={index} className="bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm flex items-center gap-2 border border-gray-100">
                                            <i className="fas fa-check-circle text-green-500"></i>
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Additional Notes */}
                        {car.notes && (
                            <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-100 text-yellow-800 text-sm leading-relaxed">
                                <h3 className="font-bold mb-2 flex items-center gap-2"><i className="fas fa-sticky-note"></i> Seller Notes</h3>
                                {car.notes}
                            </div>
                        )}

                        {/* Seller Contact */}
                        <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-xl">
                            <h3 className="text-xl font-bold mb-6 border-b border-gray-700 pb-4">Seller Information</h3>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center border-2 border-gray-600">
                                    <i className="fas fa-user-tie text-2xl text-gray-300"></i>
                                </div>
                                <div>
                                    <p className="font-bold text-xl">{car.seller?.name || 'Authorized Dealer'}</p>
                                    <p className="text-gray-400 text-sm flex items-center gap-2 mt-1">
                                        <i className="fas fa-map-marker-alt"></i> {car.seller?.location || 'Tiruchendur'}
                                    </p>
                                    {car.seller?.workingHours && (
                                        <p className="text-gray-500 text-xs mt-1">
                                            <i className="fas fa-clock mr-1"></i> {car.seller.workingHours}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <a href={`tel:${car.seller?.phone}`} className="bg-white text-gray-900 py-3 rounded-lg font-bold text-center hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                                    <i className="fas fa-phone-alt text-primary"></i> Call Now
                                </a>
                                <a href={`https://wa.me/91${car.seller?.whatsapp}`} target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white py-3 rounded-lg font-bold text-center hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                                    <i className="fab fa-whatsapp text-xl"></i> Chat
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

function SpecRow({ icon, label, value }: { icon: string, label: string, value?: string }) {
    if (!value) return null;
    return (
        <div className="flex items-start gap-3">
            <i className={`fas ${icon} text-gray-400 mt-1 w-5 text-center`}></i>
            <div>
                <p className="text-xs text-gray-500">{label}</p>
                <p className="font-semibold text-gray-800 text-sm">{value}</p>
            </div>
        </div>
    );
}

function ConditionRow({ label, value }: { label: string, value?: string }) {
    return (
        <div className="flex justify-between border-b border-gray-50 pb-2">
            <span className="text-gray-500">{label}</span>
            <span className={`font-medium ${value === 'Excellent' || value === 'New' || value === 'Available' ? 'text-green-600' : 'text-gray-800'}`}>
                {value || 'N/A'}
            </span>
        </div>
    );
}

function SupportItem({ label, active }: { label: string, active?: boolean }) {
    return (
        <div className={`flex items-center gap-2 text-sm p-2 rounded ${active ? 'bg-green-50 text-green-800' : 'bg-gray-50 text-gray-400'}`}>
            <i className={`fas ${active ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
            {label}
        </div>
    );
}

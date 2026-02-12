import { Link } from 'react-router-dom';
import { Car } from '../types/car';

interface CarCardProps {
    car: Car;
}

export default function CarCard({ car }: CarCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 group">
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={car.image || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800'}
                    alt={car.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                    {car.year}
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{car.brand} {car.model}</h3>
                <p className="text-gray-500 text-sm mb-4">{car.variant} • {car.fuel} • {car.transmission}</p>

                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                        <i className="fas fa-tachometer-alt mr-2 text-primary"></i>
                        {car.km} km
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                        <i className="fas fa-user mr-2 text-primary"></i>
                        {car.owner}
                    </div>
                </div>

                <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                    <span className="text-2xl font-bold text-primary">₹ {car.price}</span>
                    <Link
                        to={`/cars/${car.id}`}
                        className="text-primary hover:text-orange-700 font-semibold text-sm flex items-center transition-colors"
                    >
                        View Details <i className="fas fa-arrow-right ml-1"></i>
                    </Link>
                </div>
            </div>
        </div>
    );
}

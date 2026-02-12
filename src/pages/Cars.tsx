import { useState, useMemo } from 'react';
import { useCarStore } from '../store/carStore';
import CarCard from '../components/CarCard';
import Footer from '../components/Footer';

export default function Cars() {
    const cars = useCarStore((state) => state.cars);
    const [filterBrand, setFilterBrand] = useState('');
    const [sortBy, setSortBy] = useState('newest');

    const filteredCars = useMemo(() => {
        let result = [...cars];

        if (filterBrand) {
            result = result.filter(car => car.brand === filterBrand);
        }

        if (sortBy === 'lowest') {
            result.sort((a, b) => parseInt(a.price.replace(/,/g, '')) - parseInt(b.price.replace(/,/g, '')));
        } else if (sortBy === 'highest') {
            result.sort((a, b) => parseInt(b.price.replace(/,/g, '')) - parseInt(a.price.replace(/,/g, '')));
        } else {
            // Default newest
            result.sort((a, b) => b.id - a.id);
        }

        return result;
    }, [cars, filterBrand, sortBy]);

    const brands = Array.from(new Set(cars.map(c => c.brand)));

    return (
        <div className="bg-gray-50 min-h-screen pt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Browse Inventory</h1>

                {/* Filters */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex gap-4 items-center overflow-x-auto pb-2 md:pb-0">
                        <button
                            onClick={() => setFilterBrand('')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${filterBrand === '' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            All Brands
                        </button>
                        {brands.map(brand => (
                            <button
                                key={brand}
                                onClick={() => setFilterBrand(brand)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${filterBrand === brand ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {brand}
                            </button>
                        ))}
                    </div>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="input-field w-auto min-w-[150px]"
                    >
                        <option value="newest">Newest First</option>
                        <option value="lowest">Price: Low to High</option>
                        <option value="highest">Price: High to Low</option>
                    </select>
                </div>

                {/* Grid */}
                {filteredCars.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCars.map(car => (
                            <CarCard key={car.id} car={car} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                        <i className="fas fa-search text-gray-300 text-6xl mb-4"></i>
                        <h2 className="text-2xl font-bold text-gray-800">No cars found</h2>
                        <p className="text-gray-500 mt-2">Try adjusting your filters or check back later.</p>
                        <button onClick={() => setFilterBrand('')} className="btn-primary mt-4">
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

import { useState } from 'react';
import { useCarStore } from '../../store/carStore';
import { Link } from 'react-router-dom';

interface CarListProps {
    onEdit: (id: number) => void;
    onAdd: () => void;
}

export default function CarList({ onEdit, onAdd }: CarListProps) {
    const { cars, deleteCar } = useCarStore();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCars = cars.filter(car =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 animate-fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Car Inventory</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage your vehicle listings</p>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <input
                        type="text"
                        placeholder="Search cars..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input-field w-full md:w-64"
                    />
                    <button
                        onClick={onAdd}
                        className="btn-primary flex items-center gap-2 px-6 py-2.5 whitespace-nowrap"
                    >
                        <i className="fas fa-plus"></i>
                        Add New Car
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-100">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider border-b border-gray-200">
                            <th className="p-4 font-semibold text-center w-20">ID</th>
                            <th className="p-4 font-semibold w-24">Image</th>
                            <th className="p-4 font-semibold">Make & Model</th>
                            <th className="p-4 font-semibold">Year/Fuel</th>
                            <th className="p-4 font-semibold">Price</th>
                            <th className="p-4 font-semibold">Status</th>
                            <th className="p-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredCars.length > 0 ? (
                            filteredCars.map((car) => (
                                <tr key={car.id} className="hover:bg-gray-50 transition-colors group">
                                    <td className="p-4 text-center text-gray-500">#{car.id}</td>
                                    <td className="p-4">
                                        <div className="w-16 h-12 rounded overflow-hidden bg-gray-100 border border-gray-200">
                                            <img
                                                src={car.image || 'https://via.placeholder.com/150'}
                                                alt={car.name}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="font-semibold text-gray-800">{car.brand} {car.model}</div>
                                        <div className="text-xs text-gray-500">{car.variant}</div>
                                    </td>
                                    <td className="p-4 text-gray-600 text-sm">
                                        {car.year} • {car.fuel}
                                        <div className="text-xs text-gray-400">{car.transmission}</div>
                                    </td>
                                    <td className="p-4 font-bold text-primary">₹ {car.price}</td>
                                    <td className="p-4">
                                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full border border-green-200">
                                            Active
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => onEdit(car.id)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors tooltip"
                                                title="Edit"
                                            >
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (window.confirm('Are you sure you want to delete this car?')) {
                                                        deleteCar(car.id);
                                                    }
                                                }}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors tooltip"
                                                title="Delete"
                                            >
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="p-12 text-center text-gray-400">
                                    <div className="flex flex-col items-center">
                                        <i className="fas fa-car-crash text-4xl mb-3 opacity-50"></i>
                                        <p>No cars found matching your search.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

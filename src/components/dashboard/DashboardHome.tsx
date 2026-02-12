import { useCarStore } from '../../store/carStore';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function DashboardHome() {
    const cars = useCarStore((state) => state.cars);

    const totalCars = cars.length;
    const totalValue = cars.reduce((acc, car) => acc + (parseInt(car.price.replace(/,/g, '')) || 0), 0);

    // Calculate Brand Stats
    const brandStats = cars.reduce((acc: any, car) => {
        acc[car.brand] = (acc[car.brand] || 0) + 1;
        return acc;
    }, {});

    const brandData = Object.keys(brandStats).map(brand => ({
        name: brand,
        value: brandStats[brand]
    }));

    // Calculate Fuel Stats
    const fuelStats = cars.reduce((acc: any, car) => {
        acc[car.fuel] = (acc[car.fuel] || 0) + 1;
        return acc;
    }, {});

    const fuelData = Object.keys(fuelStats).map(fuel => ({
        name: fuel,
        count: fuelStats[fuel]
    }));

    const COLORS = ['#FF6B35', '#1A1A2E', '#FFD700', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Overview</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Cars"
                    value={totalCars}
                    icon="fa-car"
                    color="bg-blue-50 text-blue-600"
                />
                <StatCard
                    title="Total Inventory Value"
                    value={`₹ ${(totalValue / 10000000).toFixed(2)} Cr`}
                    icon="fa-rupee-sign"
                    color="bg-green-50 text-green-600"
                />
                <StatCard
                    title="Pending Inquiries"
                    value="12"
                    icon="fa-envelope"
                    color="bg-orange-50 text-orange-600"
                />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Inventory by Brand</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={brandData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {brandData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Inventory by Fuel Type</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={fuelData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#FF6B35" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon, color }: { title: string, value: string | number, icon: string, color: string }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${color}`}>
                <i className={`fas ${icon}`}></i>
            </div>
            <div>
                <p className="text-gray-500 text-sm">{title}</p>
                <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
            </div>
        </div>
    );
}

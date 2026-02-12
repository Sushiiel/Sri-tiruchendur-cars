import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Car } from '../types/car';

interface CarStore {
    cars: Car[];
    isAdmin: boolean;
    addCar: (car: Car) => void;
    updateCar: (id: number, car: Car) => void;
    deleteCar: (id: number) => void;
    setAdmin: (isAdmin: boolean) => void;
}

export const useCarStore = create<CarStore>()(
    persist(
        (set) => ({
            cars: [
                {
                    id: 1,
                    name: "Maruti Swift VXI",
                    brand: "Maruti",
                    model: "Swift",
                    variant: "VXI",
                    year: "2021",
                    mfgYear: "2021",
                    fuel: "Petrol",
                    km: "25000",
                    transmission: "Manual",
                    price: "6,50,000",
                    priceType: "Negotiable",
                    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=800",
                    video: "https://www.youtube.com/watch?v=D-yD2A_hZjk",
                    owner: "1st Owner",
                    color: "Midnight Blue",
                    bodyType: "Hatchback",
                    regNumber: "TN-69-AA-1234",
                    insuranceStatus: "Valid",
                    insuranceType: "Comprehensive",
                    features: ["Power Steering", "ABS", "Airbags", "AC", "Music System"],
                    seller: {
                        name: "V. Anand",
                        phone: "9842754254",
                        whatsapp: "9842754254",
                        location: "Tiruchendur"
                    }
                },
                {
                    id: 2,
                    name: "Hyundai i20 Asta",
                    brand: "Hyundai",
                    model: "i20",
                    variant: "Asta (O)",
                    year: "2020",
                    fuel: "Petrol",
                    km: "18000",
                    transmission: "Manual",
                    price: "7,25,000",
                    priceType: "Fixed",
                    image: "https://images.unsplash.com/photo-1621689718428-c167df38c560?auto=format&fit=crop&q=80&w=800",
                    owner: "1st Owner",
                    color: "Polar White",
                    bodyType: "Hatchback",
                    features: ["Sunroof", "Touchscreen", "Alloy Wheels", "Cruise Control", "6 Airbags"],
                    seller: {
                        name: "V. Anand",
                        phone: "9842754254",
                        whatsapp: "9842754254",
                        location: "Tiruchendur"
                    }
                },
                {
                    id: 3,
                    name: "Toyota Innova Crysta",
                    brand: "Toyota",
                    model: "Innova Crysta",
                    variant: "2.4 GX",
                    year: "2019",
                    fuel: "Diesel",
                    km: "65000",
                    transmission: "Manual",
                    price: "18,50,000",
                    priceType: "Negotiable",
                    image: "https://images.unsplash.com/photo-1619468129141-8f5d0f1c65d6?auto=format&fit=crop&q=80&w=800",
                    owner: "1st Owner",
                    color: "Silver",
                    bodyType: "MUV",
                    features: ["7 Seater", "Captain Seats", "Rear AC", "ABS", "Airbags"],
                    seller: {
                        name: "V. Anand",
                        phone: "9842754254",
                        whatsapp: "9842754254",
                        location: "Tiruchendur"
                    }
                },
                {
                    id: 4,
                    name: "Honda City ZX",
                    brand: "Honda",
                    model: "City",
                    variant: "ZX CVT",
                    year: "2022",
                    fuel: "Petrol",
                    km: "12000",
                    transmission: "CVT",
                    price: "14,00,000",
                    priceType: "Slightly Negotiable",
                    image: "https://images.unsplash.com/photo-1605559424843-9e4c2287f38e?auto=format&fit=crop&q=80&w=800",
                    owner: "1st Owner",
                    color: "Modern Steel",
                    bodyType: "Sedan",
                    features: ["Sunroof", "Leather Seats", "LED Headlamps", "Lane Watch Camera", "Paddle Shifters"],
                    seller: {
                        name: "V. Anand",
                        phone: "9842754254",
                        whatsapp: "9842754254",
                        location: "Tiruchendur"
                    }
                },
                {
                    id: 5,
                    name: "Mahindra Thar LX",
                    brand: "Mahindra",
                    model: "Thar",
                    variant: "LX Hard Top",
                    year: "2023",
                    fuel: "Diesel",
                    km: "5000",
                    transmission: "Automatic",
                    price: "19,00,000",
                    priceType: "Fixed",
                    image: "https://images.unsplash.com/photo-1626071466175-10a48483569a?auto=format&fit=crop&q=80&w=800",
                    video: "https://www.youtube.com/watch?v=J_qD7d9_F-w",
                    owner: "1st Owner",
                    color: "Red Rage",
                    bodyType: "SUV",
                    features: ["4x4", "Touchscreen", "Convertible Top", "All Terrain Tyres"],
                    seller: {
                        name: "V. Anand",
                        phone: "9842754254",
                        whatsapp: "9842754254",
                        location: "Tiruchendur"
                    }
                }
            ],
            isAdmin: false,

            addCar: (car) =>
                set((state) => ({ cars: [...state.cars, car] })),

            updateCar: (id, updatedCar) =>
                set((state) => ({
                    cars: state.cars.map((car) =>
                        car.id === id ? updatedCar : car
                    ),
                })),

            deleteCar: (id) =>
                set((state) => ({
                    cars: state.cars.filter((car) => car.id !== id),
                })),

            setAdmin: (isAdmin) => set({ isAdmin }),
        }),
        {
            name: 'car-storage',
        }
    )
);

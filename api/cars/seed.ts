import { put, list } from '@vercel/blob';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const CARS_BLOB_KEY = 'data/cars.json';

const DEFAULT_CARS = [
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
        price: "650000",
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
            phone: "9629509333",
            whatsapp: "9629509333",
            location: "Salem"
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
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
        price: "725000",
        priceType: "Fixed",
        image: "https://images.unsplash.com/photo-1621689718428-c167df38c560?auto=format&fit=crop&q=80&w=800",
        owner: "1st Owner",
        color: "Polar White",
        bodyType: "Hatchback",
        features: ["Sunroof", "Touchscreen", "Alloy Wheels", "Cruise Control", "6 Airbags"],
        seller: {
            name: "V. Anand",
            phone: "9629509333",
            whatsapp: "9629509333",
            location: "Salem"
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
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
        price: "1850000",
        priceType: "Negotiable",
        image: "https://images.unsplash.com/photo-1619468129141-8f5d0f1c65d6?auto=format&fit=crop&q=80&w=800",
        owner: "1st Owner",
        color: "Silver",
        bodyType: "MUV",
        features: ["7 Seater", "Captain Seats", "Rear AC", "ABS", "Airbags"],
        seller: {
            name: "V. Anand",
            phone: "9629509333",
            whatsapp: "9629509333",
            location: "Salem"
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
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
        price: "1400000",
        priceType: "Slightly Negotiable",
        image: "https://images.unsplash.com/photo-1605559424843-9e4c2287f38e?auto=format&fit=crop&q=80&w=800",
        owner: "1st Owner",
        color: "Modern Steel",
        bodyType: "Sedan",
        features: ["Sunroof", "Leather Seats", "LED Headlamps", "Lane Watch Camera", "Paddle Shifters"],
        seller: {
            name: "V. Anand",
            phone: "9629509333",
            whatsapp: "9629509333",
            location: "Salem"
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
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
        price: "1900000",
        priceType: "Fixed",
        image: "https://images.unsplash.com/photo-1626071466175-10a48483569a?auto=format&fit=crop&q=80&w=800",
        video: "https://www.youtube.com/watch?v=J_qD7d9_F-w",
        owner: "1st Owner",
        color: "Red Rage",
        bodyType: "SUV",
        features: ["4x4", "Touchscreen", "Convertible Top", "All Terrain Tyres"],
        seller: {
            name: "V. Anand",
            phone: "9629509333",
            whatsapp: "9629509333",
            location: "Salem"
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Use POST to seed' });
    }

    try {
        // Check if data already exists
        const { blobs } = await list({ prefix: CARS_BLOB_KEY });

        if (blobs.length > 0 && !req.query.force) {
            return res.status(200).json({
                success: true,
                message: 'Data already exists. Use ?force=true to overwrite.',
                count: blobs.length,
            });
        }

        // Seed the data
        const jsonContent = JSON.stringify(DEFAULT_CARS, null, 2);
        const blob = await put(CARS_BLOB_KEY, jsonContent, {
            access: 'private',
            addRandomSuffix: false,
            contentType: 'application/json',
        });

        return res.status(201).json({
            success: true,
            message: 'Database seeded with default cars',
            count: DEFAULT_CARS.length,
            blobUrl: blob.url,
        });
    } catch (error: any) {
        console.error('Seed Error:', error);
        return res.status(500).json({
            success: false,
            error: 'Failed to seed data',
            details: error.message,
        });
    }
}

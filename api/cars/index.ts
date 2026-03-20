import { put, list, head, del } from '@vercel/blob';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const CARS_BLOB_KEY = 'data/cars.json';

// Helper: Get the cars data blob
async function getCarsData(): Promise<any[]> {
    try {
        const { blobs } = await list({ prefix: CARS_BLOB_KEY });
        if (blobs.length === 0) return [];

        const response = await fetch(blobs[0].url, {
            headers: {
                Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
            },
        });
        if (!response.ok) return [];
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('Error reading cars data:', error);
        return [];
    }
}

// Helper: Save cars data to blob
async function saveCarsData(cars: any[]): Promise<string> {
    const jsonContent = JSON.stringify(cars, null, 2);
    const blob = await put(CARS_BLOB_KEY, jsonContent, {
        access: 'private',
        addRandomSuffix: false,
        contentType: 'application/json',
    });
    return blob.url;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        switch (req.method) {
            case 'GET': {
                const cars = await getCarsData();
                return res.status(200).json({
                    success: true,
                    cars,
                    count: cars.length,
                    timestamp: new Date().toISOString(),
                });
            }

            case 'POST': {
                const newCar = req.body;

                if (!newCar || !newCar.brand || !newCar.model) {
                    return res.status(400).json({
                        success: false,
                        error: 'Missing required fields: brand, model',
                    });
                }

                const cars = await getCarsData();

                // Assign ID if not present
                newCar.id = newCar.id || Date.now();
                newCar.createdAt = new Date().toISOString();
                newCar.updatedAt = new Date().toISOString();

                cars.push(newCar);
                await saveCarsData(cars);

                return res.status(201).json({
                    success: true,
                    car: newCar,
                    message: 'Car added successfully',
                });
            }

            default:
                res.setHeader('Allow', 'GET, POST, OPTIONS');
                return res.status(405).json({
                    success: false,
                    error: `Method ${req.method} not allowed`,
                });
        }
    } catch (error: any) {
        console.error('API Error:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error',
            details: error.message,
        });
    }
}

import { put, list } from '@vercel/blob';
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
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { id } = req.query;
    const carId = parseInt(id as string, 10);

    if (isNaN(carId)) {
        return res.status(400).json({
            success: false,
            error: 'Invalid car ID',
        });
    }

    try {
        switch (req.method) {
            case 'GET': {
                const cars = await getCarsData();
                const car = cars.find((c) => c.id === carId);

                if (!car) {
                    return res.status(404).json({
                        success: false,
                        error: 'Car not found',
                    });
                }

                return res.status(200).json({ success: true, car });
            }

            case 'PUT': {
                const updatedCarData = req.body;
                const cars = await getCarsData();
                const index = cars.findIndex((c) => c.id === carId);

                if (index === -1) {
                    return res.status(404).json({
                        success: false,
                        error: 'Car not found',
                    });
                }

                cars[index] = {
                    ...cars[index],
                    ...updatedCarData,
                    id: carId, // Ensure ID stays the same
                    updatedAt: new Date().toISOString(),
                };

                await saveCarsData(cars);

                return res.status(200).json({
                    success: true,
                    car: cars[index],
                    message: 'Car updated successfully',
                });
            }

            case 'DELETE': {
                const cars = await getCarsData();
                const carIndex = cars.findIndex((c) => c.id === carId);

                if (carIndex === -1) {
                    return res.status(404).json({
                        success: false,
                        error: 'Car not found',
                    });
                }

                const deletedCar = cars[carIndex];
                cars.splice(carIndex, 1);
                await saveCarsData(cars);

                return res.status(200).json({
                    success: true,
                    car: deletedCar,
                    message: 'Car deleted successfully',
                });
            }

            default:
                res.setHeader('Allow', 'GET, PUT, DELETE, OPTIONS');
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

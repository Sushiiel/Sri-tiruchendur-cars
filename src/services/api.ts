import { Car } from '../types/car';

// In production (Vercel), API routes are at /api/...
// In development, we fall back to localStorage
const API_BASE = '/api';

const isProduction = typeof window !== 'undefined' && window.location.hostname !== 'localhost';

// =================== BLOB API (Production) ===================

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
        ...options,
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({ error: res.statusText }));
        throw new Error(error.error || `API Error: ${res.status}`);
    }

    return res.json();
}

// =================== API Methods ===================

export async function fetchCars(): Promise<Car[]> {
    if (!isProduction) {
        return getLocalCars();
    }

    try {
        const data = await apiFetch<{ success: boolean; cars: Car[] }>('/cars');
        if (data.success && data.cars.length > 0) {
            return data.cars;
        }
        // If blob is empty, seed it first
        await seedDatabase();
        const seededData = await apiFetch<{ success: boolean; cars: Car[] }>('/cars');
        return seededData.cars || [];
    } catch (error) {
        console.warn('Blob API unavailable, falling back to localStorage:', error);
        return getLocalCars();
    }
}

export async function addCar(car: Car): Promise<Car> {
    if (!isProduction) {
        return addLocalCar(car);
    }

    try {
        const data = await apiFetch<{ success: boolean; car: Car }>('/cars', {
            method: 'POST',
            body: JSON.stringify(car),
        });
        return data.car;
    } catch (error) {
        console.warn('Blob API unavailable, falling back to localStorage:', error);
        return addLocalCar(car);
    }
}

export async function updateCar(id: number, car: Car): Promise<Car> {
    if (!isProduction) {
        return updateLocalCar(id, car);
    }

    try {
        const data = await apiFetch<{ success: boolean; car: Car }>(`/cars/${id}`, {
            method: 'PUT',
            body: JSON.stringify(car),
        });
        return data.car;
    } catch (error) {
        console.warn('Blob API unavailable, falling back to localStorage:', error);
        return updateLocalCar(id, car);
    }
}

export async function deleteCar(id: number): Promise<void> {
    if (!isProduction) {
        deleteLocalCar(id);
        return;
    }

    try {
        await apiFetch(`/cars/${id}`, { method: 'DELETE' });
    } catch (error) {
        console.warn('Blob API unavailable, falling back to localStorage:', error);
        deleteLocalCar(id);
    }
}

export async function uploadImage(file: File): Promise<string> {
    if (!isProduction) {
        // In dev, return object URL
        return URL.createObjectURL(file);
    }

    const res = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        headers: {
            'Content-Type': file.type,
            'x-filename': file.name,
        },
        body: file,
    });

    if (!res.ok) {
        throw new Error('Upload failed');
    }

    const data = await res.json();
    return data.url;
}

export async function seedDatabase(): Promise<void> {
    try {
        await apiFetch('/cars/seed', { method: 'POST' });
    } catch (error) {
        console.warn('Seed failed:', error);
    }
}

// =================== localStorage Fallback (Dev) ===================

const LOCAL_STORAGE_KEY = 'car-storage';

function getLocalStore(): { state: { cars: Car[]; isAdmin: boolean } } {
    try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch { }
    return { state: { cars: [], isAdmin: false } };
}

function saveLocalStore(cars: Car[]) {
    const store = getLocalStore();
    store.state.cars = cars;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store));
}

function getLocalCars(): Car[] {
    return getLocalStore().state.cars;
}

function addLocalCar(car: Car): Car {
    const cars = getLocalCars();
    car.id = car.id || Date.now();
    cars.push(car);
    saveLocalStore(cars);
    return car;
}

function updateLocalCar(id: number, car: Car): Car {
    const cars = getLocalCars();
    const index = cars.findIndex(c => c.id === id);
    if (index !== -1) {
        cars[index] = { ...car, id };
        saveLocalStore(cars);
    }
    return car;
}

function deleteLocalCar(id: number): void {
    const cars = getLocalCars().filter(c => c.id !== id);
    saveLocalStore(cars);
}

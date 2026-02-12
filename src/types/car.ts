export interface Car {
    id: number;
    name: string;
    brand: string;
    model: string;
    variant?: string;
    year: string;
    mfgYear?: string;
    fuel: string;
    km: string;
    transmission: string;
    price: string;
    priceType?: string;
    image: string;
    video?: string | null;
    hasVideo?: boolean;
    has360?: boolean;

    // Basic Info
    owner: string;
    color?: string;
    bodyType?: string;

    // Legal Details
    regNumber?: string;
    rto?: string;
    rcAvailable?: string;
    insuranceStatus?: string;
    insuranceType?: string;
    insuranceValidTill?: string;

    noc?: string;

    // Pricing
    exchange?: boolean;
    finance?: boolean;
    advanceAmount?: string;

    // Condition
    condition?: string;
    accident?: string;
    flood?: string;
    serviceHistory?: string;
    tyreCondition?: 'New' | 'Good' | 'Worn';
    batteryCondition?: 'New' | 'Good' | 'Replace';
    majorIssues?: string;

    // Features
    features?: string[];

    // Seller
    seller?: {
        name: string;
        phone: string;
        whatsapp: string;
        location: string;
        workingHours?: string;
    };

    // Support
    support?: {
        rcTransfer: boolean;
        insurance: boolean;
        loan: boolean;
    };

    // Notes
    notes?: string;

    // Legacy
    details?: {
        owner: string;
        insurance: string;
        condition: string;
        features: string[];
        location: string;
    };
}

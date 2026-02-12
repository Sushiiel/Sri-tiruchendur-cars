import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useCarStore } from '../../store/carStore';
import { Car } from '../../types/car';

interface CarFormProps {
    carId?: number | null;
    onCancel: () => void;
    onSuccess: () => void;
}

const TABS = [
    { id: 'basic', label: '1. Basic Info', icon: 'fa-info-circle' },
    { id: 'legal_condition', label: '2. Reg & Condition', icon: 'fa-file-contract' },
    { id: 'pricing_features', label: '3. Price & Features', icon: 'fa-tags' },
    { id: 'media_seller', label: '4. Media & Seller', icon: 'fa-camera' },
];

export default function CarForm({ carId, onCancel, onSuccess }: CarFormProps) {
    const { cars, addCar, updateCar } = useCarStore();
    const [activeTab, setActiveTab] = useState('basic');

    const existingCar = carId ? cars.find(c => c.id === carId) : null;

    const defaultValues: Partial<Car> = existingCar || {
        features: [],
        seller: {
            name: 'V. Anand',
            phone: '9842754254',
            whatsapp: '9842754254',
            location: 'Tiruchendur',
            workingHours: '9 AM - 9 PM'
        },
        support: {
            rcTransfer: true,
            insurance: false,
            loan: false
        }
    };

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<Car>({
        defaultValues
    });

    const brand = watch('brand');
    const model = watch('model');
    const variant = watch('variant');

    useEffect(() => {
        if (brand && model) {
            const name = `${brand} ${model}${variant ? ' ' + variant : ''}`;
            setValue('name', name);
        }
    }, [brand, model, variant, setValue]);

    const onSubmit = (data: Car) => {
        const carData = {
            ...data,
            id: carId || Date.now(),
            price: data.price.replace(/,/g, ''),
        };

        if (carId) {
            updateCar(carId, carData);
        } else {
            addCar(carData);
        }
        onSuccess();
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    {carId ? 'Edit Car Details' : 'Add New Car'}
                </h2>
                <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
                    <i className="fas fa-times text-xl"></i>
                </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
                {TABS.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors whitespace-nowrap border-b-2 -mb-px ${activeTab === tab.id
                            ? 'border-primary text-primary bg-orange-50/50'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <i className={`fas ${tab.icon}`}></i>
                        {tab.label}
                    </button>
                ))}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* TAB 1: BASIC INFO */}
                <div className={activeTab === 'basic' ? 'block' : 'hidden'}>
                    <h3 className="section-title">1. Vehicle Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormGroup label="Car Brand *" error={errors.brand}>
                            <select {...register('brand', { required: 'Required' })} className="input-field">
                                <option value="">Select Brand</option>
                                {['Maruti', 'Hyundai', 'Honda', 'Toyota', 'Tata', 'Mahindra', 'Kia', 'Ford', 'Volkswagen', 'Renault', 'Nissan', 'Skoda', 'MG', 'Jeep', 'BMW', 'Audi', 'Mercedes'].map(b => (
                                    <option key={b} value={b}>{b}</option>
                                ))}
                            </select>
                        </FormGroup>
                        <FormGroup label="Car Model *" error={errors.model}>
                            <input {...register('model', { required: 'Required' })} className="input-field" placeholder="e.g. Swift" />
                        </FormGroup>
                        <FormGroup label="Variant">
                            <input {...register('variant')} className="input-field" placeholder="e.g. VXI" />
                        </FormGroup>
                        <FormGroup label="Year of Manufacture">
                            <select {...register('mfgYear')} className="input-field">
                                {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i).map(y => (
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                        </FormGroup>
                        <FormGroup label="Registration Year">
                            <select {...register('year', { required: 'Required' })} className="input-field">
                                {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i).map(y => (
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                        </FormGroup>
                        <FormGroup label="Fuel Type">
                            <select {...register('fuel', { required: 'Required' })} className="input-field">
                                <option value="Petrol">Petrol</option>
                                <option value="Diesel">Diesel</option>
                                <option value="CNG">CNG</option>
                                <option value="Electric">Electric</option>
                            </select>
                        </FormGroup>
                        <FormGroup label="Transmission">
                            <select {...register('transmission', { required: 'Required' })} className="input-field">
                                <option value="Manual">Manual</option>
                                <option value="Automatic">Automatic</option>
                                <option value="AMT">AMT</option>
                            </select>
                        </FormGroup>
                        <FormGroup label="Kilometers Driven">
                            <input {...register('km', { required: 'Required' })} type="number" className="input-field" placeholder="e.g. 50000" />
                        </FormGroup>
                        <FormGroup label="Ownership">
                            <select {...register('owner')} className="input-field">
                                <option value="1st Owner">1st Owner</option>
                                <option value="2nd Owner">2nd Owner</option>
                                <option value="3rd Owner">3rd Owner</option>
                            </select>
                        </FormGroup>
                        <FormGroup label="Color">
                            <input {...register('color')} className="input-field" placeholder="e.g. White" />
                        </FormGroup>
                        <FormGroup label="Body Type">
                            <select {...register('bodyType')} className="input-field">
                                <option value="Hatchback">Hatchback</option>
                                <option value="Sedan">Sedan</option>
                                <option value="SUV">SUV</option>
                                <option value="MUV">MUV</option>
                            </select>
                        </FormGroup>
                    </div>
                </div>

                {/* TAB 2: REGISTRATION & CONDITION */}
                <div className={activeTab === 'legal_condition' ? 'block' : 'hidden'}>
                    <h3 className="section-title">2. Registration & Legal Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <FormGroup label="Registration Number">
                            <input {...register('regNumber')} className="input-field uppercase" placeholder="e.g. TN-69-AA-1234" />
                        </FormGroup>
                        <FormGroup label="RTO Location (TN Code)">
                            <input {...register('rto')} className="input-field" placeholder="e.g. Tiruchendur" />
                        </FormGroup>
                        <FormGroup label="RC Book Available">
                            <select {...register('rcAvailable')} className="input-field">
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </FormGroup>
                        <div className="col-span-2 grid grid-cols-3 gap-4 border p-4 rounded bg-gray-50">
                            <FormGroup label="Insurance Status">
                                <select {...register('insuranceStatus')} className="input-field">
                                    <option value="Valid">Valid</option>
                                    <option value="Expired">Expired</option>
                                </select>
                            </FormGroup>
                            <FormGroup label="Insurance Type">
                                <select {...register('insuranceType')} className="input-field">
                                    <option value="Comprehensive">Comprehensive</option>
                                    <option value="Third Party">Third Party</option>
                                </select>
                            </FormGroup>
                            <FormGroup label="Tax Validity">
                                <input {...register('insuranceValidTill')} type="date" className="input-field" />
                            </FormGroup>
                        </div>

                        <FormGroup label="NOC Available">
                            <select {...register('noc')} className="input-field">
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </FormGroup>
                    </div>

                    <h3 className="section-title">4. Vehicle Condition Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormGroup label="Overall Condition">
                            <select {...register('condition')} className="input-field">
                                <option value="Excellent">Excellent</option>
                                <option value="Good">Good</option>
                                <option value="Fair">Fair</option>
                            </select>
                        </FormGroup>
                        <FormGroup label="Accident History">
                            <select {...register('accident')} className="input-field">
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                        </FormGroup>
                        <FormGroup label="Flood Affected">
                            <select {...register('flood')} className="input-field">
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                        </FormGroup>
                        <FormGroup label="Service History">
                            <select {...register('serviceHistory')} className="input-field">
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </FormGroup>
                        <FormGroup label="Tyre Condition">
                            <select {...register('tyreCondition')} className="input-field">
                                <option value="New">New</option>
                                <option value="Good">Good</option>
                                <option value="Worn">Worn</option>
                            </select>
                        </FormGroup>
                        <FormGroup label="Battery Condition">
                            <select {...register('batteryCondition')} className="input-field">
                                <option value="New">New</option>
                                <option value="Good">Good</option>
                                <option value="Replace">Replace</option>
                            </select>
                        </FormGroup>
                        <div className="md:col-span-3">
                            <FormGroup label="Any Major Issues?">
                                <textarea {...register('majorIssues')} className="input-field h-20" placeholder="Mention any major issues if yes..." />
                            </FormGroup>
                        </div>
                    </div>
                </div>

                {/* TAB 3: PRICING & FEATURES */}
                <div className={activeTab === 'pricing_features' ? 'block' : 'hidden'}>
                    <h3 className="section-title">3. Pricing Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <FormGroup label="Expected Price (₹) *" error={errors.price}>
                            <input {...register('price', { required: 'Required' })} type="number" className="input-field text-xl font-bold" />
                        </FormGroup>
                        <FormGroup label="Price Type">
                            <select {...register('priceType')} className="input-field">
                                <option value="Fixed">Fixed</option>
                                <option value="Negotiable">Negotiable</option>
                            </select>
                        </FormGroup>
                        <FormGroup label="Advance Amount (if any)">
                            <input {...register('advanceAmount')} className="input-field" type="number" placeholder="e.g. 50000" />
                        </FormGroup>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" {...register('exchange')} className="checkbox" /> Exchange Option
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" {...register('finance')} className="checkbox" /> Finance Available
                            </label>
                        </div>
                    </div>

                    <h3 className="section-title">5. Features & Specifications</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border p-4 rounded bg-gray-50">
                        {['Power Steering', 'Power Windows (Front)', 'Power Windows (Rear)', 'Airbags', 'ABS', 'Touchscreen / Infotainment', 'Reverse Camera', 'Reverse Parking Sensors', 'AC – Good Condition', 'Alloy Wheels', 'Music System', 'Central Locking'].map(feature => (
                            <label key={feature} className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" value={feature} {...register('features')} className="checkbox" />
                                <span className="text-sm">{feature}</span>
                            </label>
                        ))}
                    </div>
                    <div className="mt-4">
                        <FormGroup label="Other Features">
                            <input {...register('notes')} className="input-field" placeholder="Any other features..." />
                        </FormGroup>
                    </div>
                </div>

                {/* TAB 4: MEDIA, SELLER, NOTES */}
                <div className={activeTab === 'media_seller' ? 'block' : 'hidden'}>
                    <h3 className="section-title">6. Photos / Media (URLs for now)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <FormGroup label="Main Image URL">
                            <input {...register('image')} className="input-field" placeholder="https://..." />
                        </FormGroup>
                        <FormGroup label="Video URL">
                            <input {...register('video')} className="input-field" placeholder="https://youtube.com/..." />
                        </FormGroup>
                        <div className="md:col-span-2">
                            <p className="text-sm font-semibold mb-2">Internal Checklist (Tick if taken)</p>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                {['Front View', 'Rear View', 'Left Side', 'Right Side', 'Interior', 'Dashboard', 'Odometer', 'Engine Bay', 'Tyres', 'Video Taken'].map(item => (
                                    <label key={item} className="flex items-center gap-2">
                                        <input type="checkbox" className="checkbox" /> {item}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <h3 className="section-title">7. Seller / Dealer Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <FormGroup label="Dealer / Seller Name">
                            <input {...register('seller.name')} className="input-field" />
                        </FormGroup>
                        <FormGroup label="Contact Number">
                            <input {...register('seller.phone')} className="input-field" />
                        </FormGroup>
                        <FormGroup label="WhatsApp Number">
                            <input {...register('seller.whatsapp')} className="input-field" />
                        </FormGroup>
                        <FormGroup label="Location">
                            <input {...register('seller.location')} className="input-field" />
                        </FormGroup>
                        <FormGroup label="Working Hours">
                            <input {...register('seller.workingHours')} className="input-field" placeholder="e.g. 9 AM - 9 PM" />
                        </FormGroup>
                    </div>

                    <h3 className="section-title">8. Buyer Support Services</h3>
                    <div className="flex flex-wrap gap-6 mb-8">
                        <label className="flex items-center gap-2"><input type="checkbox" {...register('support.rcTransfer')} className="checkbox" /> RC Transfer Support</label>
                        <label className="flex items-center gap-2"><input type="checkbox" {...register('support.insurance')} className="checkbox" /> Insurance Assistance</label>
                        <label className="flex items-center gap-2"><input type="checkbox" {...register('support.loan')} className="checkbox" /> Loan Assistance</label>
                    </div>

                    <h3 className="section-title">9. Additional Notes</h3>
                    <FormGroup label="">
                        <textarea {...register('notes')} className="input-field h-24" placeholder="Any final notes..." />
                    </FormGroup>
                </div>

                <div className="flex justify-end gap-4 pt-6 border-t border-gray-100 mt-6 sticky bottom-0 bg-white p-4 shadow-top z-10">
                    <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>
                    <button type="submit" className="btn-primary flex items-center gap-2">
                        <i className="fas fa-save"></i> {carId ? 'Update Details' : 'Save Details'}
                    </button>
                </div>
            </form>
        </div>
    );
}

function FormGroup({ label, children, error }: { label: string, children: React.ReactNode, error?: any }) {
    return (
        <div className="flex flex-col gap-1.5">
            {label && <label className="text-sm font-semibold text-gray-700">{label}</label>}
            {children}
            {error && <span className="text-red-500 text-xs">{error.message}</span>}
        </div>
    );
}

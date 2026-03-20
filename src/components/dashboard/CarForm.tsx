import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useCarStore } from '../../store/carStore';
import { Car } from '../../types/car';
import { uploadFile } from '../../services/api';

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

// Max file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export default function CarForm({ carId, onCancel, onSuccess }: CarFormProps) {
    const { cars, addCar, updateCar } = useCarStore();
    const [activeTab, setActiveTab] = useState('basic');

    // Upload state
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState('');
    const [uploadError, setUploadError] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isDragActive, setIsDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Gallery upload state
    const [galleryImages, setGalleryImages] = useState<string[]>([]);
    const [isUploadingGallery, setIsUploadingGallery] = useState(false);
    const galleryInputRef = useRef<HTMLInputElement>(null);

    const existingCar = carId ? cars.find(c => c.id === carId) : null;

    const defaultValues: Partial<Car> = existingCar || {
        features: [],
        seller: {
            name: 'V. Anand',
            phone: '9629509333',
            whatsapp: '9629509333',
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

    // Set initial preview from existing car
    useEffect(() => {
        if (existingCar?.image) {
            setImagePreview(existingCar.image);
        }
    }, [existingCar]);

    // =================== File Upload Handlers ===================

    const validateFile = (file: File): string | null => {
        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
            return `Invalid file type: ${file.type}. Allowed: JPEG, PNG, WebP, GIF`;
        }
        if (file.size > MAX_FILE_SIZE) {
            return `File too large: ${(file.size / 1024 / 1024).toFixed(1)}MB. Max: 10MB`;
        }
        return null;
    };

    const handleFileUpload = async (file: File) => {
        const error = validateFile(file);
        if (error) {
            setUploadError(error);
            return;
        }

        setIsUploading(true);
        setUploadError('');
        setUploadProgress('Uploading...');

        // Show local preview immediately
        const localPreview = URL.createObjectURL(file);
        setImagePreview(localPreview);

        try {
            const result = await uploadFile(file);
            setValue('image', result.url);
            setImagePreview(result.url);
            setUploadProgress(`✓ Uploaded (${(result.size / 1024).toFixed(0)} KB)`);
        } catch (err: any) {
            setUploadError(`Upload failed: ${err.message}`);
            setImagePreview(null);
            setUploadProgress('');
        } finally {
            setIsUploading(false);
            URL.revokeObjectURL(localPreview);
        }
    };

    const handleGalleryUpload = async (files: FileList) => {
        setIsUploadingGallery(true);
        const newUrls: string[] = [];

        for (const file of Array.from(files)) {
            const error = validateFile(file);
            if (error) continue;

            try {
                const result = await uploadFile(file);
                newUrls.push(result.url);
            } catch (err) {
                console.error('Gallery upload failed:', err);
            }
        }

        setGalleryImages(prev => [...prev, ...newUrls]);
        setIsUploadingGallery(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragActive(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFileUpload(file);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragActive(true);
    };

    const handleDragLeave = () => {
        setIsDragActive(false);
    };

    const removeMainImage = () => {
        setImagePreview(null);
        setValue('image', '');
        setUploadProgress('');
        setUploadError('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const removeGalleryImage = (index: number) => {
        setGalleryImages(prev => prev.filter((_, i) => i !== index));
    };

    // =================== Form Submit ===================

    const onSubmit = (data: Car) => {
        const carData = {
            ...data,
            id: carId || Date.now(),
            price: data.price.replace(/,/g, ''),
            // Include gallery images if any
            ...(galleryImages.length > 0 && { galleryImages }),
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
                    <h3 className="section-title">
                        <i className="fas fa-cloud-upload-alt mr-2 text-primary"></i>
                        6. Upload Car Photos
                    </h3>

                    {/* ===== MAIN IMAGE UPLOAD ===== */}
                    <div className="mb-8">
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">Main Photo *</label>

                        {imagePreview ? (
                            /* Image Preview */
                            <div className="relative group rounded-xl overflow-hidden border-2 border-green-300 bg-gray-50" style={{ maxWidth: '400px' }}>
                                <img
                                    src={imagePreview}
                                    alt="Car preview"
                                    className="w-full h-56 object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors shadow-lg"
                                    >
                                        <i className="fas fa-sync-alt mr-2"></i>Replace
                                    </button>
                                    <button
                                        type="button"
                                        onClick={removeMainImage}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors shadow-lg"
                                    >
                                        <i className="fas fa-trash mr-2"></i>Remove
                                    </button>
                                </div>
                                {uploadProgress && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-green-500/90 text-white text-xs py-1.5 px-3 flex items-center gap-2">
                                        <i className="fas fa-check-circle"></i>
                                        {uploadProgress}
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* Drag & Drop Upload Zone */
                            <div
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onClick={() => fileInputRef.current?.click()}
                                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${isDragActive
                                    ? 'border-primary bg-orange-50 scale-[1.02] shadow-lg'
                                    : 'border-gray-300 hover:border-primary hover:bg-orange-50/30'
                                    } ${isUploading ? 'opacity-60 pointer-events-none' : ''}`}
                            >
                                {isUploading ? (
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                        <p className="text-primary font-medium">Uploading to Vercel Blob...</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center">
                                            <i className="fas fa-cloud-upload-alt text-3xl text-primary"></i>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-700">
                                                {isDragActive ? 'Drop your photo here!' : 'Drag & Drop car photo here'}
                                            </p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                or <span className="text-primary font-medium underline">click to browse</span>
                                            </p>
                                        </div>
                                        <p className="text-xs text-gray-400">JPEG, PNG, WebP • Max 10MB</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Hidden file input */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleFileUpload(file);
                            }}
                        />

                        {/* Error message */}
                        {uploadError && (
                            <div className="mt-2 bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                                <i className="fas fa-exclamation-circle"></i>
                                {uploadError}
                            </div>
                        )}

                        {/* Fallback URL input */}
                        <div className="mt-3">
                            <details className="text-sm">
                                <summary className="text-gray-500 cursor-pointer hover:text-primary transition-colors">
                                    <i className="fas fa-link mr-1"></i> Or paste an image URL instead
                                </summary>
                                <div className="mt-2">
                                    <input
                                        {...register('image')}
                                        className="input-field"
                                        placeholder="https://example.com/car-photo.jpg"
                                        onChange={(e) => {
                                            setValue('image', e.target.value);
                                            if (e.target.value) setImagePreview(e.target.value);
                                        }}
                                    />
                                </div>
                            </details>
                        </div>

                        {/* Hidden field for the actual image URL */}
                        <input type="hidden" {...register('image')} />
                    </div>

                    {/* ===== GALLERY IMAGES ===== */}
                    <div className="mb-8">
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">
                            <i className="fas fa-images mr-1 text-primary"></i>
                            Additional Photos (Gallery)
                        </label>

                        <div className="flex flex-wrap gap-3 mb-3">
                            {galleryImages.map((url, i) => (
                                <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-gray-200 group">
                                    <img src={url} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeGalleryImage(i)}
                                        className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}

                            {/* Add more button */}
                            <button
                                type="button"
                                onClick={() => galleryInputRef.current?.click()}
                                disabled={isUploadingGallery}
                                className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 hover:border-primary hover:bg-orange-50/30 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer disabled:opacity-50"
                            >
                                {isUploadingGallery ? (
                                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <i className="fas fa-plus text-gray-400"></i>
                                        <span className="text-[10px] text-gray-400">Add Photo</span>
                                    </>
                                )}
                            </button>
                        </div>

                        <input
                            ref={galleryInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            multiple
                            className="hidden"
                            onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                    handleGalleryUpload(e.target.files);
                                }
                            }}
                        />
                        <p className="text-xs text-gray-400">Upload multiple photos: Front, Rear, Sides, Interior, Dashboard, Engine</p>
                    </div>

                    {/* ===== VIDEO URL ===== */}
                    <div className="mb-8">
                        <FormGroup label="Video URL (YouTube / Direct Link)">
                            <input {...register('video')} className="input-field" placeholder="https://youtube.com/..." />
                        </FormGroup>
                    </div>

                    {/* ===== INTERNAL CHECKLIST ===== */}
                    <div className="mb-8">
                        <p className="text-sm font-semibold mb-2">Internal Checklist (Tick if taken)</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            {['Front View', 'Rear View', 'Left Side', 'Right Side', 'Interior', 'Dashboard', 'Odometer', 'Engine Bay', 'Tyres', 'Video Taken'].map(item => (
                                <label key={item} className="flex items-center gap-2">
                                    <input type="checkbox" className="checkbox" /> {item}
                                </label>
                            ))}
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
                    <button
                        type="submit"
                        disabled={isUploading}
                        className="btn-primary flex items-center gap-2 disabled:opacity-50"
                    >
                        <i className={`fas ${isUploading ? 'fa-spinner fa-spin' : 'fa-save'}`}></i>
                        {carId ? 'Update Details' : 'Save Details'}
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

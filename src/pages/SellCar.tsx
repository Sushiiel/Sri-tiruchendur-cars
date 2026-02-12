import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface SellInquiry {
    name: string;
    phone: string;
    brand: string;
    model: string;
    year: string;
    expectedPrice: string;
}

export default function SellCar() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<SellInquiry>();
    const [success, setSuccess] = useState(false);

    const onSubmit = (data: SellInquiry) => {
        // Simulate API call
        setTimeout(() => {
            setSuccess(true);
            reset();
            window.scrollTo(0, 0);
        }, 1000);
    };

    if (success) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
                <Navbar />
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center animate-fade-in-up mt-24">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i className="fas fa-check text-green-600 text-3xl"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Request Received!</h2>
                    <p className="text-gray-600 mb-6">
                        Thank you for your interest. Our team will contact you shortly to evaluate your car.
                    </p>
                    <button
                        onClick={() => setSuccess(false)}
                        className="btn-primary w-full"
                    >
                        Submit Another Request
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    <div className="space-y-6">
                        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide">
                            Initial Valuation
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                            Get the <span className="text-primary">Best Price</span> for Your Car
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Sell your car from the comfort of your home. Instant valuation, free inspection, and quick payment explicitly designed for your convenience.
                        </p>

                        <div className="space-y-4 pt-4">
                            <FeatureItem icon="fa-bolt" title="Instant Quote" desc="Get a fair market price in minutes." />
                            <FeatureItem icon="fa-file-signature" title="Zero Paperwork" desc="We handle all the documents and RC transfer." />
                            <FeatureItem icon="fa-wallet" title="Instant Payment" desc="Money transferred directly to your account." />
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Car Details</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                    <input {...register('name', { required: true })} className="input-field" placeholder="John Doe" />
                                    {errors.name && <span className="text-red-500 text-xs">Required</span>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input {...register('phone', { required: true })} className="input-field" placeholder="9876543210" />
                                    {errors.phone && <span className="text-red-500 text-xs">Required</span>}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Car Brand</label>
                                    <input {...register('brand', { required: true })} className="input-field" placeholder="e.g. Maruti" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Car Model</label>
                                    <input {...register('model', { required: true })} className="input-field" placeholder="e.g. Swift" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Reg. Year</label>
                                    <input {...register('year', { required: true })} className="input-field" placeholder="e.g. 2018" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Expected Price (₹)</label>
                                    <input {...register('expectedPrice')} className="input-field" placeholder="e.g. 400000" />
                                </div>
                            </div>

                            <button type="submit" className="btn-primary w-full py-3.5 text-lg font-bold shadow-lg mt-4">
                                Get Free Valuation
                            </button>

                            <p className="text-xs text-center text-gray-400 mt-4">
                                By submitting this form, you agree to our Terms & Privacy Policy.
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

function FeatureItem({ icon, title, desc }: { icon: string, title: string, desc: string }) {
    return (
        <div className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-50">
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center flex-shrink-0 text-primary text-xl">
                <i className={`fas ${icon}`}></i>
            </div>
            <div>
                <h3 className="font-bold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-500">{desc}</p>
            </div>
        </div>
    );
}

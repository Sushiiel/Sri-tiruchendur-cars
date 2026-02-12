import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setSuccess(true);
            setFormData({ name: '', email: '', phone: '', message: '' });
        }, 1000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />

            <div className="relative bg-secondary py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Get in Touch</h1>
                    <p className="text-orange-100 text-lg max-w-2xl mx-auto">
                        Have questions about buying or selling a car? We're here to help you with expert advice and support.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Contact Info Cards */}
                    <div className="lg:col-span-1 space-y-6">
                        <ContactCard
                            icon="fa-map-marker-alt"
                            title="Visit Us"
                            content="123, Main Road, Tiruchendur - 628215, Tamil Nadu"
                        />
                        <ContactCard
                            icon="fa-phone-alt"
                            title="Call Us"
                            content="+91 98427 54254"
                            action="tel:+919842754254"
                        />
                        <ContactCard
                            icon="fa-envelope"
                            title="Email Us"
                            content="info@sritiruchendurcars.com"
                            action="mailto:info@sritiruchendurcars.com"
                        />
                        <ContactCard
                            icon="fa-clock"
                            title="Working Hours"
                            content="Mon - Sat: 9:00 AM - 9:00 PM"
                        />
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>

                        {success ? (
                            <div className="bg-green-50 text-green-700 p-6 rounded-xl flex items-center gap-4 animate-fade-in text-lg font-medium border border-green-200">
                                <i className="fas fa-check-circle text-2xl"></i>
                                Message sent successfully! We'll allow you shortly.
                                <button
                                    onClick={() => setSuccess(false)}
                                    className="ml-auto text-sm text-green-800 underline hover:text-green-900"
                                >
                                    Send another
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                        <input
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="input-field"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                        <input
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="input-field"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="input-field"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea
                                        name="message"
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="input-field resize-none"
                                        placeholder="Tell us what you're looking for..."
                                    />
                                </div>

                                <div className="flex justify-end">
                                    <button type="submit" className="btn-primary px-8 py-3 text-lg font-bold shadow-lg flex items-center gap-2">
                                        <i className="fas fa-paper-plane"></i> Send Message
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            {/* Map Embed */}
            <div className="h-96 w-full bg-gray-200">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15797.66981881525!2d78.1189!3d8.4839!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b03886f37685655%3A0xe104cf2863f6990!2sTiruchendur%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1645451234567!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Location Map"
                ></iframe>
            </div>

            <Footer />
        </div>
    );
}

function ContactCard({ icon, title, content, action }: { icon: string, title: string, content: string, action?: string }) {
    const Wrapper = action ? 'a' : 'div';
    return (
        // @ts-ignore
        <Wrapper
            href={action}
            className={`block bg-white p-6 rounded-xl shadow-md border border-gray-50 flex items-start gap-4 transition-transform hover:-translate-y-1 ${action ? 'hover:shadow-lg cursor-pointer' : ''}`}
        >
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-primary text-xl flex-shrink-0">
                <i className={`fas ${icon}`}></i>
            </div>
            <div>
                <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
                <p className="text-gray-600 font-medium">{content}</p>
            </div>
        </Wrapper>
    );
}

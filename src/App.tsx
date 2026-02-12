import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cars from './pages/Cars';
import CarDetails from './pages/CarDetails';
import Contact from './pages/Contact';
import SellCar from './pages/SellCar';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import './index.css';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cars" element={<Cars />} />
                <Route path="/cars/:id" element={<CarDetails />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/sell" element={<SellCar />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;

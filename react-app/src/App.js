import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import DigitalId from './pages/DigitalId';
import GeoFencing from './pages/GeoFencing';
import PanicButton from './pages/PanicButton';
import AIAnomaly from './pages/AIAnomaly';
import OfflineSMS from './pages/OfflineSMS';
import FAQ from './pages/FAQ';
import Footer from './components/Footer';
import EmergencyLocator from './pages/emergencylocator';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/digital-id" element={<DigitalId />} />
          <Route path="/geo-fencing" element={<GeoFencing />} />
          <Route path="/panic-button" element={<PanicButton />} />
          <Route path="/ai-anomaly" element={<AIAnomaly />} />
          <Route path="/offline-sms" element={<OfflineSMS />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/emergency-locator" element={<EmergencyLocator />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
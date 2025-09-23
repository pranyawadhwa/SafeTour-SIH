import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('ENG');

  const languages = [
    'ENG', 'HIN', 'ASM', 'GUJ', 'PUN', 'BEN', 'TEL', 'TAM', 'URD'
  ];

  return (
    <header className="header">
      <div className="container">
        <div className="logo">SafeTour</div>
        <nav className="nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li className="dropdown">
              <button className="dropbtn">Features</button>
              <div className="dropdown-content">
                <Link to="/digital-id">Digital Tourist ID</Link>
                <Link to="/geo-fencing">Geo-fencing Alerts</Link>
                <Link to="/panic-button">Panic Button</Link>
                <Link to="/ai-anomaly">AI Anomaly Detection</Link>
                <Link to="/offline-sms">Offline Emergency SMS</Link>
                <Link to="/emergency-locator">Near Emergency Services</Link>
              </div>
            </li>
            <li><a href="#guides">Guides</a></li>
            <li><a href="#dashboard">Dashboard</a></li>
            <li><Link to="/faq">FAQs</Link></li>
            <li>
              <select 
                className="lang-selector"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </li>
            <li><a href="#" className="btn-login">Login</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
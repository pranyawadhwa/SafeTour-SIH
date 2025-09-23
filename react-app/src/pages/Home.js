import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const guides = [
    {
      id: 1,
      name: "Ammie Doe",
      photo: "guide1.png",
      speciality: "Experienced mountain guide",
      languages: "English, Hindi",
      rating: "★★★★★"
    },
    {
      id: 2,
      name: "Priya Singh",
      photo: "guide2.png",
      speciality: "Cultural tour expert",
      languages: "English, Bengali, Assamese",
      rating: "★★★★☆"
    },
    {
      id: 3,
      name: "Raj Patel",
      photo: "guide3.webp",
      speciality: "Wildlife safari specialist",
      languages: "English, Gujarati",
      rating: "★★★★★"
    }
  ];

  const handlePanicClick = () => {
    alert('Emergency alert sent! Help is on the way.');
  };

  const handleChatbotClick = () => {
    alert('Chatbot feature coming soon!');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Your Trusted Travel Safety Companion</h1>
          <p>Secure Digital ID, Real-time Alerts, Multilingual Assistance</p>
          <Link to="/digital-id" className="btn-primary">Get Started</Link>
        </div>
      </section>

      {/* Geo Fencing Section */}
      <section id="geo-fencing" className="feature-replacement container">
        <div className="left-side">
          <h2>Geo Fencing</h2>
          <p>Get real-time notifications when you step into unsafe or restricted areas.
          Stay aware of your surroundings and travel with confidence.</p>
        </div>
        <div className="gfa-map-card">
          <div className="gfa-map-placeholder">
            MAP VIEW
          </div>
        </div>
      </section>

      {/* Digital Tourist ID Section */}
      <section id="digital-id" className="feature-replacement container">
        <section className="digital-id-previewcard">
          <div className="idcard-outer">
            <div className="id-profilepic">
              <img src="https://i.pravatar.cc/120" alt="Profile Photo" />
            </div>
            <div className="idcard-content">
              <span className="idcard-title">Full Name</span>
              <div className="idcard-field">email@example.com</div>
              <div className="idcard-field">Passport No.: XXXXX</div>
              <div className="idcard-field">+91 XXXXX XXXXX</div>
              <div className="idcard-field">Emergency Contact</div>
            </div>
          </div>
        </section>
        <div className="right-side">
          <h2>Digital Tourist ID Registration</h2>
          <p>Your digital passport for a smoother travel experience.
          Quick registration, secure access, and peace of mind.</p>
        </div>
      </section>

      {/* Guides Section */}
      <section id="guides" className="container guides">
        <h2>Verified Local Guides</h2>
        <input 
          type="search" 
          placeholder="Search guides by location..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="guides-list">
          {guides.map(guide => (
            <div key={guide.id} className="guide-card">
              <img className="guide-photo" src={guide.photo} alt={guide.name} />
              <h4>{guide.name}</h4>
              <p className="speciality">{guide.speciality}</p>
              <p className="languages"><span>Languages:</span> {guide.languages}</p>
              <p className="rating">{guide.rating}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard Section */}
      <section id="dashboard" className="container dashboard-preview">
        <h2>Safety Heatmap & Dashboard</h2>
        <div className="heatmap-placeholder">
          <p>Interactive heatmap will show high-risk zones here.</p>
        </div>
        <div className="dashboard-snapshot">
          <p>Dashboard showing real-time clusters and alerts</p>
        </div>
      </section>

      {/* Sticky Buttons */}
      <button 
        className="panic-button" 
        onClick={handlePanicClick}
        title="Emergency Panic Button"
      >
        &#x2757;
      </button>

      <button 
        className="chatbot-button" 
        onClick={handleChatbotClick}
        title="Chat with us!"
      >
        💬
      </button>
    </div>
  );
};

export default Home;
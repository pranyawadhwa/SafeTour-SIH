import React, { useState } from 'react';
import '../styles/digital-id.css';

const DigitalId = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    passport: '',
    phone: '',
    emergency: '',
    photo: null
  });

  const [previewPhoto, setPreviewPhoto] = useState('https://i.pravatar.cc/120');
  const [consent, setConsent] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewPhoto(event.target.result);
      };
      reader.readAsDataURL(file);
      setFormData(prev => ({
        ...prev,
        photo: file
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!consent) {
      alert('Please accept the terms and conditions');
      return;
    }
    console.log('Form submitted:', formData);
    alert('Digital ID registration submitted successfully!');
  };

  return (
    <div>
      <div className="digital-id-hero">
        <div className="digital-id-hero-content">
          <h1>Digital Tourist ID Registration</h1>
          <p className="digital-id-tagline">One ID for every journey: Safe, Smart, Secure.</p>
        </div>
      </div>

      <main className="digital-id-page container">
        <section className="digital-id-formcard">
          <form onSubmit={handleSubmit}>
            <label htmlFor="fullName">Full Name</label>
            <input 
              id="fullName" 
              name="fullName"
              type="text" 
              placeholder="Enter full name" 
              value={formData.fullName}
              onChange={handleInputChange}
              required 
            />

            <label htmlFor="email">Email Address</label>
            <input 
              id="email" 
              name="email"
              type="email" 
              placeholder="Enter email" 
              value={formData.email}
              onChange={handleInputChange}
              required 
            />

            <label htmlFor="passport">Passport Number</label>
            <input 
              id="passport" 
              name="passport"
              type="text" 
              placeholder="Enter Passport No." 
              value={formData.passport}
              onChange={handleInputChange}
              required 
            />

            <label htmlFor="phone">Phone Number</label>
            <input 
              id="phone" 
              name="phone"
              type="tel" 
              placeholder="Enter phone number" 
              value={formData.phone}
              onChange={handleInputChange}
              required 
            />

            <label htmlFor="emergency">Emergency Contact Info</label>
            <input 
              id="emergency" 
              name="emergency"
              type="text" 
              placeholder="Emergency contact number" 
              value={formData.emergency}
              onChange={handleInputChange}
            />

            <label htmlFor="photo">Upload Photo</label>
            <input 
              type="file" 
              id="photo" 
              accept="image/*" 
              onChange={handlePhotoChange} 
            />

            <div className="consent-row">
              <input 
                type="checkbox" 
                id="consent" 
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required 
              />
              <label htmlFor="consent" style={{fontSize:'14px'}}>Consent to Terms</label>
            </div>
            <button type="submit" className="btn-primary">Submit</button>
          </form>
        </section>

        <section className="digital-id-previewcard">
          <div className="idcard-outer">
            <div className="id-profilepic">
              <img src={previewPhoto} alt="Profile Photo" />
            </div>
            <div className="idcard-content">
              <span className="idcard-title">
                {formData.fullName || 'Full Name'}
              </span>
              <div className="idcard-field">
                {formData.email || 'email@example.com'}
              </div>
              <div className="idcard-field">
                Passport No.: {formData.passport || 'XXXXX'}
              </div>
              <div className="idcard-field">
                {formData.phone || '+91 XXXXX XXXXX'}
              </div>
              <div className="idcard-field">
                {formData.emergency || 'Emergency Contact'}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DigitalId;
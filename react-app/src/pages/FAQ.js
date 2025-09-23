import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "What is the SafeTour platform?",
      answer: "SafeTour is a comprehensive travel safety assistance app that offers Digital Tourist ID, Geo-fencing alerts, Panic Button, AI anomaly detection, and more."
    },
    {
      question: "How does the Geo-fencing alert work?",
      answer: "Geo-fencing sends instant notifications when you enter unsafe or restricted zones to keep you aware and safe."
    },
    {
      question: "What is a Digital Tourist ID?",
      answer: "A secure digital identity that verifies travelers, making access to services and emergency response more efficient."
    },
    {
      question: "How do I use the Panic Button?",
      answer: "Press the Panic Button in the app or website to instantly send your location and a distress alert to your emergency contacts."
    },
    {
      question: "Is my personal data secure?",
      answer: "Yes, SafeTour uses strong encryption and safeguards to maintain your privacy and data security."
    },
    {
      question: "Can I use SafeTour offline?",
      answer: "Our Offline Emergency SMS feature allows you to send alerts without internet connectivity."
    },
    {
      question: "How do I become a Verified Local Guide?",
      answer: "Apply through our platform with your credentials, and after verification, you can serve travelers through SafeTour."
    },
    {
      question: "How does the SMS backend integration work?",
      answer: "Our platform integrates with Twilio SMS gateway to send emergency alerts and custom messages. The backend API handles SMS delivery even in offline scenarios using cellular networks."
    },
    {
      question: "What happens if I'm in an area with no internet?",
      answer: "The Offline SMS feature works through cellular networks, so you can still send emergency alerts even without internet connectivity."
    },
    {
      question: "How accurate is the AI Anomaly Detection?",
      answer: "Our AI system uses machine learning algorithms to detect unusual patterns with high accuracy, helping identify potential safety threats in real-time."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div style={{
      backgroundColor: '#f7fafc',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      minHeight: '100vh',
      paddingTop: '90px'
    }}>
      <main style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '30px 20px 60px'
      }}>
      <h1 style={{
        fontSize: '2.8rem',
        fontWeight: 900,
        letterSpacing: '1.2px',
        marginBottom: '30px',
        color: '#2c3e50',
        textAlign: 'center'
      }}>
        Frequently Asked Questions (FAQs)
      </h1>

      {faqData.map((item, index) => (
        <div 
          key={index}
          style={{
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 8px 28px rgba(58, 167, 163, 0.2)',
            marginBottom: '18px',
            border: '1px solid transparent',
            transition: 'border-color 0.3s ease'
          }}
        >
          <button 
            style={{
              background: 'transparent',
              border: 'none',
              width: '100%',
              padding: '20px 25px',
              textAlign: 'left',
              fontSize: '1.3rem',
              fontWeight: 700,
              color: '#2c3e50',
              cursor: 'pointer',
              outline: 'none',
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
            onClick={() => toggleFAQ(index)}
          >
            {item.question}
            <span style={{
              fontSize: '1.8rem',
              color: '#3aa7a3',
              transition: 'transform 0.3s ease',
              transform: activeIndex === index ? 'rotate(180deg)' : 'rotate(0deg)'
            }}>
              {activeIndex === index ? '-' : '+'}
            </span>
          </button>
          <div 
            style={{
              maxHeight: activeIndex === index ? '200px' : '0',
              overflow: 'hidden',
              padding: activeIndex === index ? '0 25px 25px 25px' : '0 25px',
              fontSize: '1.1rem',
              color: '#465a65',
              fontWeight: 600,
              lineHeight: 1.6,
              transition: 'max-height 0.3s ease, padding 0.3s ease',
              borderTop: activeIndex === index ? '1px solid #e0f3f1' : 'none'
            }}
          >
            <p style={{ margin: '15px 0 0 0' }}>{item.answer}</p>
          </div>
          </div>
        ))}
      </main>
    </div>
  );
};export default FAQ;
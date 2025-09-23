import React, { useState } from 'react';

const PanicButton = () => {
  const [isActivated, setIsActivated] = useState(false);

  const handlePanicClick = () => {
    setIsActivated(true);
    // Simulate sending emergency alert
    setTimeout(() => {
      alert('Emergency services have been notified! Your location has been shared.');
      setIsActivated(false);
    }, 2000);
  };

  return (
    <div style={{
      margin: 0,
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100vh',
      justifyContent: 'center',
      color: '#2c3e50',
      marginTop: '70px'
    }}>
      <div style={{
        background: '#f2f6fa',
        boxShadow: '0 6px 25px rgba(44, 62, 80, 0.09)',
        padding: '36px 38px 42px 38px',
        borderRadius: '24px',
        textAlign: 'center',
        maxWidth: '320px',
        marginBottom: '140px'
      }}>
        <h1 style={{
          margin: 0,
          fontSize: '2.3rem',
          fontWeight: 900,
          letterSpacing: '0.16rem',
          color: '#2c3e50'
        }}>
          Panic Button
        </h1>
        <p style={{
          fontSize: '1.18rem',
          fontWeight: 600,
          color: '#425261',
          marginTop: '18px',
          letterSpacing: '0.04rem'
        }}>
          Press to send emergency alert with your location.
        </p>
        {isActivated && (
          <p style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: '#dc3535',
            marginTop: '18px',
            animation: 'pulse 1s infinite'
          }}>
            Sending emergency alert...
          </p>
        )}
      </div>

      <button 
        style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          backgroundColor: isActivated ? '#a82828' : '#dc3535',
          border: 'none',
          color: 'white',
          fontSize: '36px',
          fontWeight: 900,
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          cursor: 'pointer',
          boxShadow: isActivated 
            ? '0 0 30px 6px rgba(220, 53, 53, 0.95)' 
            : '0 0 20px 4px rgba(220, 53, 53, 0.85)',
          animation: 'pulse 2s infinite',
          transition: 'background-color 0.3s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClick={handlePanicClick}
        aria-label="Panic Button" 
        title="Send Panic Alert"
        disabled={isActivated}
      >
        &#x2757;
      </button>

      <style jsx>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 20px 4px rgba(220, 53, 53, 0.85);
          }
          50% {
            box-shadow: 0 0 28px 12px rgba(220, 53, 53, 0.3);
          }
          100% {
            box-shadow: 0 0 20px 4px rgba(220, 53, 53, 0.85);
          }
        }
      `}</style>
    </div>
  );
};

export default PanicButton;
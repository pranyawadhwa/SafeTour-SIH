import React, { useState } from 'react';

const OfflineSMS = () => {
  const [contacts] = useState([
    "+918448617613"
  ]);

  const [formData, setFormData] = useState({
    phoneNumber: '',
    message: 'EMERGENCY ALERT: I need immediate assistance.',
    customMessage: ''
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [isConnected, setIsConnected] = useState(navigator.onLine);
  const [messageType, setMessageType] = useState('emergency'); // 'emergency' or 'custom'

  // Listen for online/offline status
  React.useEffect(() => {
    const handleOnline = () => setIsConnected(true);
    const handleOffline = () => setIsConnected(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendSMSToBackend = async (phoneNumber, message) => {
    try {
      const response = await fetch('http://localhost:3000/api/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: phoneNumber,
          message: message
        })
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('SMS API Error:', error);
      throw error;
    }
  };

  const handleSendEmergencySMS = async () => {
    setLoading(true);
    setResult(null);

    const emergencyMessage = `EMERGENCY ALERT 
I need immediate assistance! 
Location: [GPS coordinates would be here]
Time: ${new Date().toLocaleString()}
Contact local authorities immediately.
- SafeTour Emergency System`;

    const results = [];
    let successCount = 0;
    let failCount = 0;

    try {
      // Send to all emergency contacts
      for (const contact of contacts) {
        try {
          const smsResult = await sendSMSToBackend(contact, emergencyMessage);
          results.push({
            contact,
            success: smsResult.success,
            sid: smsResult.data?.sid,
            error: smsResult.error
          });
          console.log('smsResult', smsResult);
          
          if (smsResult.success) {
            successCount++;
          } else {
            failCount++;
          }
        } catch (error) {
          results.push({
            contact,
            success: false,
            error: error.message
          });
          failCount++;
        }
      }

      setResult({
        type: 'emergency',
        totalContacts: contacts.length,
        successCount,
        failCount,
        details: results
      });

    } catch (error) {
      setResult({
        type: 'error',
        error: 'Failed to send emergency alerts: ' + error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendCustomSMS = async (e) => {
    e.preventDefault();
    
    if (!formData.phoneNumber || !formData.customMessage) {
      setResult({
        type: 'error',
        error: 'Please fill in both phone number and message'
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const smsResult = await sendSMSToBackend(formData.phoneNumber, formData.customMessage);
      
      setResult({
        type: 'custom',
        success: smsResult.success,
        contact: formData.phoneNumber,
        sid: smsResult.data?.sid,
        error: smsResult.error
      });

      if (smsResult.success) {
        setFormData(prev => ({ ...prev, phoneNumber: '', customMessage: '' }));
      }
    } catch (error) {
      setResult({
        type: 'error',
        error: 'Failed to send SMS: ' + error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const addToEmergencyContacts = () => {
    if (formData.phoneNumber && !contacts.includes(formData.phoneNumber)) {
      // In a real app, this would update the backend
      alert(`${formData.phoneNumber} would be added to emergency contacts`);
    }
  };

  return (
    <div style={{
      background: '#f6f8fa',
      minHeight: '100vh',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: '20px',
      paddingTop: '90px'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: '20px 20px 0 0',
          padding: '30px',
          textAlign: 'center',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{
            fontSize: '2.2rem',
            fontWeight: 900,
            color: '#2c3e50',
            marginBottom: '10px',
            letterSpacing: '1px'
          }}>
            Offline Emergency SMS
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#6c757d',
            marginBottom: '20px'
          }}>
            Send emergency alerts and custom messages even without internet connectivity
          </p>
          
          {/* Connection Status */}
          <div style={{
            display: 'inline-block',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: 600,
            background: isConnected ? '#d4edda' : '#fff3cd',
            color: isConnected ? '#155724' : '#856404',
            border: `1px solid ${isConnected ? '#c3e6cb' : '#ffeaa7'}`
          }}>
            {isConnected ? '🟢 Online Mode' : '🔴 Offline Mode'} | Backend: SMS Gateway Ready
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '0'
        }}>
          {/* Emergency Contacts & Quick Alert */}
          <div style={{
            background: 'white',
            padding: '30px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            borderRight: '1px solid #e9ecef',
            borderRadius: '0 0 0 20px'
          }}>
            <div style={{
              background: '#fff3cd',
              borderRadius: '15px',
              padding: '20px',
              marginBottom: '25px',
              border: '1px solid #ffeaa7'
            }}>
              <h2 style={{
                fontSize: '1.3rem',
                fontWeight: 700,
                color: '#856404',
                marginBottom: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                Emergency Contacts
              </h2>
              <div style={{
                background: 'white',
                borderRadius: '10px',
                padding: '15px'
              }}>
                {contacts.map((contact, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    marginBottom: '8px',
                    background: '#f8f9fa',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#2c3e50'
                  }}>
                    <span> {contact}</span>
                    <span style={{ color: '#28a745', fontSize: '12px' }}>✓ Active</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Alert Button */}
            <button 
              onClick={handleSendEmergencySMS}
              disabled={loading}
              style={{
                width: '100%',
                background: loading ? '#6c757d' : '#dc3545',
                color: 'white',
                border: 'none',
                padding: '15px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(220, 53, 53, 0.3)',
                marginBottom: '15px'
              }}
            >
              {loading ? 'Sending Emergency Alerts...' : 'SEND EMERGENCY ALERT TO ALL'}
            </button>

            <p style={{
              fontSize: '12px',
              color: '#6c757d',
              textAlign: 'center',
              fontStyle: 'italic'
            }}>
              Will send to all {contacts.length} emergency contacts via SMS API
            </p>
          </div>

          {/* Custom SMS Form */}
          <div style={{
            background: 'white',
            padding: '30px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            borderRadius: '0 0 20px 0'
          }}>
            <h2 style={{
              fontSize: '1.3rem',
              fontWeight: 700,
              color: '#2c3e50',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              Send Custom SMS
            </h2>

            <form onSubmit={handleSendCustomSMS}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#2c3e50'
                }}>
                  Phone Number:
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="+91 9876543210"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e9ecef',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={addToEmergencyContacts}
                  style={{
                    marginTop: '5px',
                    fontSize: '12px',
                    color: '#007bff',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  + Add to Emergency Contacts
                </button>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#2c3e50'
                }}>
                  Message:
                </label>
                <textarea
                  name="customMessage"
                  value={formData.customMessage}
                  onChange={handleInputChange}
                  placeholder="Enter your custom message here..."
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e9ecef',
                    borderRadius: '8px',
                    fontSize: '16px',
                    resize: 'vertical',
                    boxSizing: 'border-box'
                  }}
                  required
                />
                <div style={{
                  fontSize: '12px',
                  color: '#6c757d',
                  textAlign: 'right',
                  marginTop: '5px'
                }}>
                  {formData.customMessage.length}/160 characters
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  background: loading ? '#6c757d' : '#28a745',
                  color: 'white',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'background 0.3s'
                }}
              >
                {loading ? 'Sending...' : ' Send SMS'}
              </button>
            </form>
          </div>
        </div>

        {/* Results Display */}
        {/* {result && (
          <div style={{
            background: 'white',
            borderRadius: '0 0 20px 20px',
            padding: '25px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            marginTop: '0'
          }}>
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: 700,
              color: '#2c3e50',
              marginBottom: '15px'
            }}>
              📊 SMS Delivery Results
            </h3>

            {result.type === 'emergency' && (
              <div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '15px',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    background: '#d4edda',
                    padding: '15px',
                    borderRadius: '10px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '24px', color: '#28a745', fontWeight: 900 }}>
                      {result.successCount}
                    </div>
                    <div style={{ fontSize: '12px', color: '#155724' }}>
                      Successful
                    </div>
                  </div>
                  <div style={{
                    background: '#f8d7da',
                    padding: '15px',
                    borderRadius: '10px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '24px', color: '#dc3545', fontWeight: 900 }}>
                      {result.failCount}
                    </div>
                    <div style={{ fontSize: '12px', color: '#721c24' }}>
                      Failed
                    </div>
                  </div>
                  <div style={{
                    background: '#e2e3e5',
                    padding: '15px',
                    borderRadius: '10px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '24px', color: '#383d41', fontWeight: 900 }}>
                      {result.totalContacts}
                    </div>
                    <div style={{ fontSize: '12px', color: '#383d41' }}>
                      Total Contacts
                    </div>
                  </div>
                </div>

                <div style={{
                  background: '#f8f9fa',
                  borderRadius: '10px',
                  padding: '15px'
                }}>
                  <h4 style={{ marginBottom: '10px', fontSize: '14px', color: '#495057' }}>
                    Detailed Results:
                  </h4>
                  {result.details.map((detail, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px 0',
                      borderBottom: index < result.details.length - 1 ? '1px solid #dee2e6' : 'none'
                    }}>
                      <span style={{ fontSize: '14px' }}>{detail.contact}</span>
                      <span style={{
                        fontSize: '12px',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        background: detail.success ? '#28a745' : '#dc3545',
                        color: 'white'
                      }}>
                        {detail.success ? '✓ Sent' : '✗ Failed'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.type === 'custom' && (
              <div style={{
                padding: '15px',
                borderRadius: '10px',
                background: result.success ? '#d4edda' : '#f8d7da',
                border: `1px solid ${result.success ? '#c3e6cb' : '#f5c6cb'}`
              }}>
                {result.success ? (
                  <div style={{ color: '#155724' }}>
                    <strong> SMS sent successfully!</strong>
                    <br />
                    <small>To: {result.contact}</small>
                    {result.sid && (
                      <>
                        <br />
                        <small>Message ID: {result.sid}</small>
                      </>
                    )}
                  </div>
                ) : (
                  <div style={{ color: '#721c24' }}>
                    <strong> SMS failed to send</strong>
                    <br />
                    <small>Error: {result.error}</small>
                  </div>
                )}
              </div>
            )}

            {result.type === 'error' && (
              <div style={{
                padding: '15px',
                borderRadius: '10px',
                background: '#f8d7da',
                border: '1px solid #f5c6cb',
                color: '#721c24'
              }}>
                <strong>Error</strong>
                <br />
                <small>{result.error}</small>
              </div>
            )}
          </div>
        )} */}

        {/* API Information */}
        {/* <div style={{
          background: '#e9ecef',
          borderRadius: '15px',
          padding: '20px',
          marginTop: '20px',
          fontSize: '14px',
          color: '#495057'
        }}>
          <h4 style={{ marginBottom: '10px', color: '#2c3e50' }}>🔧 Backend Integration Info:</h4>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li><strong>API Endpoint:</strong> http://localhost:3000/api/send-sms</li>
            <li><strong>Method:</strong> POST</li>
            <li><strong>SMS Provider:</strong> Twilio Gateway</li>
            <li><strong>Network Status:</strong> {isConnected ? 'Online' : 'Offline'} (SMS works in both modes)</li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default OfflineSMS;

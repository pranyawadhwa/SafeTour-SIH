import React, { useState } from 'react';

const GeoFencing = () => {
  const [formData, setFormData] = useState({
    zoneName: '',
    radius: '',
    alertMessage: ''
  });

  const [alerts] = useState([
    { time: '10:20 AM', zone: 'Zone A', message: 'Entry alert', status: 'Active' },
    { time: '10:20 AM', zone: 'Zone A', message: 'Custom message', status: 'Active' }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Geofence created:', formData);
    alert('Geofence created successfully!');
    setFormData({ zoneName: '', radius: '', alertMessage: '' });
  };

  return (
    <div style={{
      background: '#f6f7fa',
      minHeight: '100vh',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#1f2937',
      margin: 0,
      paddingTop: '70px'
    }}>
      <div style={{
        backgroundColor: '#2c3e50',
        color: '#fff',
        padding: '22px 0 15px 0',
        textAlign: 'center',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        boxShadow: '0 2px 18px rgba(44,62,80,0.12)'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 900,
          letterSpacing: '2px',
          marginBottom: '10px',
          marginTop: 0
        }}>
          GEO-FENCE ALERTS
        </h1>
        <p style={{
          fontSize: '1.16rem',
          fontWeight: 400,
          color: '#c7d2e0',
          margin: 0
        }}>
          Intelligent Location-Based Notifications
        </p>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        padding: '40px 0 60px 0',
        maxWidth: '1200px',
        margin: '0 auto',
        flexWrap: 'wrap'
      }}>
        <div style={{
          background: '#fff',
          borderRadius: '18px',
          boxShadow: '0 6px 25px rgba(44,62,80,0.13)',
          padding: '18px',
          height: '500px',
          width: '580px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '380px',
            height: '300px',
            background: '#f4f8fb',
            borderRadius: '13px',
            border: '2.6px solid #2c3e50',
            color: '#2c3e50',
            fontWeight: 600,
            fontSize: '1.16rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            letterSpacing: '1.2px',
            boxShadow: '0 0 20px #2c3e5070'
          }}>
            MAP VIEW
          </div>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '36px',
          minWidth: '340px'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '17px',
            boxShadow: '0 4px 18px rgba(44,62,80,0.13)',
            padding: '22px 18px 18px 18px'
          }}>
            <div style={{
              fontSize: '1.07rem',
              fontWeight: 800,
              color: '#2c3e50',
              letterSpacing: '1px',
              marginBottom: '18px'
            }}>
              CREATE NEW GEOFENCE
            </div>
            <form onSubmit={handleSubmit} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <input 
                type="text" 
                name="zoneName"
                placeholder="Zone Name" 
                value={formData.zoneName}
                onChange={handleInputChange}
                required
                style={{
                  background: '#f7fafc',
                  borderRadius: '7px',
                  border: '1.4px solid #2c3e50',
                  fontSize: '15px',
                  padding: '10px 16px'
                }}
              />
              <input 
                type="text" 
                name="radius"
                placeholder="Radius (meters)" 
                value={formData.radius}
                onChange={handleInputChange}
                required
                style={{
                  background: '#f7fafc',
                  borderRadius: '7px',
                  border: '1.4px solid #2c3e50',
                  fontSize: '15px',
                  padding: '10px 16px'
                }}
              />
              <input 
                type="text" 
                name="alertMessage"
                placeholder="Alert Message" 
                value={formData.alertMessage}
                onChange={handleInputChange}
                required
                style={{
                  background: '#f7fafc',
                  borderRadius: '7px',
                  border: '1.4px solid #2c3e50',
                  fontSize: '15px',
                  padding: '10px 16px'
                }}
              />
              <button 
                type="submit"
                style={{
                  marginTop: '8px',
                  background: '#2c3e50',
                  color: '#fff',
                  fontSize: '15px',
                  fontWeight: 800,
                  border: 'none',
                  borderRadius: '7px',
                  padding: '12px 0',
                  transition: 'background 0.28s',
                  cursor: 'pointer',
                  letterSpacing: '1px'
                }}
              >
                CREATE GEOFENCE
              </button>
            </form>
          </div>

          <div style={{
            background: '#fff',
            borderRadius: '17px',
            boxShadow: '0 4px 18px rgba(44,62,80,0.13)',
            padding: '22px 18px 18px 18px'
          }}>
            <div style={{
              fontSize: '1.07rem',
              fontWeight: 800,
              color: '#2c3e50',
              letterSpacing: '1px',
              marginBottom: '18px'
            }}>
              RECENT ALERTS
            </div>
            <table style={{
              borderCollapse: 'collapse',
              width: '100%'
            }}>
              <thead>
                <tr>
                  <th style={{
                    fontSize: '13.8px',
                    padding: '10px 7px',
                    textAlign: 'left',
                    borderBottom: '1.1px solid #e5eaf1',
                    fontWeight: 800,
                    backgroundColor: '#f6f7fa',
                    color: '#2c3e50',
                    letterSpacing: '0.8px'
                  }}>Time</th>
                  <th style={{
                    fontSize: '13.8px',
                    padding: '10px 7px',
                    textAlign: 'left',
                    borderBottom: '1.1px solid #e5eaf1',
                    fontWeight: 800,
                    backgroundColor: '#f6f7fa',
                    color: '#2c3e50',
                    letterSpacing: '0.8px'
                  }}>Zone</th>
                  <th style={{
                    fontSize: '13.8px',
                    padding: '10px 7px',
                    textAlign: 'left',
                    borderBottom: '1.1px solid #e5eaf1',
                    fontWeight: 800,
                    backgroundColor: '#f6f7fa',
                    color: '#2c3e50',
                    letterSpacing: '0.8px'
                  }}>Message</th>
                  <th style={{
                    fontSize: '13.8px',
                    padding: '10px 7px',
                    textAlign: 'left',
                    borderBottom: '1.1px solid #e5eaf1',
                    fontWeight: 800,
                    backgroundColor: '#f6f7fa',
                    color: '#2c3e50',
                    letterSpacing: '0.8px'
                  }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {alerts.map((alert, index) => (
                  <tr key={index}>
                    <td style={{
                      fontSize: '13.8px',
                      padding: '10px 7px',
                      borderBottom: '1.1px solid #e5eaf1'
                    }}>{alert.time}</td>
                    <td style={{
                      fontSize: '13.8px',
                      padding: '10px 7px',
                      borderBottom: '1.1px solid #e5eaf1'
                    }}>{alert.zone}</td>
                    <td style={{
                      fontSize: '13.8px',
                      padding: '10px 7px',
                      borderBottom: '1.1px solid #e5eaf1'
                    }}>{alert.message}</td>
                    <td style={{
                      fontSize: '13.8px',
                      padding: '10px 7px',
                      borderBottom: '1.1px solid #e5eaf1',
                      color: '#2c3e50',
                      fontWeight: 600
                    }}>{alert.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeoFencing;
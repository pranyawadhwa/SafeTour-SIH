import React, { useState } from 'react';

const AIAnomaly = () => {
  const [logs] = useState([
    {
      time: '2025-09-22 10:30 AM',
      type: 'Unauthorized Access',
      severity: 'High',
      status: 'Active'
    },
    {
      time: '2025-09-22 09:45 AM',
      type: 'Data Spike',
      severity: 'Medium',
      status: 'Resolved'
    },
    {
      time: '2025-09-21 11:20 PM',
      type: 'System Overload',
      severity: 'High',
      status: 'Active'
    }
  ]);

  const [isLiveActive, setIsLiveActive] = useState(false);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return '#dc3545';
      case 'Medium': return '#ffc107';
      case 'Low': return '#28a745';
      default: return '#6c757d';
    }
  };

  const handleUpload = () => {
    alert('Data upload feature coming soon!');
  };

  const handleLiveStream = () => {
    setIsLiveActive(!isLiveActive);
    alert(isLiveActive ? 'Live stream stopped' : 'Live stream started');
  };

  const handleSettings = () => {
    alert('Settings panel coming soon!');
  };

  return (
    <div style={{
      background: '#f6f8fa',
      minHeight: '100vh',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      paddingTop: '70px'
    }}>
      <header style={{
        background: '#2c3e50',
        color: 'white',
        padding: '30px 0',
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 900,
          margin: '0 0 10px 0',
          letterSpacing: '1px'
        }}>
          AI Anomaly Detection
        </h1>
        <p style={{
          fontSize: '1.2rem',
          margin: 0,
          color: '#c7d2e0'
        }}>
          Intelligent detection and alerting of unusual patterns
        </p>
      </header>

      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '30px'
      }}>
        <section>
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '25px',
            boxShadow: '0 4px 18px rgba(44,62,80,0.1)'
          }}>
            <h2 style={{
              fontSize: '1.4rem',
              fontWeight: 700,
              color: '#2c3e50',
              marginBottom: '20px'
            }}>
              Input Data
            </h2>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px'
            }}>
              <button 
                onClick={handleUpload}
                style={{
                  background: '#3aa7a3',
                  color: 'white',
                  border: 'none',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.3s'
                }}
              >
                Upload Data
              </button>
              <button 
                onClick={handleLiveStream}
                style={{
                  background: isLiveActive ? '#dc3545' : '#28a745',
                  color: 'white',
                  border: 'none',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.3s'
                }}
              >
                {isLiveActive ? 'Stop Live Stream' : 'Start Live Stream'}
              </button>
              <button 
                onClick={handleSettings}
                style={{
                  background: '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.3s'
                }}
              >
                Settings
              </button>
            </div>
          </div>
        </section>

        <section>
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '25px',
            boxShadow: '0 4px 18px rgba(44,62,80,0.1)'
          }}>
            <h2 style={{
              fontSize: '1.4rem',
              fontWeight: 700,
              color: '#2c3e50',
              marginBottom: '20px'
            }}>
              Real-time Anomaly Visualization
            </h2>
            <div style={{
              background: '#f8f9fa',
              border: '2px dashed #dee2e6',
              borderRadius: '10px',
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6c757d',
              fontSize: '16px',
              fontWeight: 600
            }}>
              [Graph shows anomaly spikes]
            </div>
          </div>
        </section>

        <section style={{ gridColumn: '1 / -1' }}>
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '25px',
            boxShadow: '0 4px 18px rgba(44,62,80,0.1)'
          }}>
            <h2 style={{
              fontSize: '1.4rem',
              fontWeight: 700,
              color: '#2c3e50',
              marginBottom: '20px'
            }}>
              Recent Anomaly Logs
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse'
              }}>
                <thead>
                  <tr style={{ background: '#f8f9fa' }}>
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontWeight: 700,
                      color: '#2c3e50',
                      borderBottom: '2px solid #dee2e6'
                    }}>Time</th>
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontWeight: 700,
                      color: '#2c3e50',
                      borderBottom: '2px solid #dee2e6'
                    }}>Type</th>
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontWeight: 700,
                      color: '#2c3e50',
                      borderBottom: '2px solid #dee2e6'
                    }}>Severity</th>
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontWeight: 700,
                      color: '#2c3e50',
                      borderBottom: '2px solid #dee2e6'
                    }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, index) => (
                    <tr key={index} style={{
                      borderBottom: '1px solid #dee2e6'
                    }}>
                      <td style={{ padding: '12px' }}>{log.time}</td>
                      <td style={{ padding: '12px' }}>{log.type}</td>
                      <td style={{
                        padding: '12px',
                        color: getSeverityColor(log.severity),
                        fontWeight: 600
                      }}>{log.severity}</td>
                      <td style={{ padding: '12px' }}>{log.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AIAnomaly;
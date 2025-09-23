

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/emergencylocator.css';

const igdtuwLocation = { lat: 28.6575, lon: 77.2290 };

const hospitals = [
    { name: "St. Stephen's Hospital", lat: 28.6521, lon: 77.2306, type: "hospital", time: 7 },
    { name: "Jeewan Mala Hospital", lat: 28.6560, lon: 77.2250, type: "hospital", time: 5 },
    { name: "Sant Parmanand Hospital", lat: 28.6550, lon: 77.2320, type: "hospital", time: 6 }
];

const pharmacies = [
    { name: "Life Care Pharmacy", lat: 28.6580, lon: 77.2285, type: "pharmacy", time: 2 },
    { name: "Emarsons Chemist", lat: 28.6572, lon: 77.2297, type: "pharmacy", time: 1 },
    { name: "Ashok Medicines", lat: 28.6578, lon: 77.2303, type: "pharmacy", time: 1 }
];

// Predefined danger zones with coordinates
const dangerZoneData = [
    {
        id: 1,
        name: "High Crime Area - Chandni Chowk",
        triggerPoint: { lat: 28.6563, lon: 77.2300 },
        coordinates: [
            [28.6560, 77.2295],
            [28.6565, 77.2305],
            [28.6568, 77.2302],
            [28.6562, 77.2292]
        ],
        description: "High pickpocket and theft incidents reported",
        riskLevel: "High"
    },
    {
        id: 2,
        name: "Construction Zone - Road Closure",
        triggerPoint: { lat: 28.6545, lon: 77.2275 },
        coordinates: [
            [28.6542, 77.2270],
            [28.6548, 77.2280],
            [28.6550, 77.2278],
            [28.6544, 77.2268]
        ],
        description: "Unsafe construction area with falling debris risk",
        riskLevel: "Medium"
    },
    {
        id: 3,
        name: "Dark Alley - Poor Lighting",
        triggerPoint: { lat: 28.6590, lon: 77.2320 },
        coordinates: [
            [28.6588, 77.2315],
            [28.6592, 77.2325],
            [28.6595, 77.2322],
            [28.6590, 77.2312]
        ],
        description: "Poorly lit area with recent incident reports",
        riskLevel: "High"
    },
    {
        id: 4,
        name: "Flood Prone Area",
        triggerPoint: { lat: 28.6520, lon: 77.2250 },
        coordinates: [
            [28.6515, 77.2245],
            [28.6525, 77.2255],
            [28.6528, 77.2252],
            [28.6518, 77.2242]
        ],
        description: "Area prone to waterlogging during monsoon",
        riskLevel: "Medium"
    },
    {
        id: 5,
        name: "Traffic Accident Zone",
        triggerPoint: { lat: 28.6600, lon: 77.2280 },
        coordinates: [
            [28.6595, 77.2275],
            [28.6605, 77.2285],
            [28.6608, 77.2282],
            [28.6598, 77.2272]
        ],
        description: "High traffic accident frequency intersection",
        riskLevel: "High"
    }
];

// Define custom icons outside the component to prevent re-creation on every render
const userIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
    iconSize: [30, 30]
});
const hospitalIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2972/2972185.png",
    iconSize: [30, 30]
});
const pharmacyIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2966/2966211.png",
    iconSize: [30, 30]
});

const EmergencyLocator = () => {
    const mapRef = useRef(null);
    const hospitalMarkersRef = useRef([]);
    const pharmacyMarkersRef = useRef([]);
    const dangerZoneMarkersRef = useRef([]);
    const triggerMarkersRef = useRef([]);
    const [visibleHospitals, setVisibleHospitals] = useState(true);
    const [visiblePharmacies, setVisiblePharmacies] = useState(true);
    const [dangerZoneMode, setDangerZoneMode] = useState(false);
    const [activeDangerZones, setActiveDangerZones] = useState([]);
    const [showDangerTriggers, setShowDangerTriggers] = useState(false);

    // Initial map setup on component mount
    useEffect(() => {
        if (!mapRef.current) {
            const map = L.map('map').setView([igdtuwLocation.lat, igdtuwLocation.lon], 16);
            mapRef.current = map;

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19,
                attribution: "© OpenStreetMap contributors"
            }).addTo(map);

            // Add IGDTUW marker
            L.marker([igdtuwLocation.lat, igdtuwLocation.lon], { icon: userIcon })
                .addTo(map)
                .bindPopup("📍 IGDTUW")
                .openPopup();

            // Add hospital markers
            hospitalMarkersRef.current = hospitals.map(item =>
                L.marker([item.lat, item.lon], { icon: hospitalIcon })
                    .addTo(map)
                    .bindPopup(`<b>${item.name}</b><br>Approx. ${item.time} min from IGDTUW`)
            );

            // Add pharmacy markers
            pharmacyMarkersRef.current = pharmacies.map(item =>
                L.marker([item.lat, item.lon], { icon: pharmacyIcon })
                    .addTo(map)
                    .bindPopup(`<b>${item.name}</b><br>Approx. ${item.time} min from IGDTUW`)
            );

            // Create danger zone trigger markers (initially hidden)
            triggerMarkersRef.current = dangerZoneData.map(zone => {
                const triggerIcon = L.icon({
                    iconUrl: "https://cdn-icons-png.flaticon.com/512/1828/1828843.png",
                    iconSize: [25, 25]
                });

                const marker = L.marker([zone.triggerPoint.lat, zone.triggerPoint.lon], { icon: triggerIcon })
                    .bindPopup(`<b>⚠️ Click to reveal danger zone</b><br>${zone.name}`)
                    .on('click', () => toggleDangerZone(zone));
                
                return { marker, zone };
            });
        }

        // Cleanup on unmount
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    // Function to toggle danger zones
    const toggleDangerZone = (zoneData) => {
        const existingZone = activeDangerZones.find(zone => zone.id === zoneData.id);
        
        if (existingZone) {
            // Remove the danger zone
            mapRef.current.removeLayer(existingZone.polygon);
            setActiveDangerZones(prev => prev.filter(zone => zone.id !== zoneData.id));
        } else {
            // Add the danger zone
            const color = zoneData.riskLevel === 'High' ? '#dc2626' : '#f59e0b';
            const fillColor = zoneData.riskLevel === 'High' ? '#fee2e2' : '#fef3c7';
            
            const polygon = L.polygon(zoneData.coordinates, {
                color: color,
                fillColor: fillColor,
                fillOpacity: 0.4,
                weight: 3
            }).addTo(mapRef.current);

            polygon.bindTooltip(`⚠️ ${zoneData.name}<br>Risk: ${zoneData.riskLevel}<br>${zoneData.description}`, {
                permanent: false,
                direction: "center"
            });

            setActiveDangerZones(prev => [...prev, {
                ...zoneData,
                polygon: polygon
            }]);
        }
    };

    // Effect to toggle hospital markers based on state
    useEffect(() => {
        if (mapRef.current) {
            hospitalMarkersRef.current.forEach(marker => {
                if (visibleHospitals) {
                    marker.addTo(mapRef.current);
                } else {
                    mapRef.current.removeLayer(marker);
                }
            });
        }
    }, [visibleHospitals]);

    // Effect to toggle pharmacy markers based on state
    useEffect(() => {
        if (mapRef.current) {
            pharmacyMarkersRef.current.forEach(marker => {
                if (visiblePharmacies) {
                    marker.addTo(mapRef.current);
                } else {
                    mapRef.current.removeLayer(marker);
                }
            });
        }
    }, [visiblePharmacies]);

    // Effect to show/hide danger zone triggers
    useEffect(() => {
        if (mapRef.current && triggerMarkersRef.current) {
            triggerMarkersRef.current.forEach(({ marker }) => {
                if (showDangerTriggers) {
                    marker.addTo(mapRef.current);
                } else {
                    if (mapRef.current.hasLayer(marker)) {
                        mapRef.current.removeLayer(marker);
                    }
                }
            });
        }
    }, [showDangerTriggers]);

    const handleGoToLocation = (lat, lon) => {
        if (mapRef.current) {
            mapRef.current.setView([lat, lon], 17);
        }
    };

    const handleGoToIGDTUW = () => {
        handleGoToLocation(igdtuwLocation.lat, igdtuwLocation.lon);
    };

    const handleDangerZoneToggle = () => {
        setShowDangerTriggers(!showDangerTriggers);
    };

    const clearAllDangerZones = () => {
        activeDangerZones.forEach(zone => {
            if (mapRef.current) {
                mapRef.current.removeLayer(zone.polygon);
            }
        });
        setActiveDangerZones([]);
    };

    const showAllDangerZones = () => {
        dangerZoneData.forEach(zoneData => {
            const existingZone = activeDangerZones.find(zone => zone.id === zoneData.id);
            if (!existingZone) {
                toggleDangerZone(zoneData);
            }
        });
    };

    return (
        <div className="emergency-container">
            <div className="emergency-sidebar">
                <h1 className="emergency-title">Emergency Locator</h1>
                <div className="button-container">
                    <button
                        onClick={() => setVisibleHospitals(prev => !prev)}
                        className={`emergency-button hospital-button ${!visibleHospitals ? 'inactive' : ''}`}
                    >
                        Hospitals
                    </button>
                    <button
                        onClick={() => setVisiblePharmacies(prev => !prev)}
                        className={`emergency-button pharmacy-button ${!visiblePharmacies ? 'inactive' : ''}`}
                    >
                        Pharmacies
                    </button>
                    <button 
                        onClick={handleGoToIGDTUW} 
                        className="emergency-button location-button"
                    >
                        My Location
                    </button>
                    <button 
                        onClick={handleDangerZoneToggle} 
                        className={`emergency-button danger-zone-button ${showDangerTriggers ? 'active' : ''}`}
                    >
                        {showDangerTriggers ? 'Hide Danger Points' : 'Show Danger Points'}
                    </button>
                </div>
                
                {showDangerTriggers && (
                    <div className="danger-zone-info">
                        <p className="danger-instructions">
                            ⚠️ Click on the warning icons on the map to reveal danger zones.
                            <br />Active zones: {activeDangerZones.length}/{dangerZoneData.length}
                        </p>
                        <div className="danger-controls">
                            <button 
                                onClick={showAllDangerZones}
                                className="show-all-zones-button"
                            >
                                Show All Zones
                            </button>
                            {activeDangerZones.length > 0 && (
                                <button 
                                    onClick={clearAllDangerZones}
                                    className="clear-zones-button"
                                >
                                    Clear All Zones
                                </button>
                            )}
                        </div>
                    </div>
                )}

                <div id="placesList" className="sidebar">
                    <h2 className="section-title">Hospitals</h2>
                    {hospitals.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleGoToLocation(item.lat, item.lon)}
                            className="place-item"
                        >
                            <div className="place-name">{item.name}</div>
                            <div className="place-time">{item.time} min</div>
                        </div>
                    ))}
                    <h2 className="section-title">Pharmacies</h2>
                    {pharmacies.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleGoToLocation(item.lat, item.lon)}
                            className="place-item"
                        >
                            <div className="place-name">{item.name}</div>
                            <div className="place-time">{item.time} min</div>
                        </div>
                    ))}
                    
                    {activeDangerZones.length > 0 && (
                        <>
                            <h2 className="section-title">Active Danger Zones</h2>
                            {activeDangerZones.map((zone, index) => (
                                <div 
                                    key={zone.id} 
                                    className={`danger-zone-item ${zone.riskLevel.toLowerCase()}-risk`}
                                    onClick={() => handleGoToLocation(zone.triggerPoint.lat, zone.triggerPoint.lon)}
                                >
                                    <div className="place-name">⚠️ {zone.name}</div>
                                    <div className="place-time">Risk: {zone.riskLevel}</div>
                                    <div className="zone-description">{zone.description}</div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
            <div id="map"></div>
        </div>
    );
};

export default EmergencyLocator;

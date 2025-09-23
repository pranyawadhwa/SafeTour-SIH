# SafeTour React Application

This is a React conversion of the SafeTour Tourist Safety & Assistance platform. The application provides various safety features for travelers including Digital Tourist ID, Geo-fencing alerts, Panic Button, AI anomaly detection, and more.

## Features Converted

- **Home Page**: Main landing page with hero section, features overview, guides section, and dashboard preview
- **Digital Tourist ID**: Registration form with real-time preview
- **Geo-Fencing**: Create geofences and monitor alerts
- **Panic Button**: Emergency alert system
- **AI Anomaly Detection**: Real-time anomaly monitoring and logs
- **Offline Emergency SMS**: Send emergency alerts without internet
- **FAQ**: Frequently asked questions with expandable sections

## Components Structure

```
src/
├── components/
│   ├── Header.js          # Navigation header with dropdown
│   └── Footer.js          # Footer component
├── pages/
│   ├── Home.js           # Main landing page
│   ├── DigitalId.js      # Digital ID registration
│   ├── GeoFencing.js     # Geofence management
│   ├── PanicButton.js    # Emergency panic button
│   ├── AIAnomaly.js      # Anomaly detection dashboard
│   ├── OfflineSMS.js     # Offline SMS feature
│   └── FAQ.js            # FAQ page with accordion
├── styles/
│   ├── global.css        # Global styles converted from CSS
│   └── digital-id.css    # Digital ID specific styles
├── App.js                # Main app component with routing
└── index.js              # React DOM entry point
```

## Installation and Setup

1. Navigate to the react-app directory:
   ```bash
   cd react-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Technologies Used

- **React 18.2.0**: Main framework
- **React Router DOM 6.3.0**: For routing between pages
- **CSS3**: Styling (converted from original CSS files)
- **HTML5**: Semantic markup

## Key Features Implemented

### Interactive Elements
- Real-time form preview in Digital ID registration
- Expandable FAQ sections
- Dropdown navigation menus
- Form validation and submission handling
- Dynamic state management for user interactions

### Responsive Design
- Mobile-first responsive layout
- Flexible grid systems
- Adaptive components for different screen sizes

### Accessibility
- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader friendly

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App (one-way operation)

## Original to React Conversion

All original HTML/CSS files have been successfully converted to React components:

- `index.html` → `Home.js` component
- `digital-id.html` → `DigitalId.js` component  
- `geo-fencing.html` → `GeoFencing.js` component
- `panic-button.html` → `PanicButton.js` component
- `ai-anomaly.html` → `AIAnomaly.js` component
- `offline-sms.html` → `OfflineSMS.js` component
- `faq.html` → `FAQ.js` component

The styling has been preserved and enhanced with React-specific implementations while maintaining the original design and functionality.

## Future Enhancements

- Add backend API integration
- Implement real map integration for geo-fencing
- Add user authentication
- Integrate with actual SMS services
- Add real-time data visualization for anomaly detection
- Implement multilingual support with i18n
- Add unit and integration tests

## Browser Support

This application supports all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
const express = require('express');
const path = require('path');
const cors = require('cors');
const { sendSMS } = require('./new.js');

const app = express();
app.use(cors()); 
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.post('/send-sos', async (req, res) => {
    console.log('Received SOS request:', req.body); // Debug log
    const { message } = req.body;
    
    if (!message) {
        console.error('No message provided');
        return res.status(400).json({ success: false, error: 'No message provided' });
    }

    try {
        const result = await sendSMS(message);
        console.log('SMS result:', result); // Debug log
        if (result) {
            res.json({ success: true });
        } else {
            res.status(500).json({ success: false, error: 'Failed to send SMS' });
        }
    } catch (error) {
        console.error('Error sending SOS:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
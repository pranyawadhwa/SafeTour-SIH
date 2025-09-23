require('dotenv').config();
const accountSid = process.env.Account_SID;
const authToken = process.env.Auth_Token;
const client = require('twilio')(accountSid, authToken);

const sendSMS = async (body) => {
    let msgOptions = {
        from: process.env.TWILIO_FROM_NUMBER,
        to: process.env.TWILIO_TO_NUMBER,
        body
    }

    try {
        const message = await client.messages.create(msgOptions);
        console.log(message);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports = { sendSMS };
const axios = require('axios');
const mailgun = require('mailgun-js');
const { FireStoreParser } = require('./firebase');

module.exports = async (req, res) => {
    const logError = (status, err) => {
        console.log(err);
        res.status(status || 500).send(err);
    };

    if (req.method !== 'POST') {
        logError(405, 'Method not allowed');
        return;
    }

    let { name, email, message, source } = req.body.contact;

    let body = {
        'fields': {
            'name': { 'stringValue': name },
            'email': { 'stringValue': email },
            'message': { 'stringValue': message },
            'source': { 'stringValue': source },
        }
    };

    if(!source) {
        delete body.fields['source'];
    }

    axios.post(process.env.FIREBASE_POST_CONTACT_URL, { ...body })
        .then((response) => {
            let message = FireStoreParser(response.data);

            sendMails(message);
            
            res.status(200).send();
        })
        .catch((error) => {
            logError(500, error);
        })
};

function sendMails(contact) {
    const emailService = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});
    
    let { name, email, message, source } = contact.fields;

    let notificationOptions = {
        from: 'Post Master <postmaster@mattseemon.in>',
        to: 'contact@mattseemon.in',
        subject: 'New contact request',
        template: 'contact-notification',
        'v:name': name,
        'v:email': email,
        'v:message': message,
        'v:source': source,
        'v:time': new Date(contact.createTime).toString()
    };
    
    let acknowledgementOptions = {
        from: 'Matt Seemon <contact@mattseemon.in>',
        to: email,
        subject: 'Thank you for contacting me',
        template: 'contact-acknowledgement',
        'v:name': name
    };    

    emailService.messages().send(notificationOptions)
        .then(function(result) {
            return emailService.messages().send(acknowledgementOptions);
        })
        .then(function(result) {
            return;
        })
        .catch((err) => {
            error(500, err.toString());
        });
}
const { json } = require('micro');
const mailgun = require('mailgun-js');

module.exports = async (req, res) => {
    const error = (status, err) => {
        console.log(err);
        res.status = status || 500;
        res.write(err);
        res.end();
    };
    if (req.method !== 'POST') {
        error(405, 'Method not allowed');
        return;
    }

    const body = await json(req);
    const emailService = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});
    
    const mailNotification = {
        from: 'Post Master <postmaster@mattseemon.in>',
        to: 'contact@mattseemon.in',
        subject: 'New contact request',
        template: 'contact-notification',
        'v:name': body.contact.Name,
        'v:email': body.contact.Email,
        'v:message': body.contact.Message,
        'v:source': body.contact.Source,
        'v:time': new Date(body.contact.Received).toString()
    };
    
    const mailAcknowledgement = {
        from: 'Matt Seemon <contact@mattseemon.in>',
        to: body.contact.Email,
        subject: 'Thank you for contacting me',
        template: 'contact-acknowledgement',
        'v:name': body.contact.Name
    };

    emailService.messages().send(mailNotification)
        .then(function(result) {
            return emailService.messages().send(mailAcknowledgement);
        })
        .then(function(result) {
            res.status = 200;
            res.end();
        })
        .catch((err) => {
            error(500, err.toString());
        });
    /*
    emailService.messages().send(emailOptions, (error, result) =>{
        if(error) {
            error(500, error.toString());
        } else {
            res.status = 200;
            res.end();
        }
    });*/
};
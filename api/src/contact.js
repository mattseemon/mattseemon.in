const { json } = require('micro');
const emailService = require('@sendgrid/mail');

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
    emailService.setApiKey(process.env.SEND_GRID_API_KEY);
    
    const emailOptions = {
        to: body.contact.Email,
        from: 'contact@mattseemon.in',
        templateId: 'd-106220c8fe4c42469c64da28ccd80417',
        dynamic_template_data: {
            name: body.contact.Name
        },
    };

    emailService.send(emailOptions, (error, result) =>{
        if(error) {
            error(500, error.toString());
        } else {
            res.status = 200;
            res.end();
        }
    });
};
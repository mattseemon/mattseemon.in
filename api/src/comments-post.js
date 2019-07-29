const axios = require('axios');
const format = require('string-format');

module.exports = async (req, res) => {
    const logError = (status, err) => {
        console.log(err);
        res.status(status || 500).send(err);
    };

    if (req.method !== 'POST') {
        logError(405, 'Method not allowed');
        return;
    }

    let slug = req.body.slug;
    let { name, email, website, message, replyingTo } = req.body.comment;
    let body = {
        'fields' : {
            'name': { 'stringValue' : name },
            'email': { 'stringValue' : email },
            'website': { 'stringValue' : website },
            'message': { 'stringValue' : message }
        }
    };

    if(!website) {
        delete body.fields['website'];
    }

    let url = format(process.env.FIREBASE_COMMENTS_URL, slug);
    if(replyingTo) {
        url = format(process.env.FIREBASE_COMMENT_REPLIES_URL, slug, replyingTo);
    }

    axios.post(url, { ...body })
        .then((response) => {
            res.status(200).send();
        })
        .catch((error) => {
            logError(500, error);
        })
};
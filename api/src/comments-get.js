const axios = require('axios');
const format = require('string-format');
const { FireStoreParser } = require('./firebase');

module.exports = async (req, res) => {
    const logError = (status, err) => {
        console.log(err);
        res.status(status || 500).send(err);
    };

    if(req.method !== 'GET') {
        logError(405, 'Method not allowed');
        return;
    }

    try {
        let slug = req.query.slug;
        let count = 0;

        let response = await axios.get(format(process.env.FIREBASE_COMMENTS_URL, slug));
        let comments = processResponse(response).sort((a, b) => (new Date(a.date)) - (new Date(b.date)));

        count += comments.length;

        for(let i in comments) {
            response = await axios.get(format(process.env.FIREBASE_COMMENT_REPLIES_URL, slug, comments[i].id));
            comments[i].replies = processResponse(response).sort((a, b) => (new Date(a.date)) - (new Date(b.date)));
            count += comments[i].replies.length;
        }
        
        res.status(200).send(JSON.stringify({ count, comments }));
    }
    catch(err) {
        logError(500, err);
    }
}

function processResponse(response) {
    let results = [];
    if(response.data.documents) {
        FireStoreParser(response.data).documents.map((document) => {
            let id = document.name.substring(document.name.lastIndexOf('/') + 1);
            let date = document.createTime;
            results.push({id, ...document.fields, date});
        })
    }
    
    return results;
}
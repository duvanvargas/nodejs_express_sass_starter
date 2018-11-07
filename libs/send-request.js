var request = require('request');

module.exports.request = (field, cb) => {
    request({
        method: 'POST',
        url: "https://so05.kerberusipbx.com:625/api/v0.1/callback",
        headers: {
            'authorization':'AAAA-SO',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ numero: field })
    }, (error, response, body) => {
        cb(error, response, body)
    });
};
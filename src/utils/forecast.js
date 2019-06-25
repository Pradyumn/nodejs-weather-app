const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/83c07027d4377a54e6dd5c3a7353a245/'+ latitude + ',' + longitude +'?units=si';
    request({ url, json: true}, (error, { body } = {}) => {
        if(error) {
            const error_msg = 'ERROR: unable to connect to ' + error.hostname;
            callback(error_msg, undefined);
        } else if(body.error) {
            const error_msg = 'ERROR: ' + body.error;
            callback(error_msg, undefined);
        } else {
            callback(undefined, {
                temp: body.currently.temperature,
                rainProb: body.currently.precipProbability,
                summary: body.currently.summary
            });
        }
    })
}

module.exports = forecast;
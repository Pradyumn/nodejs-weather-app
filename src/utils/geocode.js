const request = require('request');

const geocode = (address, callback) => {
    const token = 'pk.eyJ1IjoicHJhZHl1bW5zIiwiYSI6ImNqd3hmenZ0bzA3YjkzeW95bGN3ZXhvdWcifQ.O5_SnbcQWC_lZs7lXfcRKw';
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token${token}=&limit=1`;
    request({ url, json: true }, (error, { body } = {}) => {
        if(error) {
            const error_msg = 'ERROR: unable to connect to ' + error.hostname;
            callback(error_msg, undefined);
        } else if(body.message) {
            const error_msg = 'ERROR:  ' + body.message;
            callback(error_msg, undefined);
        } else if(body.features.length === 0) {
            const error_msg = 'ERROR:  couldn\'t find the location';
            callback(error_msg, undefined);
        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1]
            });
        }
    })
}

module.exports = geocode;
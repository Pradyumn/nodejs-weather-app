const express = require('express');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const router = express.Router();

router.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Pradyumn Singh'
    });
});

router.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Pradyumn Singh',
        date: '2019',
        emotion: 'Hroutery',
        action: 'help'
    });
});

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Pradyumn Singh',
        message: 'About what??'
    });
});

router.get('/weather', (req, res) => {
    if(!req.query.location && (!req.query.long || !req.query.lat)) {
        return res.send({
            error: 'location undefined'
        });
    }

    if(req.query.location) {
        const address = req.query.location;
        geocode(address, (error, {longitude, latitude, location} = {}) => {
            if(error) {
                return res.send({
                    error
                });
            }

            forecast(latitude, longitude, (error, {summary, temp, rainProb} = {}) => {
                if(error) {
                    return res.send({
                        error: 'cannot connect to forecast API'
                    });
                }

                res.send({
                    location,
                    summary,
                    temp,
                    rainProb,
                    longitude,
                    latitude
                });
            });
        });
    } else {
        const longitude = req.query.long;
        const latitude = req.query.lat;

        forecast(latitude, longitude, (error, {summary, temp, rainProb} = {}) => {
            if(error) {
                return res.send({
                    error: 'cannot connect to forecast API'
                });
            }

            res.send({
                summary,
                temp,
                rainProb
            });
        });
    }
    
});

// 404 handling
router.get('*', (req, res) => {
    res.render('404', {
        title: 'Error-404',
        name: 'Pradyumn Singh',
        message: 'Page not found'
    });
});

module.exports = router;
const path = require('path');

const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// define path for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../views/pages');
const partialsPath = path.join(__dirname, '../views/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Pradyumn Singh'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Pradyumn Singh',
        date: '2019',
        emotion: 'Happy',
        action: 'help'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Pradyumn Singh',
        message: 'About what??'
    });
});

app.get('/weather', (req, res) => {
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
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error-404',
        name: 'Pradyumn Singh',
        message: 'help article not found'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error-404',
        name: 'Pradyumn Singh',
        message: 'Page not found'
    });
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
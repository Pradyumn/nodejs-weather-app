const path = require('path');

const express = require('express');
const hbs = require('hbs');

const routes = require('./router/routes');

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

// setting up routes
app.unsubscribe(routes);

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// app.get('', (req, res) => {
//     res.send('<h1>Hello express!</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send('Help page')
// })

// app.get('/about', (req, res) => {
//     res.send('About')
// })

// !!! Define paths for express config !!!
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views'); // IMP.
const partialsPath = path.join(__dirname, '../templates/partials');

// !!! Setup handlebars engine and views location !!!
// handlebars is used as hbs for express, with key='view engine' & value='hbs'
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Now express is finding *index, *help, *about in public folder via name of the file.
// !!! Used only for static directory to serve. !!!
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Aaryan"
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Aaryan"
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        message: "How may I help you?",
        name: "Aaryan"
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Error: 404",
        message: "Help article not found.",
        name: "Aaryan"
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address.'
        })
    }

    geocode (req.query.address, (error, {latitude, longitude, location} = {}) => {
        // console.log ('Error: ' + error);
        // console.log ('Data: ' + data);
        if (error) {
            return res.send ({
                error                    // Or we could use error: error
            });
        }
    
        forecast (latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send ({
                    error                 // Or we could use error: error
                });
            }

            res.send ({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        });
    
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: "Error: 404",
        message: "Page not found.",
        name: "Aaryan"
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})




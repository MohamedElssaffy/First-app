const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utilites/geocode')
const forecast = require('./utilites/forecast')

const app = express()

// define path for express config
const puplicDirctor = path.join(__dirname, '../puplic')
const viewsPath = path.join(__dirname, '../Templetes/views')
const partialsPath = path.join(__dirname, '../Templetes/partials')

//set up static dirctor to srever
app.use(express.static(puplicDirctor))

// set up handlbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home Page',
        name: 'Mohamed'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mohamed'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpMessage: 'This is a dynamic message from hbs',
        name: 'Mohamed'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'You must add address location'
        })
    }
    geocode.geocode(address, (error, {latitude, longitude, location} = {}) => {

        if (error) {
            return res.send({ error })
        }

        forecast.forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                location,
                forecast: forecastData,
                address
            })
            
        })

    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Mohamed',
        errorMessage: 'Help article not found'
    })
})

app.get('/*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Mohamed',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('This is port 3000')
})
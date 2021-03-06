const path = require('path')
const express =  require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const splashImage = require('./utils/splashImage')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectorypath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')  //Handelbars setup code line
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectorypath))

// *********************  ROUTES  ****************************
// app.com
// app.com/help
// app.com/about
// app.com/weather

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'NODO'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'NODO'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'NODO'
    })
})

// RUta para la pagina image
app.get('/image', (req, res) => {
    res.render('splashImage', {
        title: 'Photo Fetching App',
        name: 'NODO'
    })
})


// Ruta API splashimage
app.get('/splash', (req, res) => {
    if(!req.query.subject) {
        return res.send({
            error: 'You must provide a subject to search an image....?subject=yourSearch...'
        })
    }
    splashImage(req.query.subject, (error, body = {}) => {
        if (error) {
            return res.send({ error})
        }
        res.send(body)
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address term...?address=yourSearch...'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=> {
        if (error) {
          return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, {summary, temperature, icon, moonPhase, windSpeed, temperatureMin, temperatureMax }) => {
          if (error) {
            return res.send({ error })
          }

            res.send({
                address: location,
                summary : summary,
                temperature : temperature,
                icon : icon,
                moonPhase : moonPhase,
                windSpeed : windSpeed,
                temperatureMin: temperatureMin,
                temperatureMax: temperatureMax
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
        errorMessage: 'Help article not found...'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        errorMessage: 'Page not found...'
    })
})


// *********************  SERVER  ****************************



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
const path = require('path')
const express =  require('express')
const hbs = require('hbs')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

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
        name: 'Pies Ligeros'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Pies Ligeros'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Pies Ligeros'
    })
})

app.get('/weather', (req, res) => {
    res.send(
        {
        location: 'Santiago',
        daily: "Posible llovizna el Viernes.",
        }
    )})

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

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
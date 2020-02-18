const path = require('path')
const express =  require('express')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

const publicDirectorypath = path.join(__dirname, '../public')

app.set('view engine', 'hbs')  //Handelbars setup code line
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
        helpText: 'Help Page',
        name: 'Pies Ligeros'
    })
})

// app.get('/help', (req, res) => {
//     res.send([
//         {
//         name: 'Sergio',
//         age: 27
//         }
//     ])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About Page...</h1>')
// })

app.get('/weather', (req, res) => {
    res.send(
        {
        location: 'Santiago',
        daily: "Posible llovizna el Viernes.",
        }
    )})

// *********************  SERVER  ****************************

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
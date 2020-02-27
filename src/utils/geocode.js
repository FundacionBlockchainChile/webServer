const request = require('request')

// GEOCODING API

// let placeToSearch = 'philadelphia';

// const geocodoURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + placeToSearch + '.json?access_token=pk.eyJ1Ijoic3JwaWVzbGlnZXJvcyIsImEiOiJjazY4MnRtazUwMHBuM25vMmZjYjd2czc3In0.c8ReF_cI1h6E-X3WcQn2rw&limit=1'

// const coord = request({ url: geocodoURL, json: true }, (error, response) => {
//     if (error) {
//         console.log(wrong('Unable to connet to Mapbox Geocoding service....'))
//     } else if (response.body.features.length === 0) {
//         console.log(wrong('Cannot find ' + info(placeToSearch) + ' place. Please try a new location...'))
//     } else {
//         const latitude = response.body.features[0].center[1]
//         const longitude = response.body.features[0].center[0]
//         console.log('Las coordenadas de ' + placeToSearch + ' son: ')
//         console.log('Coordenada latitud:  ' + latitude)
//         console.log('Coordenada longitud:  ' + longitude)
//         // const coordenadas = [latitude, longitude] 
//     }
// })

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic3JwaWVzbGlnZXJvcyIsImEiOiJjazY4MnRtazUwMHBuM25vMmZjYjd2czc3In0.c8ReF_cI1h6E-X3WcQn2rw&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connet to Mapbox Geocoding service....', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find ' + address + ' location. Please try a new location...', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode



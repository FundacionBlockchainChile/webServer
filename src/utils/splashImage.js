const request = require('request')

const splashImage = (subject, callback) => {
    const clientId = "84d9e236df85ddcdb1aa59f3d9ef1a96c301f87fafd664b222ee3637c406575d";
    const url = "https://api.unsplash.com/search/photos/?client_id="+clientId+"&query="+subject;

    // https://api.unsplash.com/search/photos/?client_id=84d9e236df85ddcdb1aa59f3d9ef1a96c301f87fafd664b222ee3637c406575d&query=bulldog


    request({ url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to SplashImage API service! Please check your connection...', undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            let images = {
                image0: body.results[0].urls.regular,
                image1: body.results[1].urls.regular
            }
            callback(undefined, images)
        }
    })
}

module.exports = splashImage
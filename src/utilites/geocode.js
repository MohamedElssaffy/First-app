const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibW9oYW1lZDEyMzQxMDAiLCJhIjoiY2trc3I2ejBhMGc4cDJxcDZ2and5dnJ0ZyJ9.12-cu5PZ2bQ-R2vV4pgQ3w&limit=1'
    // encodeURIComponent() is a function is make sure this is a string
    request({url, json: true}, (error, {body}) => {
        const {features} = body
        if (error) {
            callback('Unable to connect weather services!', undefined)
        } else if (!features) {
            callback('You dont written any thing', undefined)
        } else if (features.length === 0) {
            callback('Unable to get this location, you can try onther one', undefined)
        } else {
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0]
            })
        }
    })
}

module.exports = { 
    geocode
}

// const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/6546464556.json?access_token=pk.eyJ1IjoibW9oYW1lZDEyMzQxMDAiLCJhIjoiY2trc3I2ejBhMGc4cDJxcDZ2and5dnJ0ZyJ9.12-cu5PZ2bQ-R2vV4pgQ3w&limit=1'

// request({url: geocodeUrl, json: true}, (error, response) => {
//     if (error) {
//         console.log('Unable to connect location service!')
//     } else if (!response.body.features) {
//         console.log('You dont written anything')
//     } else if (response.body.features.length === 0) {
//         console.log('Unable to find your location!')
//     } else {
//         const longitude = response.body.features[0].center[0]
//         const latitude = response.body.features[0].center[1]
//         console.log(latitude, longitude)
//     }
// })
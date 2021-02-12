const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c55904ab653a74502d4ec542c9a3b5f3&query='+ latitude + ',' + longitude +'&units=f'
    request({url, json: true}, (error, {body}) => {
        const {current} = body
        if (error) {
            callback('Unable to connect weather services!', undefined)
        } else if (body.error) {
            callback('Unable to this location, you can try onther one', undefined)
        } else {
            callback(undefined, current.weather_descriptions + ' It is currently ' + current.temperature + ' degress out. It feels like ' + current.feelslike + ' degress out. Its humidity is ' + current.humidity)
        }
    })

}


module.exports = {
    forecast
}


// const url = 'http://api.weatherstack.com/current?access_key=c55904ab653a74502d4ec542c9a3b5f3&query=37.8267,-122.4233&units=f'
// request({url: url, json: true}, (error, response) => {
//     if (error) {
//         console.log('Unable to connect weather service!')
//     } else if (response.body.error) {
//         console.log('Unable to find your location!')
//     } else {
//         console.log(response.body.current.weather_descriptions[0] + ' It is currently ' + response.body.current.temperature + ' degress out. It feels like ' + response.body.current.feelslike + ' degress out')
//     } 
// })
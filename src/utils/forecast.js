const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d1a9bd8dd8c6cdb7888d2885c15b2e5d&query=' + latitude + ',' + longitude + '&units=f';
    request ({url, json : true}, (error, {body} = {}) => {

        const {current, error:bodyError} = body;
        // if (current) {
        //     const {weather_descriptions, temperature} = current;
        // }

        if (error) {
            callback ('Unable to connect to the service!', undefined);
        } else if (bodyError) {
            callback ('Unable to fetch the data. Please provide correct input.', undefined);
        } else {
            callback (undefined, current.weather_descriptions[0] + ". It is currently " + current.temperature + " degress out.");
        }
    });
}

// const forecast = (latitude, longitude, callback) => {
//     const url = 'http://api.weatherstack.com/current?access_key=d1a9bd8dd8c6cdb7888d2885c15b2e5d&query=' + latitude + ',' + longitude + '&units=f';
//     request ({url : url, json : true}, (error, response) => {
//         if (error) {
//             callback ('Unable to connect to the service!', undefined);
//         } else if (response.body.error) {
//             callback ('Unable to fetch the data. Please provide correct input.', undefined);
//         } else {
//             callback (undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degress out.");
//         }
//     });
// }

module.exports = forecast;
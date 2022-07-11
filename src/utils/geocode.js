const request = require("request");


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWFyMTkiLCJhIjoiY2w1MDBld28yM2RrYzNvcXpsOHF5ajc2MSJ9.aQPS-TEiyauX1xWLrFZGvQ&limit=1';
    
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
};

// request({url}, (error, {body}) => {

//     const {features} = body;
//     if (features) {
//         const {center, place_name} = features[0];
//     }

//     if (error) {
//         callback ('Unable to connect to the Geoservice!', undefined);
//     } else if (!features.length) {
//         callback ('Unable to find coordinates. Please try again.', undefined);
//     } else {
//         callback (undefined, {
//             latitude : center[1],
//             longitude : center[0],
//             location : place_name
//         })
//     }
// });

// const geocode = (address, callback) => {
//     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1';
    
//     request({url : url}, (error, response) => {
//         if (error) {
//             callback ('Unable to connect to the Geoservice!', undefined);
//         } else if (!response.body.features.length) {
//             callback ('Unable to find coordinates. Please try again.', undefined);
//         } else {
//             callback (undefined, {
//                 latitude : response.body.features[0].center[1],
//                 longitude : response.body.features[0].center[0],
//                 location : response.body.features[0].place_name
//             })
//         }
//     });
// };

module.exports = geocode;
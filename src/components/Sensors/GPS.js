import Geolocation from 'react-native-geolocation-service'
import Geocoder from 'react-native-geocoding'

Geocoder.init('');

Geocoder.from(41.89, 12.49)
.then(json => {
    var addressComponent = json;
    console.log(addressComponent);
})
.catch(error => {
    console.error(error)
})
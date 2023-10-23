import Geolocation from 'react-native-geolocation-service'
import Geocoder from 'react-native-geocoding'

Geocoder.init('');

export const getLongitude = async () => {
    Geolocation.getCurrentPosition((position)=>{
        console.log(position);
        Geocoder.from(position.coords.latitude,position.coords.longitude)
        .then((json)=>{
            console.log(json);
            var addressComponent = json.results[0].address_components;
            console.log(addressComponent);
        }).catch(error => console.error(error));
    },(error) => {
        console.log(error.code, error.message);
    },{
        enableHighAccuracy: false,
        timeout:20000,
        maximumAge: 100000
    });
    
}
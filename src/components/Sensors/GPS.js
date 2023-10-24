import Geolocation from 'react-native-geolocation-service'
import Geocoder from 'react-native-geocoding'


export const getLongitude = async () => {
    Geolocation.getCurrentPosition((position)=>{
        let api_url = `https://geocode.maps.co/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}`
        fetch(api_url,{
            method:'GET',
        }).then((response)=>{
            console.log(response.json());
        })
        // console.log(position);
        // Geocoder.from(position.coords.latitude,position.coords.longitude)
        // .then((json)=>{
        //     console.log(json);
        //     var addressComponent = json.results[0].address_components;
        //     console.log(addressComponent);
        // }).catch(error => console.error(error));
    },(error) => {
        console.log(error.code, error.message);
    },{
        enableHighAccuracy: false,
        timeout:20000,
        maximumAge: 100000
    });
    
}
import Geolocation from 'react-native-geolocation-service'

export const getLongitude = async () => {
    let address = Geolocation.getCurrentPosition(async (position)=>{
        let api_url = `https://geocode.maps.co/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}`
        let result = await fetch(api_url).then((response)=>{
            return response.text();
        }).then(response => {
            console.log(JSON.parse(response))
            return JSON.parse(response)
        }).catch((error)=>{
            console.log(error)
        })
        return result
    },(error) => {
        console.log(error.code, error.message);
    },{
        enableHighAccuracy: false,
        timeout:20000,
        maximumAge: 100000
    });
    return address;
}
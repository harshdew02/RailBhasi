export const getTrainSchedules = async (trainNo)=> {
    let apiUrl = `https://api.railwayapi.site/api/v1/schedules/${trainNo}`
    const myRes = await fetch(apiUrl, {
        method: "GET",
      })
        .then(response => {
          return response.text();
        })
        .then(response => {
          let res = JSON.parse(response);
          return res;
        })
        .catch(error => console.log("error", error));
    
      // console.log("outside fetch", myRes);
      return myRes;
}

export const getTrainBetweenStations = async(to, from) => {
    let apiUrl = `https://api.railwayapi.site/api/v1/trainsBtwStations?fromStation=${from}&toStation=${to}&allTrains=false`
    const myRes = await fetch(apiUrl, {
        method: "GET",
      })
        .then(response => {
          return response.text();
        })
        .then(response => {
          let res = JSON.parse(response);
          return res;
        })
        .catch(error => console.log("error", error));
    
      // console.log("outside fetch", myRes);
      return myRes;
}

export const getStationInfo = async(station) => {
    let apiUrl = `https://api.railwayapi.site/api/v1/stations/${station}`
    const myRes = await fetch(apiUrl, {
        method: "GET",
      })
        .then(response => {
          return response.text();
        })
        .then(response => {
          let res = JSON.parse(response);
          return res;
        })
        .catch(error => console.log("error", error));
    
      // console.log("outside fetch", myRes);
      return myRes;
}
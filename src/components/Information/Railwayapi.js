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
          res = res.data[0];
          return res;
        })
        .catch(error => console.log("error", error));
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
      return myRes;
}
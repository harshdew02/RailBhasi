export const getTrainBetweenStation = async(from, to, date) => {
    let apiUrl = `https://indian-railway-api.cyclic.app/trains/gettrainon?from=${from}&to=${to}&date=${date}`
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
    
      // console.log("outside fetch", myRes['data']);
      return myRes['data'];
}


//do not use
export const getLiveTrain = async(trainNo) => {
    let apiUrl = `https://indian-railway-api.cyclic.app/trains/getRoute?trainNo=${trainNo}`
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
    
      // console.log("outside fetch", myRes['data']);
      return myRes['data'];
}

//Currently not in use
export const getLiveStation = async (station) => {
  let apiUrl = `https://erail.in/station-live/${station}`;
  const myRes = await fetch(apiUrl, {
    method: "GET",
  })
    .then((response) => {
      return response.text();
    })
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error", error));
  console.log("outside fetch", myRes);

  return myRes;
};
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

  // console.log("outside fetch", myRes);
  return myRes;
};

// import fs from "react-native-fs";
// import Sound from "react-native-sound";
// Uncomment this for backend

export const getAudio = (inputString, Language, Voice) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let payload = JSON.stringify({
    controlConfig: {
      dataTracking: true,
    },
    input: [{ source: inputString }],

    config: {
      gender: Voice,
      language: {
        sourceLanguage: Language,
      },
    },
  });

  makeReq(payload, myHeaders);
};

async function makeReq(payload, myHeaders) {
  let apiURL = `https://demo-api.models.ai4bharat.org/inference/tts`;

  await fetch(apiURL, {
    method: "POST",
    body: payload,
    headers: myHeaders,
    redirect: "follow",
  })
    .then((response) => {
      return response.text();
    })
    .then((response) => {
      let apiResult = JSON.parse(response);
      let audioContent = apiResult["audio"][0]["audioContent"];
      const path = `${fs.CachesDirectoryPath}/output.wav`;

      fs.writeFile(path, audioContent, "base64").then(() => {
        const sound = new Sound(path, null, (error) => {
          if (error) {
            console.log('Failed to load the source');
          } else {
            sound.play((success) => {
              console.log("Message2: " + success);
              if (success) {
                console.log("new sound played");
              } else {
                console.log("no sound played");
              }
            });
            console.log("Message1: " + error);
          }
        });
      });
    })
    .catch((error) => console.log("error", error));
}

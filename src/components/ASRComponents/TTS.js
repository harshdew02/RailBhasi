// import fs from "react-native-fs";

// Uncomment this for backend

export const getAudio = async (inputString, Language, Voice) => {

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
  let apiURL = `https://demo-api.models.ai4bharat.org/inference/tts`;

  const mySound = await fetch(apiURL, {
    method: "POST",
    body: payload,
    headers: myHeaders,
    redirect: "follow",
  })
    .then((response) => {
      return response.text();
    })
    .then(async (response) => {
      let apiResult = JSON.parse(response);
      let audioContent = apiResult["audio"][0]["audioContent"];
      const path = `${fs.CachesDirectoryPath}/output.wav`;
      await fs.writeFile(path, audioContent, "base64");
    })
    .catch((error) => console.log("error TTS", error));
  return mySound;
};
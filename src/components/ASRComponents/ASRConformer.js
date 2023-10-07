import getTranslation from './NMTv2.js'

export const ASROutputO = (asrInput, slanguage) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var payload = JSON.stringify({
      config: {
        language: {
          sourceLanguage: slanguage,
        },
        transcriptionFormat: {
          value: "transcript",
        },
        audioFormat: "wav",
        samplingRate: 16000,
        postProcessors: null,
      },
      audio: [
        {
          audioContent: asrInput,
        },
      ],
      controlConfig: {
        dataTracking: true,
      },
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: payload,
      redirect: "follow",
    };

    fetch(
      "https://demo-api.models.ai4bharat.org/inference/asr/conformer",
      requestOptions
    )
      .then(response => response.text())
      .then(result => {
        var apiResponse = JSON.parse(result);
        console.log(apiResponse.output[0].source);
      })
      .catch(error => console.log("error", error));
  }
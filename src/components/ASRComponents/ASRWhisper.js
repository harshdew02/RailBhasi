import {getTranslation} from './NMTv2.js'

export const ASROutputE = (asrInput) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var payload = JSON.stringify({
      config: {
        language: {
          sourceLanguage: "en",
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
      "https://demo-api.models.ai4bharat.org/inference/asr/whisper",
      requestOptions
    )
      .then(response => response.text())
      .then(result => {
        var apiResponse = JSON.parse(result);
        let input = apiResponse.output[0].source;
        getTranslation(input, "en", "te");
      })
      .catch(error => console.log("error", error));
}
import {getTranslation} from './NMTv2.js'

export const ASROutputE = async (asrInput, sampleRate) => {
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
        samplingRate: Number.parseInt(sampleRate),
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

    const output =await fetch(
      "https://demo-api.models.ai4bharat.org/inference/asr/whisper",
      requestOptions
    )
      .then(response => response.text())
      .then(result => {
        var apiResponse = JSON.parse(result);
        // console.log(apiResponse.output[0].source)
        return apiResponse.output[0].source;
      })
      .catch(error => console.log("error", error));

      return output;
}
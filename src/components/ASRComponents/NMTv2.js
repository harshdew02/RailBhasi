export const getTranslation = async (inputString, sLang, tLang) => {
  if (sLang == tLang) return inputString;

  const languageScriptParser = input => {
    let lang = input;
    if (lang.includes("_")) {
      lang = lang.split("_")[0];
    }
    return lang;
  };

  const isLanguageScriptCodePresent = input => {
    let lang = input;
    if (lang.includes("_")) {
      return true;
    }
    return false;
  };

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let payload = JSON.stringify({
    controlConfig: {
      dataTracking: true,
    },
    input: [{ source: inputString }],

    config: {
      serviceId: "",
      language: {
        sourceLanguage: languageScriptParser(sLang),
        targetLanguage: languageScriptParser(tLang),

        targetScriptCode: isLanguageScriptCodePresent(tLang)
          ? tLang.split("_")[1]
          : null,

        sourceScriptCode: isLanguageScriptCodePresent(sLang)
          ? sLang.split("_")[1]
          : null,
      },
    },
  });

  let apiURL = `https://demo-api.models.ai4bharat.org/inference/translation/v2`;
  const myRes = await fetch(apiURL, {
    method: "POST",
    body: payload,
    headers: myHeaders,
  })
    .then(response => {
      return response.text();
    })
    .then(response => {
      let res = JSON.parse(response);
      // console.log(res);
      return res["output"][0]["target"];
    })
    .catch(error => console.log("error", error));

  // console.log("outside fetch", myRes);
  return myRes;
};

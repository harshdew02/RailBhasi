import {getAudio} from './TTS';
export const getTranslation = (inputString, sLang, tLang) => {

  const languageScriptParser = (input) => {
    let lang = input;
    if (lang.includes('_')) {
      lang = lang.split('_')[0];
    }
    return lang;
  };

  const isLanguageScriptCodePresent = (input) => {
    let lang = input;
    if (lang.includes('_')) {
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
    input: [{source: inputString}],

    config: {
      serviceId: '',
      language: {
        sourceLanguage: languageScriptParser(sLang),
        targetLanguage: languageScriptParser(tLang),

        targetScriptCode: isLanguageScriptCodePresent(
          tLang,
        )
          ? tLang.split('_')[1]
          : null,
      
        sourceScriptCode: isLanguageScriptCodePresent(
          sLang,
        )
          ? sLang.split('_')[1]
          : null,
      },
    },
  })

  makeReq(payload,myHeaders);
};

async function makeReq(payload,myHeaders){
let apiURL = `https://demo-api.models.ai4bharat.org/inference/translation/v2`;
  
    await fetch(apiURL, {
    method: 'POST',
    body: payload,
    headers: myHeaders,
    
  })
    .then((response)=> {
      return response.text();
    })
    .then((response)=> {
      let res = JSON.parse(response);
      let output = res["output"][0]["target"];
      console.log(output);
      getAudio(output,"te",'male');
    }).catch(error => console.log("error", error));
}
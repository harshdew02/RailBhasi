# RailBhasi

This is our main repo.

## Run Locally

Clone the project

```bash
  git clone https://github.com/harshdew02/RailBhasi.git
```

Go to the project directory

```bash
  cd RailBhasi
```

Install dependencies

```bash
  npm install
```

Start the server

```For CLI
  npm react-native run -android
```

```For Expo run
  npx expo start --offline
```

## Run using CLI uncomment below codes

- TTS.js

```js
import fs from "react-native-fs";
```

- Recorder.js

```js
import fs from "react-native-fs";
```

- destination.js

```js
import Sound from "react-native-sound";
import fs, { stat } from "react-native-fs";
```

- liveStation.js

```js
import { getLongitude } from "../Sensors/GPS";
```

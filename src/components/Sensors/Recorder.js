import { Component } from 'react';
// import AudioRecord from 'react-native-audio-record';
// import fs from 'react-native-fs';
// uncomment this for backend

export default class Recorder extends Component {

    state = {
      audioFile: '',
      recording: false,
      loaded: false,
      paused: true
    };
  
    async componentDidMount() {
      await this.checkPermission();
  
      const options = {
        sampleRate: 16000,
        channels: 1,
        bitsPerSample: 16,
        wavFile: 'command.wav'
      };
  
      AudioRecord.init(options);
    }
  
    start = () => {
      console.log('start record');
      this.setState({ audioFile: '', recording: true, loaded: false });
      AudioRecord.start();
    };
  
    stop = async () => {
      if (!this.state.recording) return;
      console.log('stop record');
      let audioFile = await AudioRecord.stop();
      let baseAudio = fs.readFile(audioFile,'base64');
      return baseAudio;
    };
  
    pause = () => {
      this.sound.pause();
      this.setState({ paused: true });
    };
  }
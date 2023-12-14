import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getTrainSchedules } from '../Information/Railwayapi'

export default function TTS() {
  const [selectedTrain, setselectedTrain] = useState(13029);
  const [selectedTrainSchedule, setselectedTrainSchedule] = useState(13029);
  useEffect(() => {
    const getData = async () => {
      // call getTrainSchedules
      const data = await getTrainSchedules(selectedTrain);
      const schedule = data.schedule;
      setselectedTrainSchedule();
    }
    getData();
  }, [selectedTrain])
  return (
    <View>
      <Text>delay</Text>
    </View>
  )
}
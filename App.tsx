/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useHealthConnect} from './src/_hooks/useHealthConnect';

const App: React.FC = () => {
  const {
    status,
    isInitialized,
    steps,
    initialize,
    requestPermissions,
    isAvailable,
    readSteps,
  } = useHealthConnect();

  React.useEffect(() => {
    const check = async () => {
      await initialize();
      await isAvailable();
    };

    check();
  }, [initialize, isAvailable]);

  const init = React.useCallback(async () => {
    await initialize();
  }, [initialize]);

  const checkStatus = React.useCallback(async () => {
    await isAvailable();
  }, [isAvailable]);

  // const getPerm = React.useCallback(async () => {
  //   await readSteps();
  // }, [readSteps]);

  console.log('Your Steps:', steps);
  return (
    <View>
      <Text>Hello App</Text>
      <Text>{`Status ${status} - ${isInitialized}`}</Text>
      <View style={{padding: 20}}>
        <TouchableOpacity onPress={init}>
          <Text>init</Text>
        </TouchableOpacity>
      </View>
      <View style={{padding: 20}}>
        <TouchableOpacity onPress={checkStatus}>
          <Text>Check</Text>
        </TouchableOpacity>
      </View>
      <View style={{padding: 20}}>
        <TouchableOpacity onPress={requestPermissions}>
          <Text>Perm?</Text>
        </TouchableOpacity>
      </View>
      <View style={{padding: 20}}>
        <TouchableOpacity onPress={readSteps}>
          <Text>GetSteps?</Text>
        </TouchableOpacity>
      </View>
      <View>
        {steps?.records?.map(s => {
          return <Text>{`Steps: ${s.count} on ${s.startTime}`}</Text>;
        })}
      </View>
    </View>
  );
};

export default App;

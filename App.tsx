import 'react-native-gesture-handler';
import './src/_lib/_translation/i18N';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStart from './src/_views/AppStart';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <AppStart />
    </NavigationContainer>
  );
};

export default App;

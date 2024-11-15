import React from 'react';
import {useAuthContext} from '../_hooks/useAppContext';
import AuthStack from '../_lib/_stacks/AuthStack';
import {Text, View} from 'react-native';

const AppStart: React.FC = () => {
  const {tokenModel} = useAuthContext();

  console.log('token', tokenModel);
  return tokenModel == null || !tokenModel?.token?.length ? (
    <AuthStack />
  ) : (
    <View>
      <Text>TEst</Text>
    </View>
  );
};

export default AppStart;

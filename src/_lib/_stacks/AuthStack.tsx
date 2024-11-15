import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginView from '../../_views/_Auth/LoginView';

const AuthenticationStack = createStackNavigator();

const AuthStack: React.FC = () => {
  return (
    <AuthenticationStack.Navigator initialRouteName="login">
      <AuthenticationStack.Screen
        name="login"
        component={LoginView}
        options={{headerShown: false}}
      />
    </AuthenticationStack.Navigator>
  );
};

export default AuthStack;

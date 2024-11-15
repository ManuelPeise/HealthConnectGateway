import React from 'react';
import {AuthContext} from '../_lib/context';

export const useAuthContext = () => {
  return React.useContext(AuthContext);
};

export const useAppContext = () => {
  return {
    authContext: useAuthContext,
  };
};

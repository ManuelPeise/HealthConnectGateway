import React from 'react';
import {AuthContextModel} from './_types/_auth/AuthContextTypes';

export const AuthContext = React.createContext<AuthContextModel>(
  {} as AuthContextModel,
);

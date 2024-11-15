import React from 'react';
import {PrivateAxiosClient} from '../_lib/_Api/PrivateAxiosClient';
import {useAuthContext} from './useAppContext';

export const useAxiosPrivate = () => {
  const {tokenModel, setToken} = useAuthContext();

  const refreshToken = React.useCallback(async (): Promise<string> => {
    return '';
  }, []);

  React.useEffect(() => {
    const requestIntercept = PrivateAxiosClient.interceptors.request.use(
      config => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${tokenModel?.token}`;
        }
        return config;
      },
      error => Promise.reject(error),
    );

    const responseIntercept = PrivateAxiosClient.interceptors.response.use(
      response => response,
      async error => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          try {
            const newAccessToken: string = await refreshToken();
            setToken({token: newAccessToken});
            prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return prevRequest;
          } catch (err) {
            console.error('Token refresh failed:', err);
          }
        }
        return Promise.reject(error);
      },
    );

    return () => {
      PrivateAxiosClient.interceptors.request.eject(requestIntercept);
      PrivateAxiosClient.interceptors.response.eject(responseIntercept);
    };
  }, [tokenModel, setToken, refreshToken]);

  return {client: PrivateAxiosClient};
};

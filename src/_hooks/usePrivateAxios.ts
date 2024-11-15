import React from 'react';
import {PrivateAxiosClient} from '../_lib/_Api/PrivateAxiosClient';
import {useAuthContext} from './useAppContext';
import {IApiResponse} from '../_lib/_interfaces/IApiResponse';

type RefreshTokenModel = {
  token: string;
};

const refreshTokenUrl = 'Authentication/RefreshToken';

export const useAxiosPrivate = () => {
  const {tokenModel, setToken} = useAuthContext();

  const refreshToken = React.useCallback(async (): Promise<string> => {
    const model: RefreshTokenModel = {token: tokenModel?.token ?? ''};
    let token = '';

    await PrivateAxiosClient.post(refreshTokenUrl, model).then(async res => {
      if (res.status === 200) {
        const responseData: IApiResponse<string> = res.data;

        token = responseData.data;
      }
    });

    return token;
  }, [tokenModel]);

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

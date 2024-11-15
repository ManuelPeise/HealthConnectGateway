import React, {PropsWithChildren} from 'react';
import {AuthContext} from '../../_lib/context';
import {
  AuthContextModel,
  LoginData,
  TokenStorageModel,
} from '../../_lib/_types/_auth/AuthContextTypes';
import {AsyncStorageKeys, useAsyncStorage} from '../../_hooks/useAsyncStorage';
import {PublicAxiosClient} from '../../_lib/_Api/PublicAxiosClient';
import {IApiResponse} from '../../_lib/_interfaces/IApiResponse';

const loginUrl = 'Authentication/UserLogin';

const AuthenticationContext: React.FC<PropsWithChildren> = props => {
  const {children} = props;
  const [error, setError] = React.useState<string | null>(null);

  const [tokenModel, setTokenModel] = React.useState<TokenStorageModel | null>(
    null,
  );
  const {loadData, storeData, deleteItem} = useAsyncStorage<TokenStorageModel>(
    AsyncStorageKeys.Token,
  );

  React.useEffect(() => {
    const onLoad = async () => {
      await loadData(AsyncStorageKeys.Token);
    };

    onLoad();
  });

  const onLogin = React.useCallback(
    async (model: LoginData) => {
      PublicAxiosClient.post(loginUrl, model).then(async res => {
        if (res.status === 200) {
          const responseData: IApiResponse<string> = res.data;

          if (responseData.success) {
            setTokenModel({token: responseData.data});
            await storeData(AsyncStorageKeys.Token, {token: responseData.data});
          }
        } else {
          setError('Login error');
        }
      });
    },
    [storeData],
  );

  const onLogout = React.useCallback(async () => {
    deleteItem(AsyncStorageKeys.Token);
    setTokenModel(null);
  }, [deleteItem]);

  const setToken = React.useCallback((model: TokenStorageModel) => {
    setToken(model);
  }, []);

  const value = React.useMemo((): AuthContextModel => {
    return {
      onLogin,
      onLogout,
      setToken,
      tokenModel,
      authError: error,
    };
  }, [tokenModel, error, onLogin, onLogout, setToken]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthenticationContext;

import React from 'react';
import {useTranslation} from 'react-i18next';
import {AsyncStorageKeys, useAsyncStorage} from './useAsyncStorage';
import {IAppLanguage} from '../_lib/_interfaces/IAppLanguage';

export const useI18N = () => {
  const {t, i18n} = useTranslation();

  const {item, storeData, loadData} = useAsyncStorage<IAppLanguage>(
    AsyncStorageKeys.Language,
  );

  const getResource = React.useCallback(
    (key: string) => {
      return t(key.replace('.', ':'));
    },
    [t],
  );

  const changeLanguage = React.useCallback(
    async (lng: 'en' | 'de') => {
      i18n.changeLanguage(lng);
      await storeData(AsyncStorageKeys.Language, {lng: lng});
    },
    [i18n, storeData],
  );

  React.useEffect(() => {
    const onLoad = async () => {
      await loadData(AsyncStorageKeys.Language);

      if (item != null && item?.lng) {
        changeLanguage(item.lng);
      } else {
        changeLanguage('en');
      }
    };

    onLoad();
  }, [item, loadData, changeLanguage]);

  return {
    getResource,
    changeLanguage,
  };
};

import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export enum AsyncStorageKeys {
  Language = 'lng',
  Token = 'token',
}

export const useAsyncStorage = <T>(key: AsyncStorageKeys) => {
  const [model, setModel] = React.useState<T | null>(null);

  const loadData = React.useCallback(async (itemKey: AsyncStorageKeys) => {
    const json = await AsyncStorage.getItem(itemKey);

    if (json != null && json?.length) {
      const data: T = JSON.parse(json);
      setModel(data);
    }
  }, []);

  const storeData = React.useCallback(
    async (itemKey: AsyncStorageKeys, data: T) => {
      try {
        await AsyncStorage.setItem(itemKey, JSON.stringify(data));
      } catch (e: any) {
        throw new Error(e.message);
      }
    },
    [],
  );

  const deleteItem = React.useCallback((itemKey: AsyncStorageKeys) => {
    AsyncStorage.removeItem(itemKey);
    setModel(null);
  }, []);

  React.useEffect(() => {
    const onLoad = async () => {
      await loadData(key);
    };

    onLoad();
  }, [key, loadData]);

  return {
    item: model,
    storeData,
    loadData,
    deleteItem,
  };
};

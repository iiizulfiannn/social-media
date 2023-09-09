import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

export const setStorage = (key: string, value: any) =>
  storage.set(key, JSON.stringify(value));

export const getStorage = <T>(key: string) => {
  const data = storage.getString(key);
  if (data) {
    return JSON.parse(data) as T;
  } else {
    return null;
  }
};

export const deleteStorage = (key: string) => storage.delete(key);

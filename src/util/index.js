import { Platform } from 'react-native';

export const os = Platform.OS;
export const isIos = 'ios';
export const isBrowser = os == 'web';
export const isAndroid = os == 'android';
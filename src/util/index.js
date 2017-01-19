import { Platform } from 'react-native';
import { connect as reduxConnect } from 'react-redux';

export const os = Platform.OS;
export const isIos = 'ios';
export const isBrowser = os == 'web';
export const isAndroid = os == 'android';

export const connect = reduxConnect;
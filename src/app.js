import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import { isIos, isAndroid, isBrowser } from './util';
import Routes from './appRoutes';

export default function () {
	return <Provider store={store}>
		<Routes/>
	</Provider>
}

if (isIos) {
	StatusBar.setBarStyle('light-content', true);
} else if (isAndroid) {
	StatusBar.setBackgroundColor('transparent');
	StatusBar.setTranslucent(true);
}
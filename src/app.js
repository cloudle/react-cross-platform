import React, { Component } from 'react';
import { NavigationExperimental } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import Routes from './routing';

export default function () {
	return <Provider store={store}>
		<Routes/>
	</Provider>
}
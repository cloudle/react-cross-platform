import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import Routes from './appRoutes';

export default function () {
	return <Provider store={store}>
		<Routes/>
	</Provider>
}
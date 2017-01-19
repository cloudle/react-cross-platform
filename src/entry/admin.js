import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import Routes from './adminRoutes';

export default function () {
	return <Provider store={store}>
		<Routes/>
	</Provider>
}
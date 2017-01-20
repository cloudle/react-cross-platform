import 'babel-polyfill';
import React, { Component } from 'react';
import { AppRegistry, View, Text, AsyncStorage } from 'react-native';
import wings from './src/admin';

AppRegistry.registerComponent('wings', () => wings);
AppRegistry.runApplication('wings', {
	rootTag: document.getElementById('root')
});
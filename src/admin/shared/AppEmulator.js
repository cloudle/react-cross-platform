import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import App from 'app';

export default class AppEmulator extends Component {
  render () {
    return <View style={{width: 357, height: 667, alignItems: 'center'}}>
			<App/>
    </View>
  }
}

const styles = StyleSheet.create({

});
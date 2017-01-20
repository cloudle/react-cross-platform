import React, { Component } from 'react';
import { View, Text } from 'react-native';


// @connect(({app}) => {
// 	return {
// 		counter: app.get('counter')
// 	}
// })

export default class NavigationPane extends Component {
	render () {
		return <View>
			<Text>Hello {this.props.counter}</Text>
		</View>
	}
}
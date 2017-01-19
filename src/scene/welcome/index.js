import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

@connect(({app}) => {
	return {
		counter: app.get('counter'),
	}
})

export default class Welcome extends Component {
	increaseCounter () {
		this.props.dispatch({
			type: Actions.IncreaseCounter,
			volume: 1,
		});
	}

	render () {
		return <ScrollView>
			<Text onPress={this.increaseCounter.bind(this)}>
				Welcome ({this.props.counter}) !!!
			</Text>
		</ScrollView>
	}
}

const styles = StyleSheet.create({

});
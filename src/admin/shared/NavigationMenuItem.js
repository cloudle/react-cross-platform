import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { connect } from 'utils';
import * as Actions from 'store/actions';

@connect(({route}) => {
	return {
		location: route.location || {},
	}
})

export default class NavigationMenuItem extends Component {
  render () {
  	const textStyle = this.props.location.pathname == this.props.route ?
		  styles.activeTitle : styles.title;

    return <View style={styles.container}>
      <Text
	      onPress={this::navigate}
	      style={textStyle}>
	      {this.props.title}
      </Text>
    </View>
  }
}

function navigate () {
	this.props.dispatch({
		type: Actions.BrowserRouterNavigate,
		location: { pathname: this.props.route },
		action: 'PUSH',
	});
}

const titleTextBase = {
	lineHeight: 50,
	fontSize: 13, fontWeight: '300',
};

const styles = StyleSheet.create({
	container: {
		padding: 5,
		paddingLeft: 15, paddingRight: 15,
	},
	title: {
		...titleTextBase,
		color: '#757b8c',
	},
	activeTitle: {
		...titleTextBase,
		color: '#acb1be'
	}
});
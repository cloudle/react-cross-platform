import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { connect } from 'utils';
import * as Actions from 'store/actions';
import { ResponsibleTouchArea } from 'components';

@connect(({route}) => {
	return {
		location: route.location || {},
	}
})

export default class NavigationMenuItem extends Component {
  render () {
  	const textStyle = this.props.location.pathname == this.props.route ?
		  styles.activeTitle : styles.title;

    return <ResponsibleTouchArea
	    onPress={this::navigate}
      innerStyle={styles.container}>
      <Text
	      style={textStyle}>
	      {this.props.title}
      </Text>
    </ResponsibleTouchArea>
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
	fontSize: 13,
};

const styles = StyleSheet.create({
	container: {
		padding: 5,
		paddingLeft: 15, paddingRight: 15,
		minWidth: 80,
		alignItems: 'center',
	},
	title: {
		...titleTextBase,
		color: '#757b8c',
	},
	activeTitle: {
		...titleTextBase,
		color: '#acb1be',
	}
});
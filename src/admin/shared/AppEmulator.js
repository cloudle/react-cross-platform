import React, { Component } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';

import App from 'app';
import { moment, instantInterval } from 'utils';
import Icon from 'react-native-vector-icons/Ionicons';

export default class AppEmulator extends Component {
	constructor (props) {
		super(props);
		this.state = { now: '' };
	}

	componentWillMount () {
		this.getTimeInterval = instantInterval(this::this.tick, 60000);
	}

	tick () {
		this.setState({now: moment().format('H:MM A')})
	}

  render () {
    return <View style={styles.wrapper}>
	      <View style={styles.appContainer}>
		      <App/>
		      {this.renderLeftStatus()}
		      {this.renderRightStatus()}
		      {this.renderTitleStatus()}
	      </View>
    </View>
  }

  renderLeftStatus () {
	  return <View style={styles.statusBarContainer}>
		  <Icon style={styles.statusBarIcon} size={20} name="ios-more"/>
		  <Icon style={styles.statusBarIcon} name="ios-wifi"/>
		  <Icon style={styles.statusBarIcon} size={10} name="ios-lock"/>
	  </View>
  }

  renderRightStatus () {
	  return <View style={[styles.statusBarContainer, {justifyContent: 'flex-end'}]}>
		  <Icon style={styles.statusBarIcon} size={12} name="ios-alarm-outline"/>
		  <Icon style={[styles.statusBarIcon, {transform: [{scaleX: 1.3}]}]} size={18} name="ios-battery-full"/>
	  </View>
  }

  renderTitleStatus () {
		return <View style={styles.statusBarContainer}>
				<Text style={styles.statusBarTitle}>{this.state.now}</Text>
		</View>
  }
}

const styles = StyleSheet.create({
	wrapper: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#333',
		flex: 1,
		flexDirection: 'row',
	},
	appContainer: {
		width: 320, height: 568, //Iphone 5s
		overflow: 'hidden',
		margin: 10,
		borderRadius: 3,
	},
	statusBarContainer: {
		width: 320, height: 24,
		position: 'absolute', top: 0, left: 0,
		flexDirection: 'row',
		paddingLeft: 5, paddingRight: 5,
		flex: 1,
	},
	statusBarTitle: {
		flex: 1, lineHeight: 24,
		color: 'white',
		fontSize: 10,
		fontWeight: '400',
		fontFamily: 'Helvetica',
		letterSpacing: 0.5,
		textAlign: 'center',
	},
	statusBarIcon: {
		color: 'white',
		lineHeight: 24,
		marginLeft: 5, marginRight: 5,
	}
});
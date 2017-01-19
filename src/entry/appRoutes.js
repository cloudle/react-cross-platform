import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import { connect } from 'react-redux';
import { colors } from '../util';
import * as Actions from '../store/actions';
import * as appActions from '../store/action/app';
import * as routerActions from '../store/action/nativeRouter';
import { NavigationExperimental } from '../components';

import NavigationHeader from '../components/NavigationHeader';
import Welcome from '../scene/welcome';
import Login from '../scene/login';

@connect(({nativeRoute}) => {
	return {
		nativeRoute,
	}
})

export default class NativeRoutes extends Component {
	render () {
		return <NavigationExperimental.CardStack
			navigationState={this.props.nativeRoute}
			renderScene={this::renderScene}
			renderHeader={this::renderHeader}
			gestureResponseDistance={50}
			onNavigateBack={() => routerActions.pop()}/>
	}

	navigate (action, route) {
		this.props.dispatch({
			type: action,	route: route,
		});
	};
}

function renderScene (props) {
	switch(props.scene.route.key) {
		case 'Home':
			return <Home navigate={this::this.navigate} route={props.scene.route} />;
		case 'About':
			return <About navigate={this::this.navigate} route={props.scene.route} />;
	}
}

function renderHeader (sceneProps) {
 	return <NavigationHeader {...sceneProps} />
}

const Home = ({ navigate, route }) => {
	return (
		<View style={styles.container}>
			<Text onPress={() => appActions.increaseCounter()}>Hello from Home! {route.pattern}</Text>
			<Text onPress={() => navigate(Actions.NativeRouterPush, { key: 'About', pattern: '/about' })}>Go To About</Text>
		</View>
	)
};

const About = ({ navigate, route }) => (
	<View style={styles.container}>
		<Text>Hello from About!! {route.pattern}</Text>
		<Text onPress={() => navigate(Actions.NativeRouterPop)}>Back</Text>
	</View>
);

const styles = {
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
	},
};
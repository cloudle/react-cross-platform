import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, AsyncStorage } from 'react-native';

import { connect } from 'react-redux';
import { colors } from 'utils';
import * as Actions from 'store/actions';
import * as appActions from 'store/action/app';
import * as routerActions from 'store/action/nativeRouter';
import { NavigationExperimental } from 'components';

import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi, Kohana, Makiko } from 'react-native-textinput-effects';
import Drawer from 'react-native-drawer';
import NavigationHeader from 'shared/NavigationHeader';
import Welcome from 'scene/welcome';
import Login from 'scene/login';

@connect(({nativeRoute}) => {
	return {
		nativeRoute,
	}
})

export default class NativeRoutes extends Component {
	async componentWillMount () {
		await AsyncStorage.getItem("sysConfig");
	}

	render () {
		return <Drawer
			side="right"
			negotiatePan={true}
			panOpenMask={0.2}
			tapToClose={true}
			openDrawerOffset={0.2}
			content={<Menu/>}
			tweenHandler={Drawer.tweenPresets.parallax}>

			<NavigationExperimental.CardStack
				style={styles.navigatorStyle}
				navigationState={this.props.nativeRoute}
				renderScene={this::renderScene}
				renderHeader={this::renderHeader}
				gestureResponseDistance={50}
				onNavigateBack={() => routerActions.pop()}/>
		</Drawer>
	}

	navigate (action, route) {
		this.props.dispatch({
			type: action,	route: route,
		});
	};
}

function Menu () {
	return <View style={{backgroundColor: "#fefefe", flex: 1}}>
		<Text>Hello!!</Text>
	</View>
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
			<Text onPress={() => appActions.increaseCounter()}>Hello from Home!! {route.pattern}</Text>
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

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
	},
	navigatorStyle: {

	}
});
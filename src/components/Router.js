import React, { Component } from 'react';
import { View, Text } from 'react-native';
import NavigationCardStack from './universal/NavigationCardStack';

class Navigator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			navState: reducer()
		}
	}

	navigate (action, route) {
		const navState = reducer(this.state.navState, action, route);
		this.setState({
			navState
		})
	};

	render () {
		return <NavigationCardStack
			navigationState={this.state.navState}
			renderScene={this::this.renderScene}/>
	}

	renderScene (props) {
		switch(props.scene.route.key) {
			case 'Home':
				return <Home navigate={this::this.navigate} route={props.scene.route} />;
			case 'About':
				return <About navigate={this::this.navigate} route={props.scene.route} />;
		}
	}
}

export default Navigator;

const Home = ({ navigate, route }) => {
	return (
		<View style={styles.container}>
			<Text>Hello from Home {route.pattern}</Text>
			<Text onPress={() => navigate('push', { key: 'About', pattern: '/about' })}>Go To About</Text>
		</View>
	)
};

const About = ({ navigate, route }) => (
	<View style={styles.container}>
		<Text>Hello from About!! {route.pattern}</Text>
		<Text onPress={() => navigate('pop')}>Back</Text>
	</View>
);

function reducer(state: object, action: string, route: object): object {
	if (!state) {
		return {
			index: 0,
			routes: [{key: 'Home', pattern: ''}],
		};
	}
	switch (action) {
		case 'push': {
			const routes = state.routes.slice();
			routes.push(route);
			return {
				...state,
				index: routes.length -1,
				routes,
			}
		}
		case 'pop': {
			if (state.index <= 0) return state;
			const routes = state.routes.slice(0, -1);
			return {
				...state,
				index: routes.length - 1,
				routes,
			}
		}
		default:
			return state
	}
}

const styles = {
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
	},
};
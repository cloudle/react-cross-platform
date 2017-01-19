import React, { Component } from 'react';
import { View, Text, NavigationExperimental } from 'react-native';

const {
	CardStack: NavigationCardStack, // 2
	Header: NavigationHeader,
} = NavigationExperimental;

const Home = ({ navigate }) => {
	return (
		<View style={styles.container}>
			<Text>Hello from Home</Text>
			<Text onPress={() => navigate('push', { key: 'About' })}>Go To About</Text>
		</View>
	)
};

const About = ({ navigate }) => (
	<View style={styles.container}>
		<Text>Hello from About</Text>
		<Text onPress={() => navigate('pop')}>Back</Text>
	</View>
);

function reducer(state: object, action: string, route: object): object {
	if (!state) {
		return {
			index: 0,
			routes: [{key: 'Home'}],
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
class NavigationCardStackExample extends Component {
	state = {navState: reducer()}; // 5

	_navigate = (action, route) => {
		const navState = reducer(this.state.navState, action, route);
		this.setState({
			navState
		})
	};

	_renderScene = (props) => {
		switch(props.scene.route.key) {
			case 'Home':
				return <Home navigate={this._navigate} />;
			case 'About':
				return <About navigate={this._navigate} />;
		}
	};

	_renderHeader = (sceneProps) => {
		return (
			<Header
				navigate={this._navigate}
				{...sceneProps}
			/>
		)
	};

	render() {
		const {navState} = this.state;
		return (
			<NavigationCardStack // 7
				navigationState={navState}
				renderHeader={this._renderHeader}
				renderScene={this._renderScene}
			/>
		)
	}
}

class Header extends Component {
	_back = () => {
		this.props.navigate('pop');
	};

	_renderTitleComponent = (props) => {
		return (
			<NavigationHeader.Title>
				{props.scene.route.key}
			</NavigationHeader.Title>
		);
	};

	render() {
		return (
			<NavigationHeader
				{...this.props}
				renderTitleComponent={this._renderTitleComponent}
				onNavigateBack={this._back}
			/>
		);
	}
}

const styles = {
	container: {
		// justifyContent: 'center',
		alignItems: 'center',
		flex: 1
	},
};

export default NavigationCardStackExample;
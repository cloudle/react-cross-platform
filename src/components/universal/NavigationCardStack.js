import React, { Component } from 'react';
import { View, Text, NavigationExperimental, StyleSheet } from 'react-native';
import { isBrowser } from '../../util';

class CardStack extends Component {
	render () {
		return <View style={styles.container}>
			{this.renderHeader()}
			{this.renderScene()}
		</View>
	}

	renderHeader () {
		if (this.props.renderHeader) {
			return this.props.renderHeader(this.props);
		}
	}

	renderScene () {
		let { index, routes } = this.props.navigationState,
			scene = { route: routes[index]},
			props = { scene, ...this.props};

		return this.props.renderScene(props);
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
	},
});

const navigationRoute = React.PropTypes.shape({
	key: React.PropTypes.string.isRequired,
	path: React.PropTypes.string,
});

CardStack.propTypes = {
	navigationState: React.PropTypes.shape({
		index: React.PropTypes.number.isRequired,
		routes: React.PropTypes.arrayOf(navigationRoute),
	}),
	renderScene: React.PropTypes.func.isRequired,
	renderHeader: React.PropTypes.func,
	onNavigateBack: React.PropTypes.func,
	style: React.PropTypes.any,
};

export default isBrowser ?
	CardStack : NavigationExperimental.CardStack;
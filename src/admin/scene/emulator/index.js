import React, { Component } from 'react';
import { Animated, Image, View, Text, StyleSheet } from 'react-native';

import { connect } from 'utils';
import { adminStyles } from 'admin/utils';
import { scene } from 'admin/decorators';
import AppEmulator from 'admin/shared/AppEmulator';

@connect(({app}) => {
	return {
		counter: app.get('counter'),
	}
})
@scene({enterSpeed: 800, delay: 200})
export default class EmulatorScene extends Component {
	constructor (props) {
	  super(props);
	  this.state = {
			spaceTop: 0,
		  spaceWidth: 0,
		  spaceHeight: 0,
	  }
	}

	onSceneRootLayout (e) {
		let { x, y, width, height } = e.nativeEvent.layout;
		this.setState({spaceTop: y, spaceHeight: height});
	}

	onSceneContentLayout (e) {
		let { x, y, width, height } = e.nativeEvent.layout;
		this.setState({spaceWidth: x});
	}

	render () {
		let opacity = this.state.enterAnimation.interpolate({
			inputRange: [0, 0.5, 1], outputRange: [0.4, 1.2, 1]
		}), translateY = this.state.enterAnimation.interpolate({
			inputRange: [0, 0.3, 0.6, 1], outputRange: [200, 50, -20, 0]
		}), emulatorStyles = {
			opacity,
			transform: [{translateY}],
		};

		return <View
			onLayout={this::this.onSceneRootLayout}
			style={[adminStyles.container, styles.container]}>
			<View style={{
				position: 'fixed',
				top: this.state.spaceTop,
				width: this.state.spaceWidth,
				height: this.state.spaceHeight,
				left: 0,
				backgroundColor: '#fbfbfb',
			}}/>
			<View
				onLayout={this::this.onSceneContentLayout}
				style={[adminStyles.contentContainer, styles.contentContainer]}>
				<View style={styles.inspectorArea}>
					<Text>inspector {this.props.counter}!!!!</Text>
				</View>
				<View style={styles.emulatorArea}>
					<Animated.View style={emulatorStyles}>
						<AppEmulator/>
					</Animated.View>
				</View>
			</View>
		</View>
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#333',
	},
	contentContainer: {
		flexDirection: 'row',
		flex: 1,
	},
	inspectorArea: {
		flex: 1, padding: 5,
		backgroundColor: 'white',
	},
	emulatorArea: {

	}
});
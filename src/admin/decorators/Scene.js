import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';

export default function ({
		enterSpeed = 500,
		delay = 0,
	}) {

	return function (BaseComponent) {
		return class SceneEnhancer extends BaseComponent {
			constructor (props) {
				super(props);
				this.state = {
					enterAnimation: new Animated.Value(0),
				}
			}

			componentDidMount () {
				setTimeout(() => {
					Animated.timing(this.state.enterAnimation, {
						toValue: 1,
						duration: enterSpeed,
						easing: Easing.out(Easing.cubic),
					}).start();
				}, delay);

				super.componentDidMount && super.componentDidMount();
			}

			render () {
				return super.render();
			}
		}
	}
}
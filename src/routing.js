import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { ControlledBrowserRouter, ControlledMemoryRouter } from 'react-router-addons-controlled';
import { Match, Miss } from 'react-router';
import NavigationCardStack from './components/universal/NavigationCardStack';

import RouterLink from './components/RouterLink';
import Welcome from './scene/welcome';
import Login from './scene/login';

import store, { history } from './store';
import * as Actions from './store/actions';
import { isBrowser } from './util';
const Router = isBrowser ?
	ControlledBrowserRouter : ControlledMemoryRouter;

@connect(({app}) => {
	return {
		location: app.get('location'),
		action: app.get('action'),
	}
})

export default class Routes extends Component {
	constructor (props) {
		super(props);
		this.state = {
			navState: reducer(),
		}
	}

	render() {
		return <Router
			history={history}
			location={this.props.location}
			action={this.props.action}
			onChange={this::onNavigate}>
			<NavigationCardStack
				navigationState={this.state.navState}
				renderScene={this::renderScene}/>
		</Router>
	}
}

function renderScene () {
	return <View style={{marginTop: 24}}>
		<View>
			<Link to="/login" title="login" context={this}/>
			<Link to="/welcome" title="welcome" context={this}/>
		</View>
		<Match pattern="/login" component={Login}/>
		<Match exactly pattern="/welcome" component={Welcome}/>
		<Miss component={Welcome}/>
	</View>
}

function onNavigate (location, action) {
	if (action == 'SYNC') action = this.props.action;

	this.props.dispatch({
		type: Actions.RouterNavigate,
		action, location,
	});
}

function Link ({context, title, to}) {
	return <TouchableOpacity onPress={navigate.bind(context, to)}>
		<Text>{title}</Text>
	</TouchableOpacity>
}

function navigate (to, action, route) {
	this.props.dispatch({
		type: Actions.RouterNavigate,
		location: { pathname: to },
		action: 'PUSH',
	});

	const navState = reducer(this.state.navState, 'push', {key: 'login', pathname: '/login'});
	this.setState({
		navState
	})
}

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
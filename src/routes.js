import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { ControlledBrowserRouter, ControlledMemoryRouter } from 'react-router-addons-controlled';
import { Match, HashRouter, MemoryRouter } from 'react-router';
import { os } from './util';

import store, { history } from './store';
import * as Actions from './store/actions';
import RouterLink from './components/RouterLink';
import Welcome from './scene/welcome';
import Login from './scene/login';

const Router = os == 'web' ? ControlledBrowserRouter : ControlledMemoryRouter;

@connect(({app}) => {
	return {
		location: app.get('location'),
		action: app.get('action'),
	}
})

export default class Routes extends Component {

	render () {
		return <Router
			history={history}
			location={this.props.location}
			action={this.props.action}
			onChange={this::onRouterChange}>
			<View style={{marginTop: 24}}>
				<View>
					<RouterLink to="/login">
						<Text>Login</Text>
					</RouterLink>
					<RouterLink to="/welcome">
						<Text>Welcome</Text>
					</RouterLink>
				</View>
				<Match pattern="/login" component={Login}/>
				<Match exactly pattern="/welcome" component={Welcome}/>
			</View>
		</Router>
	}
}

function onRouterChange (location, action) {
	if (action == 'SYNC') action = this.props.action;

	this.props.dispatch({
		type: Actions.RouterNavigate,
		action, location,
	});
}
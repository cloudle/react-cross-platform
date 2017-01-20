import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ControlledBrowserRouter } from 'react-router-addons-controlled';
import { Match, Miss } from 'react-router';

import store, { history } from './store';
import { connect } from './util';
import * as Actions from './store/actions';

import RouterLink from './components/browser/RouterLink';
import Welcome from './scene/welcome';
import Login from './scene/login';

@connect(({browserRoute}) => {
	return {
		location: browserRoute.get('location'),
		action: browserRoute.get('action'),
	}
})

export default class BrowserRoutes extends Component {
	render () {
		return <ControlledBrowserRouter
			history={history}
			location={this.props.location}
			action={this.props.action}
			onChange={this::onRouterChange}>
			<View style={{marginTop: 24}}>
				<View style={{padding: 10,}}>
					<RouterLink to="/welcome">
						<Text>Welcome</Text>
					</RouterLink>
					<RouterLink to="/login">
						<Text>Login</Text>
					</RouterLink>
				</View>

				<Match pattern="/login" component={Login}/>
				<Match exactly pattern="/welcome" component={Welcome}/>
				<Miss component={Welcome}/>
			</View>
		</ControlledBrowserRouter>
	}
}

function onRouterChange (location, action) {
	this.props.dispatch({
		type: Actions.BrowserRouterNavigate,
		action: action == 'SYNC' ? this.props.action : action,
		location,
	});
}
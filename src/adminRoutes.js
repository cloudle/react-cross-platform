import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ControlledBrowserRouter } from 'react-router-addons-controlled';
import { Match, Miss } from 'react-router';

import store, { history } from 'store';
import { connect } from 'utils';
import * as Actions from 'store/actions';
import { adminStyles } from 'admin/utils';

import NavigationPane from 'admin/shared/NavigationPane';
import GraphiQL from 'admin/shared/Graphiql';
import AppEmulator from 'admin/shared/AppEmulator';
import Welcome from 'scene/welcome';
import Login from 'scene/login';

@connect(({route}) => {
	return {
		location: route.location,
		action: route.action,
	}
})

export default class BrowserRoutes extends Component {
	render () {
		return <ControlledBrowserRouter
			history={history}
			location={this.props.location}
			action={this.props.action}
			onChange={this::onRouterChange}>
			<View style={{flex: 1}}>
				<NavigationPane/>
				<Match pattern="/login" component={Login}/>
				<Match exactly pattern="/welcome" component={Welcome}/>
				<Match exactly pattern="/emulator" component={AppEmulator}/>
				<Match exactly pattern="/api" component={GraphiQL}/>
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
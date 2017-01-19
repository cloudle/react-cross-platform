import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';

@connect(({app}) => ({
	location: app.get('location'),
}))

export class RouterLink extends Component {
	static propTypes = {
		children: React.PropTypes.element.isRequired,
		to: React.PropTypes.string.isRequired,
	};

	navigate () {
		if (this.props.location.pathname != this.props.to) this.props.dispatch({
			type: Actions.RouterNavigate,
			location: { pathname: this.props.to },
			action: 'PUSH',
		});
	}

	render () {
		return <TouchableOpacity onPress={this.navigate.bind(this)}>
			{this.props.children}
		</TouchableOpacity>
	}
}

export default RouterLink;
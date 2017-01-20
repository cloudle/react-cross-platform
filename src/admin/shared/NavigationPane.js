import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { adminStyles } from 'admin/utils';
import MenuItem from './NavigationMenuItem';
// @connect(({app}) => {
// 	return {
// 		counter: app.get('counter')
// 	}
// })

export default class NavigationPane extends Component {
	render () {
		return <View style={[adminStyles.container, styles.container]}>
			<View style={adminStyles.contentContainer}>
				<View style={styles.menuContainer}>
					{this.renderMenuItems()}
				</View>
			</View>
		</View>
	}

	renderHeadings () {
		return <View style={[adminStyles.contentContainer, styles.headingContainer]}>
			<Text>Heading</Text>
		</View>
	}

	renderMenuItems () {
		return menus.map((item, i) => {
			return <MenuItem
				key={i}
				title={item.title}
			  route={item.route}/>
		})
	}
}

const menus = [
	{ title: 'Users',
		route: '/users' },
	{ title: 'Job Category',
		route: '/jobCategories' },
	{ title: 'Transaction',
		route: '/transactions' },
	{ title: 'Traveller',
		route: '/traveller' },
	{ title: 'Worker',
		route: '/worker' },
	{ title: 'Emulator',
		route: '/emulator' },
	{ title: 'Api',
		route: '/api' },
];

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#1f2532',
	},
	menuContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		// marginLeft: -15, marginRight: -15,
	},
	headingContainer: {
		minHeight: 80,
	}
});
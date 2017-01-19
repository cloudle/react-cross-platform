import React, { Component } from 'react';
import { View, ScrollView, TouchableHighlight, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Match, Miss } from 'react-router';

@connect(({app}) => {
	return {
		counter: app.get('counter'),
	}
})

export default class LoginScene extends Component {

  render () {
    return <ScrollView>
      <Text>LoginScene!!!!</Text>
	    <View style={{marginTop: 50}}>
		    <View>
			    <NavLink to="/login/success"><Text>Success</Text></NavLink>
			    <NavLink to="/login/error"><Text>Error</Text></NavLink>
		    </View>
		    <View style={{marginTop: 20, backgroundColor: "#dedede"}}>
			    <Match pattern="" component={Main}/>
			    <Match exactly pattern="success" component={Success}/>
			    <Miss component={Error}/>
		    </View>
	    </View>
    </ScrollView>
  }
}

const styles = StyleSheet.create({

});

function Success () {
	return <View>
		<Text>Success!</Text>
	</View>
}

function Error () {
	return <View>
		<Text>Error!</Text>
	</View>
}

function Main () {
	return <View>
		<Text>Default!</Text>
	</View>
}

const NavLink = ({to, children}, context) => {
	const pressHandler = () => {
		// console.log(context);
		context.router.transitionTo(to);
	};

	return <TouchableHighlight onPress={pressHandler}>
		{children}
	</TouchableHighlight>
};

NavLink.contextTypes = {router: React.PropTypes.object};
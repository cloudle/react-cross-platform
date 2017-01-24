import React, { Component } from 'react';
import { View, Text } from 'react-native';

import EsEditor from './EsEditor';
import ElixirEditor from './ElixirEditor';
import GraphEditor from './GraphEditor';
import './CodeEditor.css';

export default class CodeEditor extends Component {
	static propTypes = {
		ready: React.PropTypes.bool,
	};

	constructor (props) {
	  super(props);
	  this.state = {
	  	ready: false,
	  }
	}

  render () {

	  return <View style={{height: '100%'}}>
		  <ElixirEditor/>
	  </View>
  }
}



const jsCode = `
function welcome () {
	console.log('Welcome to Emulator!');
}`, elixirCode = `
defmodule Wings do
	def welcome do
		IO.puts "Welcome to Emulator!"
	end
end
`;
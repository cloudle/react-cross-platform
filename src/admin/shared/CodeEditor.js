import React, { Component } from 'react';
import { View, Text } from 'react-native';

import CodeMirror from 'react-codemirror';
import './CodeEditor.css';

import 'codemirror/mode/javascript/javascript';
import 'codemirror-mode-elixir';
import 'codemirror-graphql/mode';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/lint/lint';
import 'codemirror-graphql/hint';
import 'codemirror-graphql/lint';

export default class CodeEditor extends Component {
	static propTypes = {
		ready: React.PropTypes.bool,
	};

  render () {
  	if (this.props.ready) {
		  return <CodeMirror
			  value={mirrorSource}
			  options={mirrorOptions}/>
	  } else {
  		return <View/>
	  }
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
`, graphQuery = `
query ($name: String) {
	greeting (name: $name) 	
}`;

const mirrorOptions = {
	lineNumbers: true,
	tabSize: 2,
	mode: 'graphql',
	theme: 'wings',
}, mirrorSource = graphQuery;
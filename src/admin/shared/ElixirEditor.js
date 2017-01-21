import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { query, Relay } from 'utils';
import { injectEditor } from './CodeEditorUtils';

export default class ElixirEditor extends Component {
	render () {
		return <div className="codeEditor" ref={node => { this.domNode = node; }}/>;
	}

	componentDidMount () {
		require('codemirror-mode-elixir');

		this::injectEditor({
			value: defaultCode,
			mode: 'elixir',
			extraKeys: {
				'Cmd-Enter': () => {
					query(`
						query execute($source: String!) {
							evil(source: $source) 
						}
					`, {source: this.editor.getValue()}).then(response => {
						console.info(response.evil);
					}).catch(errors => console.log(errors))
				},
			}
		});
	}
}

const defaultCode = `
IO.puts "Hello world!"
`;
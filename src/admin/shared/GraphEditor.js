import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { query } from 'utils';
import { introspectionQuery, buildClientSchema } from 'graphql';
import { injectEditor } from './CodeEditorUtils';

export default class GraphEditor extends Component {

  render () {
	  return <div className="codeEditor" ref={node => { this.domNode = node; }}/>;
  }

	componentDidMount () {
		require('codemirror-graphql/mode');
		require('codemirror-graphql/hint');
		require('codemirror-graphql/lint');
		require('codemirror-graphql/info');
		require('codemirror-graphql/jump');

		query(introspectionQuery).then(response => {
			let schema = buildClientSchema(response);

			this::injectEditor({
				value: defaultQuery,
				mode: 'graphql',
				lint: { schema: schema },
				hintOptions: { schema: schema },
				extraKeys: {
					'Cmd-Space': () => this.editor.showHint({ completeSingle: true }),
					'Ctrl-Space': () => this.editor.showHint({ completeSingle: true }),
					'Alt-Space': () => this.editor.showHint({ completeSingle: true }),
					'Shift-Space': () => this.editor.showHint({ completeSingle: true }),
					'Cmd-Enter': () => {
						query(this.editor.getValue()).then(response => {
							console.log(response);
						}).catch(errors => {
							console.error(errors);
						});
					},
				}
			});
		});
	}
}

const defaultQuery = `
query welcome {
	greeting
}`;
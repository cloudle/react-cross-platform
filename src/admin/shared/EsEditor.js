import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { query } from 'utils';
import { injectEditor } from './CodeEditorUtils';

export default class EsEditor extends Component {
  render () {
	  return <div className="codeEditor" ref={node => { this.domNode = node; }}/>;
  }

  componentDidMount () {
	  require('codemirror/mode/javascript/javascript');

		this::injectEditor({
			value: defaultCode,
			mode: 'javascript',
			extraKeys: {
				'Cmd-Enter': () => {
					eval(this.editor.getValue());
				},
				'Cmd-Space': "autocomplete",
			}
		});
  }
}

const defaultCode = `
console.log("Hello world!");
`;
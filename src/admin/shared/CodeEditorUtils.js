import CodeMirror from 'codemirror';

export function injectEditor (options) {
	require('codemirror/addon/hint/show-hint');
	require('codemirror/addon/comment/comment');
	require('codemirror/addon/edit/matchbrackets');
	require('codemirror/addon/edit/closebrackets');
	require('codemirror/addon/fold/foldgutter');
	require('codemirror/addon/fold/brace-fold');
	require('codemirror/addon/lint/lint');
	require('codemirror/keymap/sublime');

	const extraKeys = options.extraKeys || {};

	this.editor = CodeMirror(this.domNode, {
		lineNumbers: true,
		tabSize: 2,
		theme: 'wings',
		...options,
		extraKeys: {
			'Ctrl-Left': 'goSubwordLeft',
			'Ctrl-Right': 'goSubwordRight',
			'Alt-Left': 'goGroupLeft',
			'Alt-Right': 'goGroupRight',
			...extraKeys,
		}
	});
}
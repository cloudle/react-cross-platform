import { Platform } from 'react-native';
import { createBrowserHistory, createMemoryHistory } from 'history';
import Immutable from 'immutable';
import * as Actions from '../actions';

export let history = Platform.OS == 'web' ?
	createBrowserHistory() : createMemoryHistory();

global.History = history;

const initialState = Immutable.Map({
	counter: 0,
	location: history.location,
	action: history.action,
});

export default function (state = initialState, action) {
	switch (action.type) {
		case Actions.IncreaseCounter:
			return state.set('counter', state.get('counter') + action.volume);
		case Actions.RouterNavigate:
			console.log(history);
			return state.set('location', action.location).set('action', action.action);
		case Actions.RouterPush:
			return state.set();
		default:
			return state;
	}
}
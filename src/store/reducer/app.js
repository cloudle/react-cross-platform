import { Platform } from 'react-native';
import { createBrowserHistory, createMemoryHistory } from 'history';
import Immutable from 'immutable';
import * as Actions from '../actions';

export let history = Platform.OS == 'web' ?
	createBrowserHistory() : createMemoryHistory();

global.History = history;

const initialState = Immutable.Map({
	counter: 0,
	routes: getRoutesFromHistory(),
	routeIndex: history.index || 0,
	location: history.location,
	action: history.action,
});

export default function (state = initialState, action) {
	switch (action.type) {
		case Actions.IncreaseCounter:
			return state.set('counter', state.get('counter') + action.volume);
		case Actions.RouterNavigate:
			let nextIndex = history.index || 0,
				nextEntries = getRoutesFromHistory();

			return state.set('location', action.location)
				.set('action', action.action)
				.set('routeIndex', nextIndex)
				.set('routes', nextEntries);
		case Actions.RouterPush:
			return state;
		case Actions.RouterPop:
			return state;
		case Actions.RouterReset:
			return state;
		default:
			return state;
	}
}

function getRoutesFromHistory () {
	return !history.entries ?	[] :
		history.entries.map(item => ({...item, key: item.key || item.pathname}))
}
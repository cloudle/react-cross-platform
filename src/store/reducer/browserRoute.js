import Immutable from 'immutable';
import * as Actions from 'store/actions';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { isBrowser } from 'utils';

export let history = isBrowser ?
	createBrowserHistory() : createMemoryHistory();

const initialState = Immutable.Map({
	location: history.location,
	action: history.action,
});

export default function (state = initialState, action) {
	switch (action.type) {
		case Actions.BrowserRouterNavigate:
			return state
				.set('location', action.location)
				.set('action', action.action);
		default:
			return state;
	}
}
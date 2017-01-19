import Immutable from 'immutable';
import * as Actions from '../actions';
import { createBrowserHistory } from 'history';

export let history = createBrowserHistory();

const initialState = Immutable.Map({
	location: history.location,
	action: history.action,
});

export default function (state = initialState, action) {
	switch (action.type) {
		case Actions.BrowserNavigate:
			return state
				.set('location', action.location)
				.set('action', action.action);
		default:
			return state;
	}
}
import Immutable from 'immutable';
import * as Actions from '../actions';

const initialState = Immutable.Map({
	counter: 0,
});

export default function (state = initialState, action) {
	switch (action.type) {
		case Actions.IncreaseCounter:
			return state.set('counter', state.get('counter') + 1);
		default:
			return state;
	}
}
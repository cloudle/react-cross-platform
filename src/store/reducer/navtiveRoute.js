import Immutable from 'immutable';
import * as Actions from '../actions';

const initialState = Immutable.Map({

});

export default function (state = initialState, action) {
	switch (action.type) {

		default:
			return state;
	}
}
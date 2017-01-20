import store from 'store';
import * as Actions from 'store/actions';

export function increaseCounter (volume = 1) {
	store.dispatch({ type: Actions.IncreaseCounter, volume });
}
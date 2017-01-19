import * as Actions from '../actions';

export function increaseCounter (volume = 1) {
	return { type: Actions.IncreaseCounter, volume }
}

export function navigate (location, action) {
	return { type: Actions.RouterNavigate, location, action }
}

export function push (route) {
	return { type: Actions.RouterPush, route };
}

export function reset (route) {
	return { type: Actions.RouterReset, route };
}

export function pop () {
	return { type: Actions.RouterPop };
}
import * as Actions from 'admin/store/actions';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import app from './reducer/app';
import route from 'store/reducer/browserRoute';

const DEVTOOLS = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__',
	composeEnhancers = window[DEVTOOLS] || compose,
	reducers = combineReducers({
		app, route,
	});

let availableActions = {};
for (let key of Object.keys(Actions)) {
	availableActions[Actions[key]] = true;
}

const reduxLoggerMiddleware = applyMiddleware(logger({
	collapsed: (getState, action) => {
		return [
				Actions.RouterNavigate,
			].indexOf(action.type) >= 0;
	},
	predicate: (getState, action) => {
		if (!availableActions[action.type]) {
			console.info("This action doesn't belongs to Store:");
		}

		return [
				// Actions.RouterNavigate,
			].indexOf(action.type) < 0;
	},
}));

export default composeEnhancers(
	reduxLoggerMiddleware,
)(createStore)(reducers);

export const actions = Actions;
import * as Actions from '../actions';

export function increaseCounter (volume) {
  return { type: Actions.IncreaseCounter, volume }
}
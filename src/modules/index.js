import { combineReducers } from 'redux';

import topping from './topping';
import feedback from './feedback';


export default combineReducers({
  topping,
  feedback,
});

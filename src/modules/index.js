import { combineReducers } from 'redux';

import topping from './topping';
import feedback from './feedback';
import user from './user';
import snackbar from './snackbar';
import dialog from './dialog';


export default combineReducers({
  topping,
  feedback,
  user,
  snackbar,
  dialog,
});

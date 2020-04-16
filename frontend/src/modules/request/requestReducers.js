import list from 'modules/request/list/requestListReducers';
import form from 'modules/request/form/requestFormReducers';
import view from 'modules/request/view/requestViewReducers';
import destroy from 'modules/request/destroy/requestDestroyReducers';
import importerReducer from 'modules/request/importer/requestImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});

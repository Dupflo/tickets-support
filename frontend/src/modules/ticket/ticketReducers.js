import list from 'modules/ticket/list/ticketListReducers';
import form from 'modules/ticket/form/ticketFormReducers';
import view from 'modules/ticket/view/ticketViewReducers';
import destroy from 'modules/ticket/destroy/ticketDestroyReducers';
import importerReducer from 'modules/ticket/importer/ticketImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});

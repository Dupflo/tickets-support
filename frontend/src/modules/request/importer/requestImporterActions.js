import importerActions from 'modules/shared/importer/importerActions';
import selectors from 'modules/request/importer/requestImporterSelectors';
import RequestService from 'modules/request/requestService';
import fields from 'modules/request/importer/requestImporterFields';
import { i18n } from 'i18n';

export default importerActions(
  'REQUEST_IMPORTER',
  selectors,
  RequestService.import,
  fields,
  i18n('entities.request.importer.fileName'),
);

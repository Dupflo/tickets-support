import importerActions from 'modules/shared/importer/importerActions';
import selectors from 'modules/ticket/importer/ticketImporterSelectors';
import TicketService from 'modules/ticket/ticketService';
import fields from 'modules/ticket/importer/ticketImporterFields';
import { i18n } from 'i18n';

export default importerActions(
  'TICKET_IMPORTER',
  selectors,
  TicketService.import,
  fields,
  i18n('entities.ticket.importer.fileName'),
);

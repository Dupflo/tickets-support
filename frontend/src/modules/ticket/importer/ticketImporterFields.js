import model from 'modules/ticket/ticketModel';

const { fields } = model;

export default [
  fields.owner,
  fields.subject,
  fields.description,
  fields.photos,
  fields.status,
  fields.type,
  fields.requests,
];

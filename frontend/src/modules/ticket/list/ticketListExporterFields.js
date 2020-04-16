import model from 'modules/ticket/ticketModel';

const { fields } = model;

export default [
  fields.id,
  fields.owner,
  fields.subject,
  fields.description,
  fields.photos,
  fields.status,
  fields.type,
  fields.createdAt,
  fields.updatedAt
];

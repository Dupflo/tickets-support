import model from 'modules/request/requestModel';

const { fields } = model;

export default [
  fields.owner,
  fields.ticket,
  fields.start,
  fields.deadline,
  fields.clientNotes,
  fields.workerNotes,
  fields.photos,
  fields.status,
  fields.finishedNotes,
  fields.fee,
  fields.receipt,
];

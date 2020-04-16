import { i18n } from 'i18n';
import IdField from 'modules/shared/fields/idField';
import DateTimeField from 'modules/shared/fields/dateTimeField';
import DateTimeRangeField from 'modules/shared/fields/dateTimeRangeField';
import StringField from 'modules/shared/fields/stringField';
import EnumeratorField from 'modules/shared/fields/enumeratorField';
import DecimalRangeField from 'modules/shared/fields/decimalRangeField';
import DecimalField from 'modules/shared/fields/decimalField';
import RelationToOneField from 'modules/shared/fields/relationToOneField';
import FilesField from 'modules/shared/fields/filesField';
import ImagesField from 'modules/shared/fields/imagesField';

function label(name) {
  return i18n(`entities.request.fields.${name}`);
}

function enumeratorLabel(name, value) {
  return i18n(`entities.request.enumerators.${name}.${value}`);
}

const fields = {
  id: new IdField('id', label('id')),
  owner: new RelationToOneField('owner', label('owner'), {
    "required": true
  }),
  ticket: new RelationToOneField('ticket', label('ticket'), {
    "required": true
  }),
  start: new DateTimeField('start', label('start'), {
    "required": true
  }),
  deadline: new DateTimeField('deadline', label('deadline'), {
    "required": true
  }),
  clientNotes: new StringField('clientNotes', label('clientNotes'), {
    "max": 20000
  }),
  workerNotes: new StringField('workerNotes', label('workerNotes'), {
    "max": 20000
  }),
  photos: new ImagesField('photos', label('photos'), 'request/photos',{
    "size": 300000
  }),
  status: new EnumeratorField('status', label('status'), [
    { id: 'send', label: enumeratorLabel('status', 'send') },
    { id: 'in_progress', label: enumeratorLabel('status', 'in_progress') },
    { id: 'finisehd', label: enumeratorLabel('status', 'finisehd') },
  ],{
    "required": true
  }),
  finishedNotes: new StringField('finishedNotes', label('finishedNotes'), {
    "max": 20000
  }),
  fee: new DecimalField('fee', label('fee'), {
    "scale": 2
  }),
  receipt: new FilesField('receipt', label('receipt'), 'request/receipt',{
    "size": 300000
  }),
  createdAt: new DateTimeField(
    'createdAt',
    label('createdAt'),
  ),
  updatedAt: new DateTimeField(
    'updatedAt',
    label('updatedAt'),
  ),
  createdAtRange: new DateTimeRangeField(
    'createdAtRange',
    label('createdAtRange'),
  ),
  startRange: new DateTimeRangeField(
    'startRange',
    label('startRange'),
  ),
  deadlineRange: new DateTimeRangeField(
    'deadlineRange',
    label('deadlineRange'),
  ),
  feeRange: new DecimalRangeField(
    'feeRange',
    label('feeRange'),
  ),
};

export default {
  fields,
};

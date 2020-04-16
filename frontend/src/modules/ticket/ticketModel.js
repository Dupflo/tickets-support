import { i18n } from 'i18n';
import IdField from 'modules/shared/fields/idField';
import DateTimeField from 'modules/shared/fields/dateTimeField';
import DateTimeRangeField from 'modules/shared/fields/dateTimeRangeField';
import StringField from 'modules/shared/fields/stringField';
import EnumeratorField from 'modules/shared/fields/enumeratorField';
import RelationToOneField from 'modules/shared/fields/relationToOneField';
import RelationToManyField from 'modules/shared/fields/relationToManyField';
import ImagesField from 'modules/shared/fields/imagesField';

function label(name) {
  return i18n(`entities.ticket.fields.${name}`);
}

function enumeratorLabel(name, value) {
  return i18n(`entities.ticket.enumerators.${name}.${value}`);
}

const fields = {
  id: new IdField('id', label('id')),
  owner: new RelationToOneField('owner', label('owner'), {
    "required": true
  }),
  subject: new StringField('subject', label('subject'), {
    "required": true,
    "min": 2,
    "max": 255
  }),
  description: new StringField('description', label('description'), {
    "max": 21845
  }),
  photos: new ImagesField('photos', label('photos'), 'ticket/photos',{
    "max": 3,
    "size": 1000000
  }),
  status: new EnumeratorField('status', label('status'), [
    { id: 'easy', label: enumeratorLabel('status', 'easy') },
    { id: 'urgent', label: enumeratorLabel('status', 'urgent') },
  ],{
    "required": true
  }),
  type: new EnumeratorField('type', label('type'), [
    { id: 'debug', label: enumeratorLabel('type', 'debug') },
    { id: 'feature', label: enumeratorLabel('type', 'feature') },
    { id: 'explanation', label: enumeratorLabel('type', 'explanation') },
  ],{
    "required": true
  }),
  requests: new RelationToManyField('requests', label('requests'), {}),
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

};

export default {
  fields,
};

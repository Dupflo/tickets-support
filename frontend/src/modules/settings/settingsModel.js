import { i18n } from 'i18n';
import EnumeratorField from 'modules/shared/fields/enumeratorField';

const themes = [
  {
    id: 'default',
    hex: '#1890ff',
  },
  {
    id: 'light',
    hex: '#f8f9fa',
  },
  {
    id: 'cyan',
    hex: '#13c2c2',
  },
  {
    id: 'geek-blue',
    hex: '#2f54eb',
  },
  {
    id: 'gold',
    hex: '#faad14',
  },
  {
    id: 'lime',
    hex: '#a0d911',
  },
  {
    id: 'magenta',
    hex: '#eb2f96',
  },
  {
    id: 'orange',
    hex: '#fa8c16',
  },
  {
    id: 'polar-green',
    hex: '#52c41a',
  },
  {
    id: 'purple',
    hex: '#722ed1',
  },
  {
    id: 'red',
    hex: '#f5222d',
  },
  {
    id: 'volcano',
    hex: '#fa541c',
  },
  {
    id: 'yellow',
    hex: '#fadb14',
  },
].map((theme) => ({
  ...theme,
  label: i18n(`settings.colors.${theme.id}`),
}));

function label(name) {
  return i18n(`settings.fields.${name}`);
}

const fields = {
  theme: new EnumeratorField(
    'theme',
    label('theme'),
    themes,
    { required: true },
  ),
};

export default {
  fields,
};

const genericFixture = require('./genericFixture');
const RequestRepository = require('../database/repositories/requestRepository');

const requestFixture = genericFixture({
  idField: 'id',
  createFn: (data) => new RequestRepository().create(data),
  data: [
    {
      id: '1',
      // Add attributes here
    },
  ],
});

module.exports = requestFixture;

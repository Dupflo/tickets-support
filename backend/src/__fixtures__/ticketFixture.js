const genericFixture = require('./genericFixture');
const TicketRepository = require('../database/repositories/ticketRepository');

const ticketFixture = genericFixture({
  idField: 'id',
  createFn: (data) => new TicketRepository().create(data),
  data: [
    {
      id: '1',
      // Add attributes here
    },
  ],
});

module.exports = ticketFixture;

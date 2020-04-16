const userFixture = require('./userFixture');
const ticketFixture = require('./ticketFixture');
const requestFixture = require('./requestFixture');
const AbstractRepository = require('../database/repositories/abstractRepository');

module.exports = {
  user: userFixture,
  ticket: ticketFixture,
  request: requestFixture,

  async cleanDatabase() {
    await AbstractRepository.cleanDatabase();
  },
};

module.exports = (app) => {
  app.post(`/ticket`, require('./ticketCreate'));
  app.put(`/ticket/:id`, require('./ticketUpdate'));
  app.post(`/ticket/import`, require('./ticketImport'));
  app.delete(`/ticket`, require('./ticketDestroy'));
  app.get(
    `/ticket/autocomplete`,
    require('./ticketAutocomplete'),
  );
  app.get(`/ticket`, require('./ticketList'));
  app.get(`/ticket/:id`, require('./ticketFind'));
};

module.exports = (app) => {
  app.post(`/request`, require('./requestCreate'));
  app.put(`/request/:id`, require('./requestUpdate'));
  app.post(`/request/import`, require('./requestImport'));
  app.delete(`/request`, require('./requestDestroy'));
  app.get(
    `/request/autocomplete`,
    require('./requestAutocomplete'),
  );
  app.get(`/request`, require('./requestList'));
  app.get(`/request/:id`, require('./requestFind'));
};

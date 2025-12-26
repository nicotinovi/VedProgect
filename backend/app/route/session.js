module.exports = (app) => {
    const session = require('../controller/session');

    app.get('/api/listSessions', session.findAll);
    app.get('/api/session/:id', session.findById); // Для страницы оценок
    app.post('/api/addSession', session.create);
    app.post('/api/deleteSession/:id', session.delete);
};
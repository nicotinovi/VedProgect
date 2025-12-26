module.exports = (app) => {
    const reportType = require('../controller/reportType');

    app.get('/api/listReportTypes', reportType.findAll);
    app.post('/api/addReportType', reportType.create);
    app.post('/api/deleteReportType/:id', reportType.delete);
};
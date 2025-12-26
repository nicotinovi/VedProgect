module.exports = (app) => {
    const attestation = require('../controller/attestation');

    // Получить оценки ведомости
    app.get('/api/attestation/session/:session_id', attestation.findBySession);
    
    // Сохранить оценку
    app.post('/api/attestation/save', attestation.saveMark);
};
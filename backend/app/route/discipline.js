module.exports = (app) => {

    const discipline = require('../controller/discipline');

    // Получение списка учебных дисциплин
    app.get('/api/listDisciplines', discipline.findAll);

    // Добавление данных учебной дисциплины
    app.post('/api/addDiscipline', discipline.create);

    // Обновление данных учебной дисциплины
    app.post('/api/updateDiscipline/:id', discipline.update);

    // Удаление данных учебной дисциплины
    app.post('/api/deleteDiscipline/:id', discipline.delete);

    // Получение данных учебной дисциплины по id
    app.get('/api/discipline/:id', discipline.findById);
};
module.exports = (app) => {

    const studentGroup = require('../controller/studentGroup');

    // Получение списка студенческих групп
    app.get('/api/listStudentGroups', studentGroup.findAll);

    // Добавление студенческой группы
    app.post('/api/addStudentGroup', studentGroup.create);

    // Обновление студенческой группы
    app.post('/api/updateStudentGroup/:id', studentGroup.update);

    // Удаление студенческой группы
    app.post('/api/deleteStudentGroup/:id', studentGroup.delete);

    // Получение студенческой группы по id
    app.get('/api/studentGroup/:id', studentGroup.findById);
};
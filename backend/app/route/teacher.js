module.exports = (app) => {

    const teacher = require('../controller/teacher');

    // получение списка преподавателей
    app.get('/api/listTeachers', teacher.findAll);

    // добавление данных преподавателя
    app.post('/api/addTeacher', teacher.create);

    // обновление данных преподавателя
    app.post('/api/updateTeacher/:id', teacher.update);

    // удаление данных преподавателя
    app.post('/api/deleteTeacher/:id', teacher.delete);

    // получение данных преподавателя по id
    app.get('/api/teacher/:id', teacher.findById);

    // получения информации о том, какие учебные дисциплины ведут преподаватели
    app.get('/api/listTeacherDiscipline', teacher.findDisciplines);

    // назначение преподавателю учебной дисциплины
    app.post('/api/addTeacherDiscipline', teacher.createDisciplines);

    // удаление информации о назначении преподавателю учебной дисциплины
    app.post('/api/deleteTeacherDiscipline/teacherId=:teacher_id/disciplineId=:discipline_id', teacher.deleteDisciplines);

};
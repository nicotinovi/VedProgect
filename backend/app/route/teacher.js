module.exports = (app) => {
    const teacher = require('../controller/teacher');

    // получение списка преподавателей

    app.get('/api/listTeachers', teacher.listTeachers);

    // добавление данных преподавателя

    app.post('/api/addTeacher', teacher.addTeacher);

    // обновление данных преподавателя

    app.post('/api/updateTeacher/:id', teacher.updateTeacher);

    // удаление данных преподавателя

    app.post('/api/deleteTeacher/:id', teacher.deleteTeacher);

    // получение данных преподавателя по id
    app.get('/api/teacher/:id', teacher.findById);

    // получения информации о том, какие учебные дисциплины ведут преподаватели

    app.get('/api/listTeacherDiscipline', teacher.listTeacherDiscipline);

    // назначение преподавателю учебной дисциплины

    app.post('/api/addTeacherDiscipline', teacher.addTeacherDiscipline);

    // удаление информации о назначении преподавателю учебной дисциплины

    app.post('/api/deleteTeacherDiscipline/teacherId=:teacher_id/disciplineId=:discipline_id', teacher.deleteTeacherDiscipline);
};
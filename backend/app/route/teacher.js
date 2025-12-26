module.exports = (app) => {
    const teacher = require('../controller/teacher');

    // --- Преподаватели ---
    // Список всех преподавателей
    app.get('/api/listTeachers', teacher.listTeachers);
    // Добавить преподавателя
    app.post('/api/addTeacher', teacher.addTeacher);
    // Обновить преподавателя
    app.post('/api/updateTeacher/:id', teacher.updateTeacher);
    // Удалить преподавателя
    app.post('/api/deleteTeacher/:id', teacher.deleteTeacher);
    // Получить одного преподавателя
    app.get('/api/teacher/:id', teacher.findById);

    // --- Связь Преподаватель <-> Дисциплина ---
    // Список всех связей
    app.get('/api/listTeacherDisciplines', teacher.listTeacherDiscipline);
    // Назначить дисциплину преподавателю
    app.post('/api/addTeacherDiscipline', teacher.addTeacherDiscipline);
    // Удалить дисциплину у преподавателя (обрати внимание на длинный путь)
    app.post('/api/deleteTeacherDiscipline/teacher/:teacher_id/discipline/:discipline_id', teacher.deleteTeacherDiscipline);
};
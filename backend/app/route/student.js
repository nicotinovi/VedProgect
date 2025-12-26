module.exports = (app) => {

    const student = require('../controller/student');

    // Получение списка студентов
    app.get('/api/listStudents', student.findAll);

    // Добавление студента
    app.post('/api/addStudent', student.create);

    // Обновление данных студента
    app.post('/api/updateStudent/:id', student.update);

    // Удаление данных студента
    app.post('/api/deleteStudent/:id', student.delete);

    // Получение данных студента по id
    app.get('/api/student/:id', student.findById);

    // Получение студентов по студенческой группе
    app.get('/api/studentsByStudentGroup/studentGroupId=:student_group_id', student.studentsByStudentGroup);
};
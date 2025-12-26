var db = require('../config/db.config.js');
var Student = db.student;
var StudentGroup = db.student_group;
var globalFunctions = require('../config/global.functions.js');

// Получение всех студентов с информацией о группе
exports.findAll = (req, res) => {
    Student.findAll({
        include: [
            {
                model: StudentGroup,
                required: true // INNER JOIN
            }
        ]
    })
    .then(objects => {
        globalFunctions.sendResult(res, objects);
    })
    .catch(err => {
        globalFunctions.sendError(res, err);
    });
};

// Добавление студента
exports.create = (req, res) => {
    Student.create({
        name: req.body.name,
        student_group_id: req.body.student_group_id
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

// Обновление данных студента
exports.update = (req, res) => {
    Student.update({
            name: req.body.name,
            student_group_id: req.body.student_group_id
        },
        {
            where: {
                id: req.params.id
            }
        }
    ).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

// Удаление студента
exports.delete = (req, res) => {
    Student.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

// Получение студента по id
exports.findById = (req, res) => {
    Student.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

// Получение студентов по id группы
exports.studentsByStudentGroup = (req, res) => {
    StudentGroup.findAll({
        include: [
            {
                model: Student,
                required: true // INNER JOIN
            }
        ],
        where: {
            id: req.params.student_group_id
        }
    })
    .then(objects => {
        globalFunctions.sendResult(res, objects);
    })
    .catch(err => {
        globalFunctions.sendError(res, err);
    });
};
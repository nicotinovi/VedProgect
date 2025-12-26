var db = require('../config/db.config.js');
var Teacher = db.teacher;
var TeacherDiscipline = db.teacher_discipline;
var Discipline = db.discipline;
var globalFunctions = require('../config/global.functions.js');

exports.listTeachers = (req, res) => {
    Teacher.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

exports.addTeacher = (req, res) => {
    Teacher.create({
        name: req.body.name
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.updateTeacher = (req, res) => {
    Teacher.update({
            name: req.body.name
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

exports.deleteTeacher = (req, res) => {
    Teacher.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.findById = (req, res) => {
    Teacher.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

exports.listTeacherDiscipline = (req, res) => {
    TeacherDiscipline.findAll({
        include: [
            { model: Teacher },
            { model: Discipline }
        ]
    })
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

exports.addTeacherDiscipline = (req, res) => {
    TeacherDiscipline.create({
        teacher_id: req.body.teacher_id,
        discipline_id: req.body.discipline_id
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.deleteTeacherDiscipline = (req, res) => {
    TeacherDiscipline.destroy({
        where: {
            teacher_id: req.params.teacher_id,
            discipline_id: req.params.discipline_id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};
var db = require('../config/db.config.js');
var Session = db.student_group_session;
var StudentGroup = db.student_group;
var ReportType = db.report_type;
var TeacherDiscipline = db.teacher_discipline;
var Discipline = db.discipline;
var Teacher = db.teacher;
var globalFunctions = require('../config/global.functions.js');

// Получить все сессии (с полным деревом связей для красивого вывода)
exports.findAll = (req, res) => {
    Session.findAll({
        include: [
            { model: StudentGroup },
            { model: ReportType },
            { 
                model: TeacherDiscipline,
                include: [
                    { model: Discipline },
                    { model: Teacher }
                ]
            }
        ]
    })
    .then(objects => globalFunctions.sendResult(res, objects))
    .catch(err => globalFunctions.sendError(res, err));
};

// Создать новую сессию
exports.create = (req, res) => {
    Session.create({
        student_group_id: req.body.student_group_id,
        report_type_id: req.body.report_type_id,
        teacher_discipline_id: req.body.teacher_discipline_id,
        semester: req.body.semester,
        mark_date: req.body.mark_date
    })
    .then(object => globalFunctions.sendResult(res, object))
    .catch(err => globalFunctions.sendError(res, err));
};

// Удалить сессию
exports.delete = (req, res) => {
    Session.destroy({
        where: { id: req.params.id }
    }).then(() => globalFunctions.sendResult(res, 'Удалено'))
    .catch(err => globalFunctions.sendError(res, err));
};

// Получить одну сессию по ID (понадобится позже для выставления оценок)
exports.findById = (req, res) => {
    Session.findByPk(req.params.id, {
        include: [
            { model: StudentGroup },
            { model: ReportType },
            { 
                model: TeacherDiscipline,
                include: [ { model: Discipline }, { model: Teacher } ]
            }
        ]
    })
    .then(object => globalFunctions.sendResult(res, object))
    .catch(err => globalFunctions.sendError(res, err));
};
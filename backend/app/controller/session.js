var db = require('../config/db.config.js');
var Session = db.student_group_session;
var StudentGroup = db.student_group;
var ReportType = db.report_type;
var TeacherDiscipline = db.teacher_discipline;
var Discipline = db.discipline;
var Teacher = db.teacher;
var globalFunctions = require('../config/global.functions.js');

// Получить все сессии
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

// Создать новую сессию с проверкой на дубликаты
exports.create = async (req, res) => {
    try {
        const { 
            student_group_id, 
            report_type_id, 
            teacher_discipline_id, 
            semester, 
            mark_date 
        } = req.body;

        // 1. Проверяем, существует ли уже такая ведомость
        const existingSession = await Session.findOne({
            where: {
                student_group_id: student_group_id,           // Та же группа
                teacher_discipline_id: teacher_discipline_id, // Тот же предмет и препод
                report_type_id: report_type_id,               // Тот же тип (зачет/экзамен)
                semester: semester                            // Тот же семестр
            }
        });

        // 2. Если нашли - возвращаем ошибку 400
        if (existingSession) {
            return res.status(400).send({ 
                message: "Такая ведомость уже существует (Группа + Предмет + Тип + Семестр)!" 
            });
        }

        // 3. Если не нашли - создаем новую
        const newSession = await Session.create({
            student_group_id,
            report_type_id,
            teacher_discipline_id,
            semester,
            mark_date
        });

        globalFunctions.sendResult(res, newSession);

    } catch (err) {
        globalFunctions.sendError(res, err);
    }
};

// Удалить сессию
exports.delete = (req, res) => {
    Session.destroy({
        where: { id: req.params.id }
    }).then(() => globalFunctions.sendResult(res, 'Удалено'))
    .catch(err => globalFunctions.sendError(res, err));
};

// Получить одну сессию по ID
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
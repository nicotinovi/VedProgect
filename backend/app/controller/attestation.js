var db = require('../config/db.config.js');
var Attestation = db.attestation_book;
var Student = db.student;
var globalFunctions = require('../config/global.functions.js');

// Получить оценки для конкретной сессии (ведомости)
exports.findBySession = (req, res) => {
    Attestation.findAll({
        where: {
            student_group_session_id: req.params.session_id
        },
        include: [{ model: Student }]
    })
    .then(objects => globalFunctions.sendResult(res, objects))
    .catch(err => globalFunctions.sendError(res, err));
};

// Сохранить (или обновить) оценку
exports.saveMark = async (req, res) => {
    try {
        const { student_id, student_group_session_id, mark } = req.body;

        // Ищем, есть ли уже оценка у этого студента в этой ведомости
        const existing = await Attestation.findOne({
            where: {
                student_id: student_id,
                student_group_session_id: student_group_session_id
            }
        });

        if (existing) {
            // Если есть - обновляем
            await existing.update({ mark: mark });
            globalFunctions.sendResult(res, existing);
        } else {
            // Если нет - создаем
            const newRecord = await Attestation.create({
                student_id: student_id,
                student_group_session_id: student_group_session_id,
                mark: mark
            });
            globalFunctions.sendResult(res, newRecord);
        }
    } catch (err) {
        globalFunctions.sendError(res, err);
    }
};
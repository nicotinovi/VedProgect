var db = require('../config/db.config.js');
var Discipline = db.discipline;
var globalFunctions = require('../config/global.functions.js');

// Получение всех учебных дисциплин
exports.findAll = (req, res) => {
    Discipline.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

// Добавление учебной дисциплины
exports.create = (req, res) => {
    Discipline.create({
        name: req.body.name
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

// Обновление учебной дисциплины по id
exports.update = (req, res) => {
    Discipline.update({
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

// Удаление учебной дисциплины по id
exports.delete = (req, res) => {
    Discipline.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

// Получение учебной дисциплины по id
exports.findById = (req, res) => {
    Discipline.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};
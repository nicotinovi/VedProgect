var db = require('../config/db.config.js');
var StudentGroup = db.student_group; // название модели смотреть в init-models.js
var globalFunctions = require('../config/global.functions.js');

// Получение всех студенческих групп
exports.findAll = (req, res) => {
    StudentGroup.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

// Добавление студенческой группы
exports.create = (req, res) => {
    StudentGroup.create({
        name: req.body.name // Предполагаемое поле названия группы
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

// Обновление студенческой группы по id
exports.update = (req, res) => {
    StudentGroup.update({
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

// Удаление студенческой группы по id
exports.delete = (req, res) => {
    StudentGroup.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

// Получение студенческой группы по id
exports.findById = (req, res) => {
    StudentGroup.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};
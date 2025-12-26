var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var corsOptions = {
    origin: ['http://localhost:4200', "http://localhost:5173", "http://127.0.0.1:5173"], // указываем, откуда будут приходить запросы
    credentials: true, // разрешаем обрабатывать запросы
    optionSuccessStatus: 200 // при успешной обработке запроса будет возвращён статус 200
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var db = require('./app/config/db.config.js'); // подключение настроек базы данных

db.sequelize.sync({force: false}); // force обозначает автоматическое создание таблиц в базе данных при запуске проекта

app.listen(3000);

var user = require('./app/route/user');
user(app);

var studentGroup = require('./app/route/studentGroup');
studentGroup(app);

var student = require('./app/route/student');
student(app);

var discipline = require('./app/route/discipline');
discipline(app);

var teacher = require('./app/route/teacher');
teacher(app);

var auth = require('./app/route/authRoute');
auth(app);
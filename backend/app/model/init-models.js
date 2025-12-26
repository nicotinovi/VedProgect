var DataTypes = require("sequelize").DataTypes;
var _attestation_book = require("./attestation_book");
var _discipline = require("./discipline");
var _report_type = require("./report_type");
var _sqlite_sequence = require("./sqlite_sequence");
var _student = require("./student");
var _student_group = require("./student_group");
var _student_group_session = require("./student_group_session");
var _teacher = require("./teacher");
var _teacher_discipline = require("./teacher_discipline");
var _user = require("./user");

function initModels(sequelize) {
  var attestation_book = _attestation_book(sequelize, DataTypes);
  var discipline = _discipline(sequelize, DataTypes);
  var report_type = _report_type(sequelize, DataTypes);
  var sqlite_sequence = _sqlite_sequence(sequelize, DataTypes);
  var student = _student(sequelize, DataTypes);
  var student_group = _student_group(sequelize, DataTypes);
  var student_group_session = _student_group_session(sequelize, DataTypes);
  var teacher = _teacher(sequelize, DataTypes);
  var teacher_discipline = _teacher_discipline(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  discipline.hasMany(teacher_discipline, { foreignKey: "discipline_id", onDelete: "CASCADE"});
  report_type.hasMany(student_group_session, { foreignKey: "report_type_id", onDelete: "CASCADE"});
  student.hasMany(attestation_book, { foreignKey: "student_id", onDelete: "CASCADE"});
  student_group.hasMany(student, { foreignKey: "student_group_id", onDelete: "CASCADE"});
  student_group.hasMany(student_group_session, { foreignKey: "student_group_id", onDelete: "CASCADE"});
  student_group_session.hasMany(attestation_book, { foreignKey: "student_group_session_id", onDelete: "CASCADE"});
  teacher.hasMany(teacher_discipline, { foreignKey: "teacher_id", onDelete: "CASCADE"});
  teacher_discipline.hasMany(student_group_session, { foreignKey: "teacher_discipline_id", onDelete: "CASCADE"});
  attestation_book.belongsTo(student, { foreignKey: "student_id"});
  attestation_book.belongsTo(student_group_session, { foreignKey: "student_group_session_id"});
  student.belongsTo(student_group, { foreignKey: "student_group_id"});
  student_group_session.belongsTo(report_type, { foreignKey: "report_type_id"});
  student_group_session.belongsTo(student_group, { foreignKey: "student_group_id"});
  student_group_session.belongsTo(teacher_discipline, { foreignKey: "teacher_discipline_id"});
  teacher_discipline.belongsTo(discipline, { foreignKey: "discipline_id"});
  teacher_discipline.belongsTo(teacher, { foreignKey: "teacher_id"});

  return {
    attestation_book,
    discipline,
    report_type,
    sqlite_sequence,
    student,
    student_group,
    student_group_session,
    teacher,
    teacher_discipline,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
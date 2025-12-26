module.exports = function(sequelize, DataTypes) {
  return sequelize.define('student_group_session', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    student_group_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'student_group',
        key: 'id'
      }
    },
    report_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'report_type',
        key: 'id'
      }
    },
    teacher_discipline_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'teacher_discipline',
        key: 'id'
      }
    },
    mark_date: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    semester: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
};
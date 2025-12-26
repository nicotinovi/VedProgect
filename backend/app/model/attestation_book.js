module.exports = function(sequelize, DataTypes) {
  return sequelize.define('attestation_book', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'student',
        key: 'id'
      }
    },
    student_group_session_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'student_group_session',
        key: 'id'
      }
    },
    mark: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    theme: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });
};
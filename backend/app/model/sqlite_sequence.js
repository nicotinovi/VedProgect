module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sqlite_sequence', {
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    seq: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });
};
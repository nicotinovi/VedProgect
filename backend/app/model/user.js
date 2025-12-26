module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', { // определяем имя таблицы
    id: {
      autoIncrement: true, // включение автоматической нумерации
      type: DataTypes.INTEGER, // тип данных INTEGER
      allowNull: false, // настройка allowNull со значением false запрещает запись в поле значений NULL (для поля с настройкой автоинкремента можно не указывать)
      primaryKey: true // поле является первичным ключом
    },
    username: {
      type: DataTypes.STRING(50), // тип данных STRING (в MySQL — VARCHAR)
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(150),
      allowNull: false
    }
  });
};
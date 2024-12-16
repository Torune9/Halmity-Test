'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserAppointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserAppointment.init({
    user_id: DataTypes.INTEGER,
    appointment_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserAppointment',
  });
  return UserAppointment;
};
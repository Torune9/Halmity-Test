'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Appointment,UserAppointment}) {
      this.hasMany(Appointment,{
        foreignKey : 'creator_id',
        as: 'appointments',
      })

      this.belongsToMany(Appointment,{
        through : UserAppointment,
        foreignKey: 'user_id', 
        otherKey: 'appointment_id',
        as: 'user_appointments',
      })
    }
  }
  User.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    preferred_timezone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User,UserAppointment}) {
      
      this.belongsTo(User,{
        foreignKey: 'creator_id',
        as: 'creator', 
      })

      this.belongsToMany(User,{
        through : UserAppointment,
        foreignKey: 'appointment_id',
        otherKey : 'user_id',
        as: 'participants',
      })
    }
  }
  Appointment.init({
    title: DataTypes.STRING,
    creator_id: DataTypes.INTEGER,
    start: DataTypes.DATE,
    end: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};
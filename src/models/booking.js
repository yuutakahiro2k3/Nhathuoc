'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {

        static associate(models) {

        }
    }
    Booking.init({

        statusId: DataTypes.STRING,
        doctorId: DataTypes.STRING,
        patientId: DataTypes.STRING,
        date: DataTypes.DATE,
        timeType: DataTypes.BOOLEAN,
        roleId: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Booking',
    });
    return Booking;
};
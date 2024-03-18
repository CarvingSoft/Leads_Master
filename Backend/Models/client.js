const { DataTypes } = require('sequelize');
const sequelize = require('../Utils/db');

const Client = sequelize.define('client',{
    clientName : {type : DataTypes.STRING, allowNull : false},
    phoneNumber: {type : DataTypes.STRING, allowNull : false}
},
{
    freezeTableName: true,
    timestamps : false
})


module.exports = Client;



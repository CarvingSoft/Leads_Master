const { DataTypes } = require('sequelize');
const sequelize = require('../Utils/db');

const Status = sequelize.define('status',{
    status : {type : DataTypes.STRING, allowNull : false},
},
{
    freezeTableName: true,
    timestamps : false
})


module.exports = Status;



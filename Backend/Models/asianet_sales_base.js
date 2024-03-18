const { DataTypes } = require('sequelize');
const sequelize = require('../Utils/db');

const AsianetSales = sequelize.define('asianetSales',{
    Region : {type : DataTypes.STRING},
    Subcode : {type : DataTypes.STRING},
    Name : {type : DataTypes.STRING, allowNullValues : false},
    Address : {type : DataTypes.STRING},
    Address1 : {type : DataTypes.STRING},
    Address2 : {type : DataTypes.STRING},
    Package : {type : DataTypes.STRING},
    Scheme : {type : DataTypes.STRING},
    Phone : {type : DataTypes.STRING},
    Balance : {type : DataTypes.FLOAT, allowNullValues : false},
    Mobile : {type : DataTypes.FLOAT, allowNullValues : false},
    
    status : {type : DataTypes.INTEGER},
    remarks : {type : DataTypes.STRING},
    freeText : {type : DataTypes.STRING(200)},
    action : {type : DataTypes.STRING(200)},
    Teleby : {type : DataTypes.INTEGER, allowNull: false},
    projectId: {type : DataTypes.INTEGER, allowNull: false},
    date: {type: DataTypes.DATEONLY},
    time: {type: DataTypes.TIME},
    callTime: {type: DataTypes.DATE}
},
{
    freezeTableName: true,
    timestamps : true
})


module.exports = AsianetSales;



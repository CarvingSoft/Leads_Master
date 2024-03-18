const { DataTypes } = require('sequelize');
const sequelize = require('../Utils/db');
const Status = require('./status');
const Vi = sequelize.define('vi',{
    region : {type: DataTypes.STRING},
    mobileNumber : {type : DataTypes.STRING, allowNull : false},
    custName : {type : DataTypes.STRING, allowNull : false},
    campionName : {type : DataTypes.STRING},
    currentPlan : {type : DataTypes.STRING, allowNull : false},
    noOfConnections : {type : DataTypes.INTEGER},
    pinCode : {type : DataTypes.STRING, allowNull : false},
    suggestedPlan : {type : DataTypes.STRING, allowNull : false},
    contactNo: {type : DataTypes.STRING},
    
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


module.exports = Vi;



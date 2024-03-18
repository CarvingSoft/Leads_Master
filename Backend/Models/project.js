const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Utils/db')

const Project = sequelize.define('project', {
  startDate: {type: DataTypes.DATEONLY},
  projectName: {type: DataTypes.STRING, allowNull: false},
  imageUrl: {type: DataTypes.STRING},
  teamLeadId: {type: DataTypes.INTEGER},
  description: {type: DataTypes.STRING},
  // clientId: {type: DataTypes.INTEGER},
  projectTypeId: {type: DataTypes.INTEGER, allowNull: false},
  endDate: {type: DataTypes.DATE}
},
{
  freezeTableName: true
});

module.exports = Project
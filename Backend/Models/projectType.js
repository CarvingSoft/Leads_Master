const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Utils/db')

const ProjectType = sequelize.define('projectType', {
  typeName: {type: DataTypes.STRING, allowNull: false},
},
{
  freezeTableName: true
});

module.exports = ProjectType
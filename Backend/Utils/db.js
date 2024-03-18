const {Sequelize} = require('sequelize')


const sequelize = new Sequelize('telecom', 'telecom', 'telecom', {
    host: 'localhost',
    dialect: 'postgres' 
});

module.exports = sequelize
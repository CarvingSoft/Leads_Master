const sequelize = require('./db');
const { JSON } = require('sequelize');
const bcrypt = require('bcrypt');

const Role = require('../Models/userRole');
const User = require('../Models/user');
const ProjectType = require('../Models/projectType');
const Project = require('../Models/project');
const Client = require('../Models/client');
const Asianet = require('../Models/asianet_base');
const Bajaj = require('../Models/bajaj_base');
const Vi = require('../Models/vi_base');
const AsianetFollowup = require('../Models/asianet_followup');
const BajajFollowup = require('../Models/bajaj_followup');
const ViFollowup = require('../Models/vi_followup');
const AsianetSalesFollowup = require('../Models/asianet_sales_followup');
const ViCollectionFollowup = require('../Models/vi_collection_followup');
const ViCollection = require('../Models/vi_collection');
const AsianetSales = require('../Models/asianet_sales_base');
const Status = require('../Models/status');
async function syncModel(){
    
    // await sequelize.sync({force : true})

    Role.hasMany(User,{foreignKey : 'roleId', onDelete : 'CASCADE', onUpdate : 'CASCADE'})
    User.belongsTo(Role)

    ProjectType.hasMany(Project, {foreignKey: 'projectTypeId'})
    Project.belongsTo(ProjectType)

    User.hasMany(Project, {foreignKey: 'teamLeadId'})
    Project.belongsTo(User, {as: 'teamLead', foreignKey : 'teamLeadId'})

    // Client.hasMany(Project, {foreignKey: 'clientId'})
    // Project.belongsTo(Client)

    Project.hasMany(Asianet, {foreignKey: 'projectId'})
    Asianet.belongsTo(Project)

    Project.hasMany(AsianetSales, {foreignKey: 'projectId'})
    AsianetSales.belongsTo(Project)

    Project.hasMany(Bajaj, {foreignKey: 'projectId'})
    Bajaj.belongsTo(Project)

    Project.hasMany(Vi, {foreignKey: 'projectId'})
    Vi.belongsTo(Project)

    Project.hasMany(ViCollection, {foreignKey: 'projectId'})
    ViCollection.belongsTo(Project)

    User.hasMany(Asianet, {foreignKey: 'Teleby'})
    Asianet.belongsTo(User, {as: 'teleCaller', foreignKey : 'Teleby'})

    User.hasMany(AsianetSales, {foreignKey: 'Teleby'})
    AsianetSales.belongsTo(User, {as: 'teleCaller', foreignKey : 'Teleby'})

    User.hasMany(Bajaj, {foreignKey: 'Teleby'})
    Bajaj.belongsTo(User, {as: 'teleCaller', foreignKey : 'Teleby'})

    User.hasMany(Vi, {foreignKey: 'Teleby'})
    Vi.belongsTo(User, {as: 'teleCaller', foreignKey : 'Teleby'})

    User.hasMany(ViCollection, {foreignKey: 'Teleby'})
    ViCollection.belongsTo(User, {as: 'teleCaller', foreignKey : 'Teleby'})

    Status.hasMany(Asianet, {foreignKey: 'status'})
    Asianet.belongsTo(Status, {as: 'callStatus', foreignKey : 'status'})

    Status.hasMany(AsianetSales, {foreignKey: 'status'})
    AsianetSales.belongsTo(Status, {as: 'callStatus', foreignKey : 'status'})

    Status.hasMany(Bajaj, {foreignKey: 'status'})
    Bajaj.belongsTo(Status, {as: 'callStatus', foreignKey : 'status'})

    Status.hasMany(Vi, {foreignKey: 'status'})
    Vi.belongsTo(Status, {as: 'callStatus', foreignKey : 'status'})

    Status.hasMany(ViCollection, {foreignKey: 'status'})
    ViCollection.belongsTo(Status, {as: 'callStatus', foreignKey : 'status'})

    Status.hasMany(AsianetFollowup, {foreignKey: 'status'})
    AsianetFollowup.belongsTo(Status, {as: 'callStatus', foreignKey : 'status'})

    Status.hasMany(AsianetSalesFollowup, {foreignKey: 'status'})
    AsianetSalesFollowup.belongsTo(Status, {as: 'callStatus', foreignKey : 'status'})

    Status.hasMany(BajajFollowup, {foreignKey: 'status'})
    BajajFollowup.belongsTo(Status, {as: 'callStatus', foreignKey : 'status'})

    Status.hasMany(ViFollowup, {foreignKey: 'status'})
    ViFollowup.belongsTo(Status, {as: 'callStatus', foreignKey : 'status'})

    Status.hasMany(ViCollectionFollowup, {foreignKey: 'status'})
    ViCollectionFollowup.belongsTo(Status, {as: 'callStatus', foreignKey : 'status'})

    Project.hasMany(AsianetFollowup, {foreignKey: 'projectId'})
    AsianetFollowup.belongsTo(Project)

    Project.hasMany(AsianetSalesFollowup, {foreignKey: 'projectId'})
    AsianetSalesFollowup.belongsTo(Project)

    Project.hasMany(BajajFollowup, {foreignKey: 'projectId'})
    BajajFollowup.belongsTo(Project)

    Project.hasMany(ViFollowup, {foreignKey: 'projectId'})
    ViFollowup.belongsTo(Project)

    Project.hasMany(ViCollectionFollowup, {foreignKey: 'projectId'})
    ViCollectionFollowup.belongsTo(Project)

    User.hasMany(AsianetFollowup, {foreignKey: 'Teleby'})
    AsianetFollowup.belongsTo(User, {as: 'caller', foreignKey : 'Teleby'})

    User.hasMany(AsianetSalesFollowup, {foreignKey: 'Teleby'})
    AsianetSalesFollowup.belongsTo(User, {as: 'caller', foreignKey : 'Teleby'})

    User.hasMany(BajajFollowup, {foreignKey: 'Teleby'})
    BajajFollowup.belongsTo(User, {as: 'caller', foreignKey : 'Teleby'})

    User.hasMany(ViFollowup, {foreignKey: 'Teleby'})
    ViFollowup.belongsTo(User, {as: 'caller', foreignKey : 'Teleby'})

    User.hasMany(ViCollectionFollowup, {foreignKey: 'Teleby'})
    ViCollectionFollowup.belongsTo(User, {as: 'caller', foreignKey : 'Teleby'})


    await sequelize.sync({alter : `true`})

    //BULK CREATE
    const role = await Role.findAll({})
    if(role.length === 0){
        Role.bulkCreate([
            {roleName : 'Admin', status: true},
            {roleName : 'Telecaller', status: true}
        ])
    }

    const pass = await bcrypt.hash('admin', 10);

    const user = await User.findAll({})
    if(user.length === 0){
        User.bulkCreate([
            {name: 'Admin',password:pass,roleId:1, employeeNo:'Admin1', phoneNumber: ""},
            {name: 'Jayasree',password:pass,roleId:2, employeeNo:'Jayasree2', phoneNumber: ""},
            {name: 'Keerthi',password:pass,roleId:2, employeeNo:'Keerthi3', phoneNumber: ""},
            {name: 'Haritha',password:pass,roleId:2, employeeNo:'Haritha4', phoneNumber: ""},
            {name: 'Anandhu',password:pass,roleId:2, employeeNo:'Anandhu5', phoneNumber: ""},
            {name: 'Abi',password:pass,roleId:2, employeeNo:'Abi6', phoneNumber: ""},
            {name: 'Anjal',password:pass,roleId:2, employeeNo:'Anjal7', phoneNumber: ""},
            {name: 'Aleeta',password:pass,roleId:2, employeeNo:'Aleeta8', phoneNumber: ""},
            {name: 'Feba',password:pass,roleId:2, employeeNo:'Feba9', phoneNumber: ""},
            {name: 'Rony',password:pass,roleId:2, employeeNo:'Rony10', phoneNumber: ""},
            {name: 'Hari',password:pass,roleId:2, employeeNo:'Hari11', phoneNumber: ""},
            {name: 'Sooraj',password:pass,roleId:2, employeeNo:'Sooraj12', phoneNumber: ""},
            {name: 'Issac',password:pass,roleId:2, employeeNo:'Issac13', phoneNumber: ""},
            {name: 'Haseeja',password:pass,roleId:2, employeeNo:'Haseeja14', phoneNumber: ""},
            {name: 'Sandra',password:pass,roleId:2, employeeNo:'Sandra15', phoneNumber: ""},
            {name: 'Ruby',password:pass,roleId:2, employeeNo:'Ruby16', phoneNumber: ""}
        ])
    }

    const projectType = await ProjectType.findAll({})
    if(projectType.length === 0){
        ProjectType.bulkCreate([
            {typeName: 'Sales'},
            {typeName: 'Support'},
            {typeName: 'Collection'},
        ])
    }

    const project = await Project.findAll({})
    if(project.length === 0){
        Project.bulkCreate([
            {projectName: 'AsianetSales', projectTypeId: 1, clientId:null},
            {projectName: 'ViSales', projectTypeId: 1, clientId:null},
            {projectName: 'AsianetCollections', projectTypeId: 3, clientId:null},
            {projectName: 'ViCollections', projectTypeId: 3, clientId:null},
            {projectName: 'Bajaj', projectTypeId: 2, clientId:null},
        ])
    }

    const status = await Status.findAll({})
    if(status.length === 0){
        Status.bulkCreate([
            {status: 'Not Called'},
            {status: 'Call Back'}
        ])
    }
}

module.exports = syncModel

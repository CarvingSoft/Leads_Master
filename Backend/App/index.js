const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors');
const syncModel = require('../Utils/association');
const sequelize = require('../Utils/db');

require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cors({orgin:'*'}))

syncModel()

// 
const Role = require('../Routers/userRole');
app.use('/role', Role);

const Login = require('../Routers/login');
app.use('/login', Login);

const Register = require('../Routers/register');
app.use('/register', Register);

const Project = require('../Routers/project');
app.use('/project', Project);

const ProjectType = require('../Routers/projectType');
app.use('/projectType', ProjectType);

const Client = require('../Routers/client');
app.use('/client', Client);

const Status = require('../Routers/status');
app.use('/status', Status);

// PROJECT BASE

const Asianet = require('../Routers/asianet_base');
app.use('/asianet', Asianet);

const Bajaj = require('../Routers/bajaj_base');
app.use('/bajaj', Bajaj);

const Vi = require('../Routers/vi_base');
app.use('/vi', Vi);

const AsianetFollow = require('../Routers/asianet_followup');
app.use('/asianetfollowUp', AsianetFollow);

const BajajFollow = require('../Routers/bajaj_followup');
app.use('/bajajfollowUp', BajajFollow);

const ViFollow = require('../Routers/vi_followup');
app.use('/vifollowUp', ViFollow);

const AsianetSales = require('../Routers/asianet_sales_base');
app.use('/asianetsales', AsianetSales);

const ViCollection = require('../Routers/vi_collection');
app.use('/vicollections', ViCollection);

const AsianetSalesFollow = require('../Routers/asianet_sales_followup');
app.use('/asianetsalesfollow', AsianetSalesFollow);

const ViCollectionFollow = require('../Routers/vi_collection_followup');
app.use('/vicollectionsfollow', ViCollectionFollow);

const port = process.env.PORT;
app.listen(8000, () => {
    console.log(`server started on port ${port}`);
})

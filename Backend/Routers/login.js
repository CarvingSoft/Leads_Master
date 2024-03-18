const express = require('express');
const router = express.Router();
const User = require('../Models/user');
const bcrypt = require('bcrypt');
const jwtTokens = require('../Utils/jsonWebTokens');


router.post('/', async(req, res)=> {
    try {
        const { employeeNo, password } = req.body;
        const user = await User.findOne({where: { employeeNo: employeeNo }});

        if(!user){
                return res.status(404).send({ message: 'User not found' });
            }   
           
        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword){
            return res.status(401).send({ message: 'incorrect password' });
        }

        let userToken = {id:user.id, name:user.name, employeeNo: user.employeeNo, role: user.roleId};


        let token = jwtTokens(userToken);


        res.cookie('refreshtoken', token.refreshToken, {httpOnly : true})

        return res.status(200).send({"token" : token, "role": user.roleId, "name" : user.name, "id" : user.id, "employeeNo": user.employeeNo});

    } catch (error) {
        res.send(error);
    }    
})

module.exports = router;
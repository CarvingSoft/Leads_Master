const express = require('express');
const Role = require('../Models/userRole');
const router = express.Router();
const authorization = require('../Middleware/authorization');

router.post('/', authorization, async (req, res) => {
    try {
            const { roleName, status } = req.body;

            const role = new Role({roleName, status});

            await role.save();

            res.send(role);

    } catch (error) {
        res.send(error);
    }
})

router.get('/', authorization, async (req, res) => {

    const role = await Role.findAll({ order:['id']})

    res.send(role);
})

router.get('/:id', authorization, async (req, res) => {

  const role = await Role.findOne({where: {id: req.params.id}})

  res.send(role);
})

router.delete('/:id', authorization, async(req,res)=>{
    try {

        const result = await Role.destroy({
            where: { id: req.params.id },
            force: true,
        });

        if (result === 0) {
            return res.status(404).json({
              status: "fail",
              message: "Role with that ID not found",
            });
          }
      
          res.status(204).json();
        }  catch (error) {
        res.send(error)
    }
    
})

router.patch('/:id', authorization, async(req,res)=>{
    try {
        Role.update(req.body, {
            where: { id: req.params.id }
          })
            .then(num => {
              if (num == 1) {
                res.send({
                  message: "Role was updated successfully."
                });
              } else {
                res.send({
                  message: `Cannot update Role with id=${id}. Maybe Role was not found or req.body is empty!`
                });
              }
            })
      } catch (error) {
        res.status(500).json({
          status: "error",
          message: error.message,
        });
      }
})
module.exports = router;
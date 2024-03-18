const express = require('express');
const Status = require('../Models/status');
const router = express.Router();
const authorization = require('../Middleware/authorization');

router.post('/', authorization, async (req, res) => {
    try {
            const { status } = req.body;

            const result = new Status({ status});

            await result.save();

            res.send(result);

    } catch (error) {
        res.send(error);
    }
})

router.get('/', authorization, async (req, res) => {

    const result = await Status.findAll({ order:['id']})

    res.send(result);
})

router.get('/:id', authorization, async (req, res) => {

  const result = await Status.findOne({where: {id: req.params.id}})

  res.send(result);
})

router.delete('/:id', authorization, async(req,res)=>{
    try {

        const result = await Status.destroy({
            where: { id: req.params.id },
            force: true,
        });

        if (result === 0) {
            return res.status(404).json({
              status: "fail",
              message: "Status with that ID not found",
            });
          }
      
          res.status(204).json();
        }  catch (error) {
        res.send(error)
    }
    
})

router.patch('/:id', authorization, async(req,res)=>{
    try {
        Status.update(req.body, {
            where: { id: req.params.id }
          })
            .then(num => {
              if (num == 1) {
                res.send({
                  message: "Status was updated successfully."
                });
              } else {
                res.send({
                  message: `Cannot update Status with id=${id}. Maybe Status was not found or req.body is empty!`
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
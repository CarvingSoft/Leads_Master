const express = require('express');
const BajajFollowup = require('../Models/bajaj_followup');
const Asianet = require('../Models/asianet_base');
const router = express.Router();
const Project = require('../Models/project');
const authorization = require('../Middleware/authorization');

router.post('/', authorization, async (req, res) => {
    try {
      const { subCode, name, balance, mobile, emi, product, status, remarks, freeText, action, Teleby, projectId, date, time } = req.body;

      const result = new BajajFollowup({subCode, name, balance, mobile, emi, product, status, remarks, freeText, action, Teleby, projectId, date, time, status: 1});

      await result.save();

      res.send(result);

    } catch (error) {
        res.send(error);
    }
})

router.get('/', authorization, async (req, res) => {
  try {
    const status = req.query.status;

    const result = await BajajFollowup.findAll({ 
      where: {status},
      include: [Project, 'caller'],
      order:['id']
    })

    res.send(result);
  } catch (error) {
    res.send(error)
  }

})

router.get('/all', authorization, async (req, res) => {
  try {
    const result = await BajajFollowup.findAll({ 
      include: [Project, 'caller'],
      order:['id']
    })

    res.send(result);
  } catch (error) {
    res.send(error)
  }
})

router.get('/:id', authorization, async (req, res) => {
  try {
    const bajajfollowup = await BajajFollowup.findOne({
      where: {id: req.params.id},
      include: [Project, 'caller']
    })
  
    res.send(bajajfollowup);
  } catch (error) {
    res.send(error)
  }
})

router.delete('/:id', authorization, async(req,res)=>{
    try {

        const result = await BajajFollowup.destroy({
            where: { id: req.params.id },
            force: true,
        });

        if (result === 0) {
            return res.status(404).json({
              status: "fail",
              message: "BajajFollowup with that ID not found",
            });
          }
      
          res.status(204).json();
        }  catch (error) {
        res.send(error)
    }
    
})

router.patch('/:id', authorization, async(req,res)=>{
    try {

      const bajajfollowup = {
        status: req.body.status,
        freeText: req.body.freeText,
        remarks: req.body.remarks,
        action: req.body.action,
        callTime: req.body.callTime
      }

        BajajFollowup.update(bajajfollowup, {
            where: { id: req.params.id }
          })
            .then(num => {
              if (num == 1) {
                res.send({
                  message: "BajajFollowup was updated successfully."
                });
              } else {
                res.send({
                  message: `Cannot update BajajFollowup with id=${id}. Maybe BajajFollowup was not found or req.body is empty!`
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

router.patch('/callback/:id', authorization, async(req,res)=>{
  try {

    const bajaj = {
      date: req.body.date,
      time: req.body.time,
      callTime: req.body.callTime,
      status: req.body.status
    }
      BajajFollowup.update(bajaj, {
          where: { id: req.params.id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Bajaj was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update Bajaj with id=${id}. Maybe Bajaj was not found or req.body is empty!`
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

router.delete('/', authorization, async(req,res)=>{
  try {
      const status = req.query.status;

      const result = await BajajFollowup.destroy({
          where: { status },
          force: true,
      });

      if (result === 0) {
          return res.status(404).json({
            status: "fail",
            message: "Bajaj with that ID not found",
          });
        }
    
        res.status(204).json();
      }  catch (error) {
      res.send(error)
  }
  
})

router.delete('/alldata', authorization, async(req,res)=>{
try {

    const result = await BajajFollowup.destroy({
        where: { },
        force: true,
    });

    if (result === 0) {
        return res.status(404).json({
          status: "fail",
          message: "Bajaj with that ID not found",
        });
      }
  
      res.status(204).json();
    }  catch (error) {
    res.send(error)
}

})

router.get('/caller', authorization, async (req, res) => {
  try {
    const asianet = await BajajFollowup.findAll({ 
      include: [Project, 'teleCaller'],
      order:['id']
    })
  
    res.send(asianet);
  } catch (error) {
    res.send(error)
  }
  
})

router.patch('/bulkupdate/:id', authorization, async (req, res) => {
  try {
    const asianet = {
      teleCallerId: req.body.Teleby,
    }
      BajajFollowup.update(asianet, {
          where: { id: req.params.id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "BajajFollowup was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update BajajFollowup with id=${id}. Maybe BajajFollowup was not found or req.body is empty!`
              });
            }
          })
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.patch('/update/:id', authorization, async(req,res)=>{
  try {
      BajajFollowup.update(req.body, {
          where: { id: req.params.id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "BajajFollowup was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update BajajFollowup with id=${id}. Maybe BajajFollowup was not found or req.body is empty!`
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

router.delete('/:id', authorization, async(req,res)=>{
  try {

      const result = await BajajFollowup.destroy({
          where: { id: req.params.id },
          force: true,
      });

      if (result === 0) {
          return res.status(404).json({
            status: "fail",
            message: "BajajFollowup with that ID not found",
          });
        }
    
        res.status(204).json();
      }  catch (error) {
      res.send(error)
  }
  
})
module.exports = router;
const express = require('express');
const ViFollowup = require('../Models/vi_followup');
const router = express.Router();
const Project = require('../Models/project');
const authorization = require('../Middleware/authorization');

router.post('/', authorization, async (req, res) => {
    try {  
      
          const { mobileNumber, custName, campionName, currentPlan, noOfConnections, pinCode, suggestedPlan, remarks, freeText, action, Teleby, projectId, date, time } = req.body;

          const result = new ViFollowup({mobileNumber, custName, campionName, currentPlan, noOfConnections, pinCode, suggestedPlan, remarks, freeText, action, Teleby, projectId, date, time, status: 1});

          await result.save();

          res.send(result);

        } catch (error) {
            res.send(error);
        }
})

router.get('/', authorization, async (req, res) => {
  try {
    const status = req.query.status;

    const result = await ViFollowup.findAll({ 
      where: {status},
      include: [Project, 'caller', 'callStatus'],
      order:['id']
    })

    res.send(result);
  } catch (error) {
    res.send(error)
  }
})

router.get('/all', authorization, async (req, res) => {
  try {
    const result = await ViFollowup.findAll({ 
      include: [Project, 'caller', 'callStatus'],
      order:['id']
    })

    res.send(result);
  } catch (error) {
    
  }
})

router.get('/:id', authorization, async (req, res) => {
  try {
    const vifollowup = await ViFollowup.findOne({
      include: [Project, 'caller', 'callStatus'],
      where: {id: req.params.id}
    })
  
    res.send(vifollowup);
  } catch (error) {
    res.send(error);
  }
})

router.delete('/:id', authorization, async(req,res)=>{
    try {

        const result = await ViFollowup.destroy({
            where: { id: req.params.id },
            force: true,
        });

        if (result === 0) {
            return res.status(404).json({
              status: "fail",
              message: "ViFollowup with that ID not found",
            });
          }
      
          res.status(204).json();
        }  catch (error) {
        res.send(error)
    }
    
})

router.patch('/:id', authorization, async(req,res)=>{
    try {
      const vifollowup = {
        status: req.body.status,
        freeText: req.body.freeText,
        remarks: req.body.remarks,
        action: req.body.action,
        callTime: req.body.callTime
      }

        ViFollowup.update(vifollowup, {
            where: { id: req.params.id }
          })
            .then(num => {
              if (num == 1) {
                res.send({
                  message: "ViFollowup was updated successfully."
                });
              } else {
                res.send({
                  message: `Cannot update ViFollowup with id=${id}. Maybe ViFollowup was not found or req.body is empty!`
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

    const vi = {
      date: req.body.date,
      time: req.body.time,
      callTime: req.body.callTime,
      status: req.body.status
    }
      ViFollowup.update(vi, {
          where: { id: req.params.id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Vi was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update Vi with id=${id}. Maybe Vi was not found or req.body is empty!`
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
      const result = await ViFollowup.destroy({
          where: { status },
          force: true,
      });

      if (result === 0) {
          return res.status(404).json({
            status: "fail",
            message: "Vi with that ID not found",
          });
        }
    
        res.status(204).json();
      }  catch (error) {
      res.send(error)
  }
  
})

router.delete('/alldata', authorization, async(req,res)=>{
try {

    const result = await ViFollowup.destroy({
        where: {  },
        force: true,
    });

    if (result === 0) {
        return res.status(404).json({
          status: "fail",
          message: "Vi with that ID not found",
        });
      }
  
      res.status(204).json();
    }  catch (error) {
    res.send(error)
}

})

router.get('/caller', authorization, async (req, res) => {
  try {
    const asianet = await ViFollowup.findAll({ 
      include: [Project, 'teleCaller', 'callStatus'],
      order:['id']
    })
  
    res.send(asianet);
  } catch (error) {
    
  }
})

router.patch('/bulkupdate/:id', authorization, async (req, res) => {
  try {
    const asianet = {
      Teleby: req.body.Teleby,
    }
      ViFollowup.update(asianet, {
          where: { id: req.params.id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "ViFollowup was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update ViFollowup with id=${id}. Maybe ViFollowup was not found or req.body is empty!`
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
      ViFollowup.update(req.body, {
          where: { id: req.params.id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "ViFollowup was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update ViFollowup with id=${id}. Maybe ViFollowup was not found or req.body is empty!`
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

      const result = await ViFollowup.destroy({
          where: { id: req.params.id },
          force: true,
      });

      if (result === 0) {
          return res.status(404).json({
            status: "fail",
            message: "ViFollowup with that ID not found",
          });
        }
    
        res.status(204).json();
      }  catch (error) {
      res.send(error)
  }
  
})
module.exports = router;
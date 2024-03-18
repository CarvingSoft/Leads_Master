const express = require('express');
const AsianetFollowup = require('../Models/asianet_followup');
const Project = require('../Models/project');
const User = require('../Models/user');
const router = express.Router();
const authorization = require('../Middleware/authorization');

router.post('/', authorization, async (req, res) => {
    try {
      const { Region, Subcode, Name, Address, Package, Scheme, Phone, Balance, Mobile, Teleby, projectId, date, time } = req.body;

      const result = new AsianetFollowup({Region, Subcode, Name, Address, Package, Scheme, Phone, Balance, Mobile, Teleby, projectId, date, time, status: 1});

      await result.save();

      res.send(result);

    } catch (error) {
        res.send(error);
    }
})

router.get('/', authorization, async (req, res) => {
  try {
    const status = req.query.status;

    const asianet = await AsianetFollowup.findAll({ 
      where: {status},
      include: [Project, 'caller', 'callStatus'],
      order:['id']
    })

    res.send(asianet);
  } catch (error) {
    res.send(error)
  }
})

router.get('/all', authorization, async (req, res) => {
  try {
    const asianet = await AsianetFollowup.findAll({ 
      include: [Project, 'caller', 'callStatus'],
      order:['id']
    })

    res.send(asianet);
  } catch (error) {
    res.send(error);
  }
})

router.get('/:id', authorization, async (req, res) => {
  try {
    const asianetfollowup = await AsianetFollowup.findOne({
      where: {id: req.params.id},
      include: [Project, 'caller', 'callStatus']
    })
  
    res.send(asianetfollowup);
  } catch (error) {
    res.send(error)
  }
  
})

router.delete('/:id', authorization, async(req,res)=>{
    try {
        
        const result = await AsianetFollowup.destroy({
            where: { id: req.params.id },
            force: true,
        });

        if (result === 0) {
            return res.status(404).json({
              status: "fail",
              message: "AsianetFollowup with that ID not found",
            });
          }
      
          res.status(204).json();
        }  catch (error) {
        res.send(error)
    }
    
})

router.patch('/:id', authorization, async(req,res)=>{
    try {

      const asianetfollowup = {
        status: req.body.status,
        freeText: req.body.freeText,
        remarks: req.body.remarks,
        action: req.body.action,
        callTime: req.body.callTime
      }
        AsianetFollowup.update(asianetfollowup, {
            where: { id: req.params.id }
          })
            .then(num => {
              if (num == 1) {
                res.send({
                  message: "AsianetFollowup was updated successfully."
                });
              } else {
                res.send({
                  message: `Cannot update AsianetFollowup with id=${id}. Maybe AsianetFollowup was not found or req.body is empty!`
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

    const asianet = {
      date: req.body.date,
      time: req.body.time,
      callTime: req.body.callTime,
      status: req.body.status
    }
      AsianetFollowup.update(asianet, {
          where: { id: req.params.id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Asianet was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update Asianet with id=${id}. Maybe Asianet was not found or req.body is empty!`
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
      
      const result = await AsianetFollowup.destroy({
          where: { status },
          force: true,
      });

      if (result === 0) {
          return res.status(404).json({
            status: "fail",
            message: "Asianet with that ID not found",
          });
        }
    
        res.status(204).json();
      }  catch (error) {
      res.send(error)
  }
  
})

router.delete('/alldata', authorization, async(req,res)=>{
try {

    const result = await AsianetFollowup.destroy({
        where: { },
        force: true,
    });

    if (result === 0) {
        return res.status(404).json({
          status: "fail",
          message: "Asianet with that ID not found",
        });
      }
  
      res.status(204).json();
    }  catch (error) {
    res.send(error)
}

})


router.get('/caller', authorization, async (req, res) => {
  try {
    const asianet = await AsianetFollowup.findAll({ 
      include: [
        {
          model: Project, // Include the Project model
          as: 'project', // Use the alias if you have defined one in your associations
        },
        {
          model: User, // Include the TeleCaller model
          as: 'caller', // Use the alias if you have defined one in your associations
        },'callStatus'
      ],
      order: [['id', 'ASC']], // Correct the order syntax
    });

    res.send(asianet);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error'); // Handle errors gracefully
  }
});

router.patch('/bulkupdate/:id', authorization, async (req, res) => {
  try {
    const asianet = {
      Teleby: req.body.Teleby,
    }
      AsianetFollowup.update(asianet, {
          where: { id: req.params.id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "AsianetFollowup was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update AsianetFollowup with id=${id}. Maybe AsianetFollowup was not found or req.body is empty!`
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
      AsianetFollowup.update(req.body, {
          where: { id: req.params.id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "AsianetFollowup was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update AsianetFollowup with id=${id}. Maybe AsianetFollowup was not found or req.body is empty!`
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

      const result = await AsianetFollowup.destroy({
          where: { id: req.params.id },
          force: true,
      });

      if (result === 0) {
          return res.status(404).json({
            status: "fail",
            message: "AsianetFollowup with that ID not found",
          });
        }
    
        res.status(204).json();
      }  catch (error) {
      res.send(error)
  }
  
})

module.exports = router;
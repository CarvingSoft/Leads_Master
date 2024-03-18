const express = require('express');
const ViCollectionFollowup = require('../Models/vi_collection_followup');
const Project = require('../Models/project');
const router = express.Router();
const authorization = require('../Middleware/authorization');

router.post('/', authorization, async (req, res) => {
    try {
      const { Region, Subcode, Name, Address, Package, Scheme, Phone, Balance, Mobile, Teleby, projectId, date, time } = req.body;

      const result = new ViCollectionFollowup({Region, Subcode, Name, Address, Package, Scheme, Phone, Balance, Mobile, Teleby, projectId, date, time, status: 1});

      await result.save();

      res.send(result);

    } catch (error) {
        res.send(error);
    }
})

router.get('/', authorization, async (req, res) => {
  try {
    const status = req.query.status;

    const result = await ViCollectionFollowup.findAll({ 
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
    const result = await ViCollectionFollowup.findAll({ 
      include: [Project, 'caller', 'callStatus'],
      order:['id']
    })

    res.send(result);
  } catch (error) {
    res.send(error)
  }
})


router.get('/:id', authorization, async (req, res) => {
  try {
    const vicollectionfollowup = await ViCollectionFollowup.findOne({
      where: {id: req.params.id},
      include: [Project, 'caller', 'callStatus']
    })
  
    res.send(vicollectionfollowup);
  } catch (error) {
    res.send(error);
  }
})

router.delete('/:id', authorization, async(req,res)=>{
    try {

        const result = await ViCollectionFollowup.destroy({
            where: { id: req.params.id },
            force: true,
        });

        if (result === 0) {
            return res.status(404).json({
              status: "fail",
              message: "ViCollectionFollowup with that ID not found",
            });
          }
      
          res.status(204).json();
        }  catch (error) {
        res.send(error)
    }
    
})

router.patch('/:id', authorization, async(req,res)=>{
    try {

      const vicollectionfollowup = {
        status: req.body.status,
        freeText: req.body.freeText,
        remarks: req.body.remarks,
        action: req.body.action,
        callTime: req.body.callTime
      }
        ViCollectionFollowup.update(vicollectionfollowup, {
            where: { id: req.params.id }
          })
            .then(num => {
              if (num == 1) {
                res.send({
                  message: "ViCollectionFollowup was updated successfully."
                });
              } else {
                res.send({
                  message: `Cannot update ViCollectionFollowup with id=${id}. Maybe ViCollectionFollowup was not found or req.body is empty!`
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

    const vicollection = {
      date: req.body.date,
      time: req.body.time,
      callTime: req.body.callTime,
      status: req.body.status
    }
      ViCollectionFollowup.update(vicollection, {
          where: { id: req.params.id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "ViCollection was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update ViCollection with id=${id}. Maybe ViCollection was not found or req.body is empty!`
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
      const result = await ViCollectionFollowup.destroy({
          where: { status },
          force: true,
      });

      if (result === 0) {
          return res.status(404).json({
            status: "fail",
            message: "ViCollection with that ID not found",
          });
        }
    
        res.status(204).json();
      }  catch (error) {
      res.send(error)
  }
  
})

router.delete('/alldata', authorization, async(req,res)=>{
try {

    const result = await ViCollectionFollowup.destroy({
        where: { },
        force: true,
    });

    if (result === 0) {
        return res.status(404).json({
          status: "fail",
          message: "ViCollection with that ID not found",
        });
      }
  
      res.status(204).json();
    }  catch (error) {
    res.send(error)
}

})

router.get('/caller', authorization, async (req, res) => {
  try {
    const asianet = await ViCollectionFollowup.findAll({ 
      include: [Project, 'teleCaller', 'callStatus'],
      order:['id']
    })
  
    res.send(asianet);
  } catch (error) {
    res.send(error);
  }
  
})

router.patch('/bulkupdate/:id', authorization, async (req, res) => {
  try {
    const asianet = {
      Teleby: req.body.Teleby,
    }
      ViCollectionFollowup.update(asianet, {
          where: { id: req.params.id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "ViCollectionFollowup was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update ViCollectionFollowup with id=${id}. Maybe ViCollectionFollowup was not found or req.body is empty!`
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
      ViCollectionFollowup.update(req.body, {
          where: { id: req.params.id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "ViCollectionFollowup was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update ViCollectionFollowup with id=${id}. Maybe ViCollectionFollowup was not found or req.body is empty!`
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

      const result = await ViCollectionFollowup.destroy({
          where: { id: req.params.id },
          force: true,
      });

      if (result === 0) {
          return res.status(404).json({
            status: "fail",
            message: "ViCollectionFollowup with that ID not found",
          });
        }
    
        res.status(204).json();
      }  catch (error) {
      res.send(error)
  }
  
})
module.exports = router;
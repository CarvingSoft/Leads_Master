const express = require('express');
const ViCollection = require('../Models/vi_collection');
const Project = require('../Models/project');
const router = express.Router();
const multer = require('../Utils/multer');
const excelToJson = require('convert-excel-to-json');
const fs = require('fs-extra');
const authorization = require('../Middleware/authorization');

router.post('/', multer.single('imageUrl'), authorization, async (req, res) => {
    try {
      const imageUrl = req.file ? req.file.path : null;

      if(imageUrl != null){
          const filePath = 'uploads/' + req.file.filename;

          const excelData = excelToJson({
              sourceFile: filePath,
              header: {
                  rows: 1
              },
              columnToKey: {
                  "*": "{{columnHeader}}"
              }
          });
      
          fs.remove(filePath);

          const jsonWithoutSheetName = excelData.Base;

          const projectId = req.body.projectId;
          for(let i = 0; i < jsonWithoutSheetName.length; i++){
            jsonWithoutSheetName[i].projectId = projectId;
            jsonWithoutSheetName[i].status = 1
          }

          const vicollection = await ViCollection.bulkCreate(jsonWithoutSheetName)

          res.send(vicollection);
      }

    } catch (error) {
        res.send(error);
    }
})

router.get('/', authorization, async (req, res) => {
  try {
    const status = req.query.status;

    const vicollection = await ViCollection.findAll({ 
      where: {status},
      include: [Project, 'teleCaller', 'callStatus'],
      order:['id']
    })

    res.send(vicollection);
  } catch (error) {
    res.send(error)
  }
  
})

router.get('/all', authorization, async (req, res) => {
  try {
    const vicollection = await ViCollection.findAll({ 
      include: [Project, 'teleCaller', 'callStatus'],
      order:['id']
    })

    res.send(vicollection);
  } catch (error) {
    res.send(error)
  }
})

router.get('/:id', authorization, async (req, res) => {
  try {
    const vicollection = await ViCollection.findOne({
      where: {id: req.params.id},
      include: [Project, 'teleCaller', 'callStatus']
    })
  
    res.send(vicollection);
  } catch (error) {
    res.send(error);
  }
})

router.delete('/', authorization, async(req,res)=>{
    try {
        const status = req.query.status;

        const result = await ViCollection.destroy({
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

      const result = await ViCollection.destroy({
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

router.patch('/:id', authorization, async(req,res)=>{
    try {

      const vicollection = {
        status: req.body.status,
        freeText: req.body.freeText,
        remarks: req.body.remarks,
        action: req.body.action,
        callTime: req.body.callTime
      }
        ViCollection.update(vicollection, {
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

router.patch('/callback/:id', authorization, async(req,res)=>{
  try {

    const vicollection = {
      date: req.body.date,
      time: req.body.time,
      callTime: req.body.callTime,
      status: req.body.status
    }
      ViCollection.update(vicollection, {
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

router.get('/caller', authorization, async (req, res) => {
  try {
    const asianet = await ViCollection.findAll({ 
      include: [Project, 'teleCaller', 'callStatus'],
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
      Teleby: req.body.Teleby,
    }
      ViCollection.update(asianet, {
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
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.patch('/update/:id', authorization, async(req,res)=>{
  try {
      ViCollection.update(req.body, {
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

router.delete('/:id', authorization, async(req,res)=>{
  try {

      const result = await ViCollection.destroy({
          where: { id: req.params.id },
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
module.exports = router;
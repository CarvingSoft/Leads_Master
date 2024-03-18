const express = require('express');
const Bajaj = require('../Models/bajaj_base');
const Asianet = require('../Models/asianet_base');
const router = express.Router();
const Project = require('../Models/project');
const authorization = require('../Middleware/authorization');

router.post('/', authorization, async (req, res) => {
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


          const bajaj = await Bajaj.bulkCreate(jsonWithoutSheetName)

          res.send(bajaj);
      }

    } catch (error) {
        res.send(error);
    }
})

router.get('/', authorization, async (req, res) => {
  try {
    const status = req.query.status;

    const bajaj = await Bajaj.findAll({ 
      where: { status },
      include: [Project, 'teleCaller'],
      order:['id']
    })

    res.send(bajaj);
  } catch (error) {
    res.send(error)
  }
})

router.get('/all', authorization, async (req, res) => {
  try {
    const bajaj = await Bajaj.findAll({ 
      include: [Project, 'teleCaller'],
      order:['id']
    })

    res.send(bajaj);
  } catch (error) {
    res.send(error)
  }
})

router.get('/:id', authorization, async (req, res) => {
  try {
    const bajaj = await Bajaj.findOne({where: {id: req.params.id}})

    res.send(bajaj);
  } catch (error) {
    res.send(error)
  }
  
})

router.delete('/', authorization, async(req,res)=>{
    try {
        const status = req.query.status;
        const result = await Bajaj.destroy({
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

      const result = await Bajaj.destroy({
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

router.patch('/:id', authorization, async(req,res)=>{
    try {

      const bajaj = {
        status: req.body.status,
        freeText: req.body.freeText,
        remarks: req.body.remarks,
        action: req.body.action
      }

        Bajaj.update(bajaj, {
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

router.patch('/followup/:id', authorization, async(req,res)=>{
  try {

    const bajaj = {
      date: req.body.date,
      time: req.body.time,
      callTime: req.body.callTime,
      status: req.body.status
    }

      Bajaj.update(bajaj, {
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

router.get('/caller', authorization, async (req, res) => {

  const asianet = await Bajaj.findAll({ 
    include: [Project, 'teleCaller'],
    order:['id']
  })

  res.send(asianet);
})

router.patch('/bulkupdate/:id', authorization, async (req, res) => {
  try {
    const asianet = {
      teleCallerId: req.body.Teleby,
    }
      Bajaj.update(asianet, {
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
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.patch('/update/:id', authorization, async(req,res)=>{
  try {
      Bajaj.update(req.body, {
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

router.delete('/:id', authorization, async(req,res)=>{
  try {

      const result = await Bajaj.destroy({
          where: { id: req.params.id },
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
module.exports = router;
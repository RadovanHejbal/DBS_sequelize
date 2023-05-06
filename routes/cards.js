const express = require('express');
const router = express.Router();

const Card = require('../models/card');

router.get('/:id', (req, res) => {
    Card.findByPk(req.params.id).then(response => {
        if(!response) {
            res.status(404).json('Not Found');
            return;
        }
        res.status(200).json(response);
    }).catch(err => {
        res.status(410);
    })
})

router.post('/', (req, res) => {
    const id = req.body.id;
    const magstripe = req.body.magstripe;
    const status = req.body.status;
    const userId = req.body.user_id;

    const cardObject = {
        magstripe,
        status,
        user_id: userId
    }

    if(id) {
        cardObject.id = id;
    }

    Card.create(cardObject).then(response => {
        res.status(201).json(response.dataValues);
    }).catch(err => {
        res.status(410).json(err);
    })
})

router.delete('/:id', (req, res) => {
    Card.destroy({
        where: {
          id: req.params.id
        }
      }).then(numRowsDeleted => {
        if(numRowsDeleted === 0) {
          res.status(404).json('Not Found');
          return;
        }
        res.status(204).json('Card deleted successfully');
      }).catch(err => {
        res.status(500).json('Something went wrong');
      });
})

router.patch('/:id', (req, res) => {
    Card.update(req.body, {where: {id: req.params.id}, returning: true}).then(([numRowsUpdated, [updatedRow]]) => {
        if(numRowsUpdated == 0) {
            res.status(404).json('Not Found');
            return;
        }
        res.status(200).json(updatedRow);
    }).catch(err => {
        res.status(400).send();
    })
})

module.exports = router;
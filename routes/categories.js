const express = require('express');
const router = express.Router();

// doplnit: existuje uz? ked ano vratit res.status(409).json('Conflict');

const Category = require('../models/category');
const PublicationCategory = require('../models/publicationcategory');

router.get('/:id', (req, res) => {
    Category.findByPk(req.params.id).then(response => {
        if(!response) {
            res.status(404).json('Not Found');
            return;
        }
        res.status(200).json(response);
    }).catch(err => {
        res.status(500).json('');
    })
})

router.delete('/:id', (req, res) => {
    Category.destroy({
        where: {
          id: req.params.id
        },
        include: [
          {
            model: PublicationCategory,
            as: 'authors'
          },
        ]
      }).then(numRowsDeleted => {
        if(numRowsDeleted === 0) {
          res.status(404).json('Not Found');
          return;
        }
        res.status(204).send();
      }).catch(err => {
        res.status(500).json('Something went wrong');
      });
})

router.post('/', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;

    const categoryObject = {
        name
    }

    if(id) {
        categoryObject.id = id;
    }

    Category.create(categoryObject).then(response => {
        res.status(201).json(response.dataValues);
    }).catch(err => {
        res.status(400).json('Bad request');
    })
})

router.patch('/:id', (req, res) => {
    Category.update(req.body, {where: {id: req.params.id}, returning: true}).then(([numRowsUpdated, [updatedRow]]) => {
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
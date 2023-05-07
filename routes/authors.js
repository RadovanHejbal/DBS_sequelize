const express = require('express');
const router = express.Router();

// doplnit: existuje uz? ked ano vratit res.status(409).json('Conflict');

const Author = require('../models/author');
const PublicationAuthor = require('../models/publicationauthor');

router.get('/:id', (req, res) => {
    Author.findByPk(req.params.id).then(response => {
        if(!response) {
            res.status(404).json('Not Found');
            return;
        }
        res.status(200).json(response);
    }).catch(err => {
        res.status(404).json('Not Found');
    })
})

router.post('/', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const surname = req.body.surname;

    const authorObject = {
        name, surname
    }

    if(id) {
        authorObject.id = id;
    }

    Author.create(authorObject).then(response => {
        res.status(201).json(response.dataValues);
    }).catch(err => {
        res.status(400).json('Bad request');
    })
})

router.delete('/:id', (req, res) => {
    Author.destroy({
        where: {
          id: req.params.id
        },
        include: [
          {
            model: PublicationAuthor,
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
        res.status(404).json('Not Found');
      });
})

router.patch('/:id', (req, res) => {
    Author.update(req.body, {where: {id: req.params.id}, returning: true}).then(([numRowsUpdated, [updatedRow]]) => {
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
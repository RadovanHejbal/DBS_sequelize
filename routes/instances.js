const express = require('express');
const router = express.Router();

const Book = require('../models/book');

router.post('/', (req, res) => {
    const { id, type, publisher, year, status, publication_id } = req.body;

    Book.create({
        id, type, publisher, year, status, publication_id
    }).then(response => {
        res.status(201).json(response);
    }).catch(err => {
        res.status(400);
    })
})

router.get('/:id', (req, res) => {
    Book.findByPk(req.params.id).then(response => {
        if(!response) {
            res.status(404).json("Not Found");
        }
        res.status(200).json(response);
    }).catch(err => {
        res.status(404).json('');
    })
})

router.delete('/:id', (req, res) => {
    Book.destroy({
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
        res.status(404).json('Not Found');
      });
})

router.patch('/:id', (req, res) => {
    const bookObject = req.body;
    if(bookObject.publication_id) {
        bookObject.publicationId = bookObject.publication_id;
        bookObject.publication_id = null;
    }
    Book.update(bookObject, {where: {id: req.params.id}, returning: true}).then(([numRowsUpdated, [updatedRow]]) => {
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
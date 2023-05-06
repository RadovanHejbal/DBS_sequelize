const express = require('express');
const router = express.Router();

const Reservation = require('../models/reservation');

router.get('/:id', (req, res) => {
    Reservation.findByPk(req.params.id).then(response => {
        if(!response) {
            res.status(404).json('Not Found');
            return;
        }
        res.status(200).json(response);
    }).catch(err => {
        res.status(500).json('');
    })
})

router.post('/', (req, res) => {
    const { user_id, publication_id, id } = req.body;

    Reservation.create({userId: user_id, publicationId: publication_id, id: id}).then(response => {
        res.status(201).json(response);
    }).catch(err => {
        res.status(400);
    })
})

router.delete('/:id', (req, res) => {
    Reservation.destroy({
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

module.exports = router;
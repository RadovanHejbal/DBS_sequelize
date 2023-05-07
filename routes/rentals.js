const express = require('express');
const router = express.Router();

const Rental = require('../models/rental');
const Book = require('../models/book');

router.get('/:id', (req, res) => {
    Rental.findByPk(req.params.id).then(response => {
        if(!response) {
            res.status(404).json('Not Found');
            return;
        }
        res.status(200).json(response);
    }).catch(err => {
        res.status(404).json('');
    })
})

router.post('/', (req, res) => {
    const { user_id, publication_id, duration, id } = req.body;

    Book.findOne({
        where: {
            publication_id: publication_id,
            status: 'available'
        }
    }).then(response => {
        if(!response) {
            res.status(400).json('No available');
            return;
        }
        const date = new Date();
        Rental.create({
            id: id,
            publication_instance_id: response.dataValues.id,
            user_id: user_id,
            duration: duration,
            status: "active",
            start_date: date,
            end_date: new Date(date.getTime() + duration * 86400000)
        }).then(response => {
            res.status(201).json(response);
        }).catch(err => {
            console.log(err);
            res.status(400).json('');
        })
    }).catch(err => {
        res.status(404).json('Something went wrong');
    })
})

router.patch('/:id', (req, res) => {
    
    Rental.update(req.body, {where: {id: req.params.id}, returning: true}).then(([numRowsUpdated, [updatedRow]]) => {
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
const express = require("express");
const router = express.Router();

const User = require("../models/user");
const Rental = require("../models/rental");
const Reservation = require("../models/reservation");

router.get("/:id", (req, res) => {
  User.findByPk(req.params.id, {
    include: [
      { model: Rental, as: "rentals" },
      { model: Reservation, as: "reservations" },
    ],
  })
    .then((response) => {
      if (!response) {
        res.status(404).json("Not Found");
        return;
      }
      const { categories, authors, ...user } = response;
      const result = { user };
      if (categories) {
        result.categories = categories;
      }
      if (authors) {
        result.authors = authors;
      }
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json("Something went wrong");
    });
});

router.post("/", (req, res) => {
  const name = req.body.name;
  const surname = req.body.surname;
  const email = req.body.email;
  const birth_date = req.body.birth_date;
  const personal_identificator = req.body.personal_identificator;
  const id = req.body.id;

  if (!name || !surname || !email || !birth_date || !personal_identificator) {
    res.status(400).json("Missing Required Information");
    return;
  }

  const userObject = {
    name: name,
    surname: surname,
    email: email,
    birth_date: birth_date,
    personal_identificator: personal_identificator,
  };

  if (id) {
    userObject.id = id;
  }

  User.create(userObject)
    .then((response) => {
      res.status(201).json(response.dataValues);
    })
    .catch((err) => {
      res.status(409).json("Email Already Taken");
    });
});

router.patch("/:id", (req, res) => {
  User.update(req.body, { where: { id: req.params.id } })
    .then(([numRowsUpdated, [updatedRow]]) => {
      if (numRowsUpdated == 0) {
        res.status(404).json("User Not Found");
        return;
      }
      res.status(200).json(updatedRow);
    })
    .catch((err) => {
      console.log(err);
      res.status(409).json("Email Already Taken");
    });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const sequelize = require('../database');

const Publication = require("../models/publication");
const Author = require("../models/author");
const Category = require("../models/category");
const PublicationAuthor = require("../models/publicationauthor");
const PublicationCategory = require("../models/publicationcategory");
const Book = require("../models/book");
const Reservation = require("../models/reservation");

router.get("/:id", (req, res) => {
  Publication.findByPk(req.params.id, {
    include: [
      { model: Author, as: "authors" },
      { model: Category, as: "categories" },
    ],
  })
    .then((response) => {
      if (!response) {
        res.status(404).json("Not Found");
        return;
      }
      const categories = response.categories.map((category) => category.name);
      const authors = response.authors.map((author) => {
        return {
          id: author.id,
          name: author.name,
          surname: author.surname,
          created_at: author.createdAt,
          updated_at: author.updatedAt,
        };
      });
      response.dataValues.categories = categories;
      response.dataValues.authors = authors;
      res.status(200).json(response.dataValues);
    })
    .catch((err) => {
      res.status(404).json("Something went wrong");
    });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await sequelize.transaction(async (t) => {
      await PublicationAuthor.destroy({
        where: {
          publicationId: id,
        },
        transaction: t,
      });

      await PublicationCategory.destroy({
        where: {
          publicationId: id,
        },
        transaction: t,
      });

      await Book.destroy({
        where: {
          publicationId: id,
        },
        transaction: t,
      });

      await Reservation.destroy({
        where: {
          publicationId: id,
        },
        transaction: t,
      });

      const rowsDeleted = await Publication.destroy({
        where: {
          id,
        },
        transaction: t,
      });

      if (rowsDeleted === 0) {
        res.status(404).json("Not Found");
        return;
      }

      res.status(204).send();
    });
  } catch (err) {
    console.log(err);
    res.status(404).json("Something went wrong");
  }
});

router.post("/", async (req, res) => {
  const { id, title, authors, categories } = req.body;

  for (const authorsData of authors) {
    const author = await Author.findOne({
      where: {
        name: authorsData.name,
        surname: authorsData.surname,
      },
    });

    if (!author) {
      res.status(410).json("Author doesnt exist");
      res.end();
      return;
    }
  }

  for (const categoryData of categories) {
    const category = await Category.findOne({
      where: {
        name: categoryData,
      },
    });

    if (!category) {
      res.status(410).json("Category doesnt exist");
      res.end();
      return;
    }
  }

  const publicationObject = {
    title,
  };

  if (id) {
    publicationObject.id = id;
  }

  Publication.create(publicationObject)
    .then(async (response) => {
      for (const authorsData of authors) {
        Author.findOne({
          where: {
            name: authorsData.name,
            surname: authorsData.surname,
          },
        }).then(async (author) => {
          await response.addAuthor(author);
        });
      }

      for (const categoryData of categories) {
        Category.findOne({
          where: {
            name: categoryData,
          },
        }).then(async (category) => {
          await response.addCategory(category);
        });
      }

      res.status(201).json({ ...response.dataValues, categories, authors });
    })
    .catch((err) => {
      res.status(409).json("fail");
    });
});

router.patch('/:id', async (req, res) => {
    try {
      const publication = await Publication.findByPk(req.params.id, {
        include: [
          { model: PublicationAuthor, as: 'authors' },
          { model: PublicationCategory, as: 'categories' }
        ]
      });
  
      if (!publication) {
        res.status(404).json('Not Found');
        return;
      }
  
      if (req.body.title) {
        publication.title = req.body.title;
        await publication.save();
      }
  
      if (req.body.authors) {
        const authorIds = req.body.authors.map(author => author.id);
        await publication.setAuthors(authorIds);
      }
  
      if (req.body.categories) {
        const categoryIds = req.body.categories.map(category => category.id);
        await publication.setCategories(categoryIds);
      }
  
      res.status(200).json(publication);
    } catch (err) {
      res.status(400).send();
    }
  });

module.exports = router;

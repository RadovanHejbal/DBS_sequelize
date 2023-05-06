const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./database');
const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(express.json());

const User = require('./models/user');
const Publication = require('./models/publication');
const Reservation = require('./models/reservation');
const Rental = require('./models/rental');
const Card = require('./models/card');
const Book = require('./models/book');
const Author = require('./models/author');
const Category = require('./models/category');
const PublicationAuthor = require('./models/publicationauthor');
const PublicationCategory = require('./models/publicationcategory');
const Review = require('./models/review');
const Fine = require('./models/fine');
const UsersList = require('./models/userslist');
const ListCategory = require('./models/listcategory');

// using routers from different folders
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const cardsRouter = require('./routes/cards');
app.use('/cards', cardsRouter);

const authorsRouter = require('./routes/authors');
app.use('/authors', authorsRouter);

const categoriesRouter = require('./routes/categories');
app.use('/categories', categoriesRouter);

const publicationRouter = require('./routes/publications');
app.use('/publications', publicationRouter);

const instancesRouter = require('./routes/instances');
app.use('/instances', instancesRouter);

const rentalsRouter = require('./routes/rentals');
app.use('/rentals', rentalsRouter);

const reservationsRouter = require('./routes/reservations');
app.use('/reservations', reservationsRouter);

/* RELATIONS */

//users
User.hasMany(Reservation);
User.hasMany(Rental);
Reservation.belongsTo(User);
Rental.belongsTo(User);
Card.belongsTo(User);

//publications
Author.belongsToMany(Publication, { through: PublicationAuthor });
Publication.belongsToMany(Author, { through: PublicationAuthor });
Category.belongsToMany(Publication, { through: PublicationCategory });
Publication.belongsToMany(Category, { through: PublicationCategory });
Book.belongsTo(Publication, {
  foreignKey: {
    onDelete: 'CASCADE'
  }
});

Book.hasMany(Rental);
Publication.hasMany(Reservation);

// fines, wishlist, reviews
Fine.belongsTo(Rental);
Review.belongsTo(User);
Publication.hasMany(Review);
UsersList.belongsTo(ListCategory);
User.hasMany(UsersList);
UsersList.belongsTo(Publication);


sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
    return sequelize.sync();
  })
  .then(() => {
    console.log('All models were synchronized successfully.');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}.`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
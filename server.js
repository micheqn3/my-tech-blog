// Import dependencies
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Import routes/helpers/connection
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

// Set up express app
const app = express();
const PORT = process.env.PORT || 3001;

// Set up sessions
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

// Sets up handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Sets up data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serves static files and uses routes
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

// Syncs sequelize
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});



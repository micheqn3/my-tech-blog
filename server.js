// Import dependencies
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');

// Import routes/models
const routes = require('./controllers');
const models = require('./models')

// Initializes Sequelize with session store
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Sets up express app
const app = express();
const PORT = process.env.PORT || 3001;
app.use(routes);

// Sets up session and connect to our Sequelize db
const sess = {
  secret: 'secret here',
  // Tells our session to use default cookies
  cookie: {},
  resave: false,
  saveUninitialized: true,
  // Sets up session store with sequelize db
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess)); 

// Sets up handlebars 
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Sets up data parsing 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serves static files
app.use(express.static(path.join(__dirname, 'public')));


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

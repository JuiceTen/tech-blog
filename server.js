const express = require('express');
const session = require('express-session');
const exphbrs = require('express-handlebars');
const routes = require('./controllers');
const path = require('path');
const helpers = require('./utils/helpers')

require('dotenv').config();

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const hbs = exphbrs.create({ helpers })
const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: process.env.DBSECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });
  
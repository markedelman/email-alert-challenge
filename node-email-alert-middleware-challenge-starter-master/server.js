'use strict';

const express = require('express');
const morgan = require('morgan');

const {logger} = require('./utilities/logger');
// these are custom errors we've created
const {FooError, BarError, BizzError} = require('./errors');

const {mailalert}=require('./middleware/mailalert');

const app = express();

// this route handler randomly throws one of `FooError`,
const russianRoulette = (req, res) => {
  const errors = [FooError, BarError, BizzError];
  throw new errors[
    Math.floor(Math.random() * errors.length)]('It blew up!');
};



app.use(morgan('common', {stream: logger.stream}));

// for any GET request, we'll run our `russianRoulette` function
app.get('*', russianRoulette);

// YOUR MIDDLEWARE FUNCTION should be activated here using
// `app.use()`. It needs to come BEFORE the `app.use` call
// below, which sends a 500 and error message to the client

app.use(mailalert([FooError]));




const listener = app.listen(process.env.PORT, function () {
  logger.info('Your app is listening on port ' + listener.address().port);
});

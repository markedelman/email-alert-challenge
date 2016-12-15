// const data = {
//     'FromEmail': 'veronica@email.com',
//     'FromName': 'SERVICE ALERTS',
//     'Subject': 'ALERT: a FooError occurred',
//     'Text-part': 'Something  wrong!!',
//     'Recipients': [{'Email': 'roger@smith.com'}]
// };

// const {error} = require('./errors.js');
// const {sendEmail} = require('./emailer.js');

// if(error.FooError()=== true ){
//   console.log(data + 'Data for mail to be sent');
//   sendEmail(data);
// }

'use strict';

const {sendEmail} = require('./../emailer');

//FooError, BarError, BizzError
const mailalert = (errors) => (err, req, res, next) => {
  if ( err.stack.includes("FooError") || err.stack.includes("BarError")) {
    const data = {
      'FromEmail': 'markedelman1987@gmail.com',
      'FromName': 'test100',
      'Subject': `SERVICE ALERT: ${err.name}`,
      'Text-part': `Error occurred: ${err.message}\n\n${err.stack}`,
      'Recipients': [{'Email': 'markedelman1987@gmail.com'}]
    };
    sendEmail(data);
  }
  next(err);
};

module.exports = {mailalert};
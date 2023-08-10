const express = require('express');
const router = express.Router();

const{getemployees,getemployee,postemployee,updemployee,delemployee} = require('../controller/empcontroler');

// get method/ fetching all the data fro the database.
router.route('/').get(getemployees);

// get method/ fetching a particular data from data base.
router.route('/:id').get(getemployee);

// post method/ creating and employee.
router.route('/').post(postemployee);

// update method/ updating an existing data.
router.route('/:id').put(updemployee);

// delete method / delete an existing data.
router.route('/:id').delete(delemployee);

module.exports = router;
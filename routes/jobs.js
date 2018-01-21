const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

let router = express.Router();

let { Job } = require('../model/job');

router.get('/jobs', (req, res) => {
  let body = _.pick(req.query, ['skills', 'page']);

  Job.find(body)
    .then((jobs) => res.send(jobs))
    .catch((e) => res.status(400).send(e));
});

module.exports = router;

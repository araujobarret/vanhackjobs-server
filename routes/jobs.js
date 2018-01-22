const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

let router = express.Router();

let { Job } = require('../model/job');

router.post('/jobs', (req, res) => {
  let body = _.pick(req.body, ['location.country', 'location.city']);
  let bodyArray = _.pick(req.body, ['skills']);
  let page = _.pick(req.body, ['page']);
  let paramsSkills = {};

  if(bodyArray.skills) {
    body["skills"] = {
      $in: bodyArray.skills
    }
  }

  Job.find(body)
    .skip(page.page*5)
    .limit(5)
    .sort({date: -1})
    .then((jobs) => res.send(jobs))
    .catch((e) => res.status(400).send(e));

});

// Get all skills without duplicity from each document for query fields
router.get('/jobsskills', (req, res) => {
  Job.aggregate([
    { "$unwind": "$skills" },
    { "$group": { "_id": "$skills" }}
  ]).sort({_id: 1})
    .then((jobs) => res.send(jobs))
    .catch((e) => res.status(400).send(e));
});

router.get('/jobscountries', (req, res) => {
  Job.aggregate([
    { "$unwind": "$location.country" },
    { "$group": { "_id": "$location.country" }}
  ]).sort({_id: 1})
    .then((jobs) => res.send(jobs))
    .catch((e) => res.status(400).send(e));
});

router.get('/jobscities', (req, res) => {
  let body = _.pick(req.query, ['country']);

  Job.aggregate([
    { "$match": {"location.country": body.country}},
    { "$unwind": "$location.city" },
    { "$group": { "_id": "$location.city" }}
  ]).sort({_id: 1})
    .then((jobs) => res.send(jobs))
    .catch((e) => res.status(400).send(e));
});

module.exports = router;

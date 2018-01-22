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
  // Check if the page is passed, if not goes to page 0
  let pageValue = page.page ? page.page : 0;
  let paramsSkills = {};

  // Check if the skills are present to filter
  if(bodyArray.skills) {
    body["skills"] = {
      $in: bodyArray.skills
    }
  }

  // Does the query skiping data if page is setted
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

// Get all countries without duplicity from each document for query fields
router.get('/jobscountries', (req, res) => {
  Job.aggregate([
    { "$unwind": "$location.country" },
    { "$group": { "_id": "$location.country" }}
  ]).sort({_id: 1})
    .then((jobs) => res.send(jobs))
    .catch((e) => res.status(400).send(e));
});

// Get all cities from a specific country without duplicity from each document for query fields
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

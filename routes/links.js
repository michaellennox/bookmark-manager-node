var express = require('express');
var router = express.Router();

var Link = require('../models/link');
var Tag = require('../models/tag');

router.get('/', function(req, res) {
  Link.find().populate('tags').exec(function(err, links) {
    res.render('links/index', { links: links });
  });
});

router.post('/', function(req, res) {
  var newTag = new Tag({name: req.body.tags});
  var newLink = new Link({name: req.body.name, url: req.body.url, tags: newTag.id});
  newLink.save();
  newTag.save();
  res.redirect('/links');
});

router.get('/new', function(req, res) {
  res.render('links/new');
});

module.exports = router;

var express = require('express');
var router = express.Router();

const {
    getAllQuestions,
    getQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion
  } = require("../services/questions");

router.get('/', function(req, res){
    getAllQuestions(req,res);
});

router.get('/:id', function(req, res){
    getQuestionById(req,res);
});

router.post('/', function(req, res){
    createQuestion(req,res);
});

router.put('/:id', async function(req, res){
    updateQuestion(req,res);
});

router.delete('/:id', function(req, res){
    deleteQuestion(req,res);
});

module.exports = router;


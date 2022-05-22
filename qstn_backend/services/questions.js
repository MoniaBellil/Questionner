var express = require('express');
var router = express.Router();
const mongoose = require('../loaders/mongoose');
var ObjectId = require('mongodb').ObjectID;
router.get('/', async function(req, res){
    const db=await mongoose ();
    await db.collection('Question').find({}).toArray(function(err, result) {
        if (err) throw err;
        return res.send(result);
      });
    
});

router.get('/:id', async function(req, res){
    const db=await mongoose ();
    var query = { _id: ObjectId(req.params.id) };
    await db.collection('Question').find(query).toArray(function(err, result) {
        if (err) throw err;
        return res.send(result);
      });
});

router.post('/', async function(req, res){
    const db=await mongoose ();
    const user= await db.collection('Question').insertOne(req.body);
    return res.send(user);
});

router.put('/:id', async function(req, res){
    const db=await mongoose ();
    var query = { _id: ObjectId(req.params.id) };
    var newvalues = {
        $set: req.body
     }
    await db.collection('Question').updateOne(query,newvalues,function(err, result) {
        if (err) throw err;
        return res.send(result);
      });
});

router.delete('/:id',async function(req, res){
    const db=await mongoose ();
    var query = { _id: ObjectId(req.params.id) };
    await db.collection('Question').deleteOne(query,function(err, result) {
        if (err) throw err;
        return res.send(result);
      });
});

module.exports = router;
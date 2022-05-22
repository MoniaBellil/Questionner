var express = require('express');
var router = express.Router();
const mongoose = require('../loaders/mongoose');
var ObjectId = require('mongodb').ObjectID;
router.get('/', async function(req, res){
    const db=await mongoose ();
    await db.collection('Survey').find({}).toArray(function(err, result) {
        if (err) throw err;
        return res.send(result);
      });
    
});


router.get('/confirmed', async function(req, res){
    const db=await mongoose ();
    await db.collection('Survey').find({status:'published'}).toArray(function(err, result) {
        if (err) throw err;
        return res.send(result);
      });
    
});

router.get('/one/:id', async function(req, res){
    const db=await mongoose ();
    var query = { _id: ObjectId(req.params.id) };
    await db.collection('Survey').find(query).toArray(function(err, result) {
        if (err) throw err;
        return res.send(result);
      });
});





router.get('/:id', async function(req, res){
    const db=await mongoose ();
    var query = { "IdAdmin": req.params.id };
    await db.collection('Survey').find(query).toArray(function(err, result) {
        if (err) throw err;
        return res.send(result);
      });
});





router.post('/', async function(req, res){
    const db=await mongoose ();
    const user= await db.collection('Survey').insertOne(req.body);
    return res.send(user);
});

router.put('/:id', async function(req, res){
    const db=await mongoose ();
    var query = { _id: ObjectId(req.params.id) };
    var newvalues = {
        $set: req.body
     }
    await db.collection('Survey').updateOne(query,newvalues,function(err, result) {
        if (err) throw err;
        return res.send(result);
      });
});

router.delete('/:id',async function(req, res){
    const db=await mongoose ();
    var query = { _id: ObjectId(req.params.id) };
    await db.collection('Survey').deleteOne(query,function(err, result) {
        if (err) throw err;
        return res.send(result);
      });
});

module.exports = router;
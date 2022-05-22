var express = require('express');
var Nft = require('../models/nft');
var User = require('../models/User');

const getAllNfts = async (req,res)=>{
    Nft.find({reserved:false}).exec(function(err, nfts){
        if(err) {
            res.status(500).json({"error":'error has occured'});
        } else {
            res.status(200).json(nfts);
        }
    });
}

const getNftById = async (req,res)=>{
    Nft.findOne({
        _id: req.params.id
    }).exec(function(err, nft){
        if(err) {
            res.status(500).json({"error":'error has occured'});
        } else {
            res.status(200).json(nft);
        }
    });
}


const createNft = async(req,res)=>{
    const newNft = new Nft({
        title: req.body.title,
        description:req.body.description,
        price: req.body.price,
        cid: req.body.cid,
        reserved:false
    })
    try{
        await newNft.save()
        res.status(201).json({"success":"Nft Created Successfully"})
    }catch(e){
        console.log(e)
        res.status(500).json({"err":"Error creating Nft"})
    }
}

const reserveNft= async (req,res)=>{
    await Nft.findOneAndUpdate({
        cid : req.body.cid
      },{
          $set: {
            reserved: true
          }
      },{
          upsert: true
      },async function(err){
          if(err) {
              res.status(500).json({'error':"error reserving Nft"});
          } else {
                await User.findOneAndUpdate({
                    email : req.body.email
                },{
                    $push: { reserved_nfts: req.body.cid }
                },{
                    upsert: true
                },async function(err){
                    if(err) {
                        res.status(500).json({'error':"error reserving Nft"});
                    }
                });
                res.status(200).json({'success':"nft reserved succssefully"});
            }
      });
}



const updateNft = async(req,res)=>{
    Nft.findOneAndUpdate({_id:req.params.id}, req.body, {upsert: true,useFindAndModify: false}, (err, doc) => {
        if (err) return res.status(500).json({"error": "Unable to Update Nft"});
        res.status(200).json({"success":"Nft Updated successfully"});
    });
    
}

const deleteNft = async (req,res) => {
    Nft.findByIdAndRemove({
        _id: req.params.id
    },{useFindAndModify:false},function(err, nft){
        if(err) {
            res.status(500).json({"error":'error deleting Nft'});
        } else {
            res.status(500).json({"success":'Nft deleted with success'});
        }
    });
}

module.exports ={
    createNft,
    updateNft,
    getAllNfts,
    getNftById,
    deleteNft,
    reserveNft
};

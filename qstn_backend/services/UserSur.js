var UserSuv = require('../models/UserSur');

const getAllUserSuvs = async (req,res)=>{
    UserSuv.find().exec(function(err, UserSuvs){
        if(err) {
            res.status(500).json({"error":'error has occured'});
        } else {
            res.status(200).json(UserSuvs);
        }
    });
}

const getUserSuvById = async (req,res)=>{
    UserSuv.findOne({
        idUser: req.body.idUser,
        idSur: req.body.idSur,
    }).exec(function(err, UserSuv){
        if(err) {
            res.status(500).json({"error":'error has occured'});
        } else {
            res.status(200).json(UserSuv);
        }
    });
}


const createUserSuv = async(req,res)=>{
    const newUserSuv = new UserSuv({
        idUser: req.body.idUser,
        idSur:req.body.idSur,
        nbreQst: req.body.nbreQst
    })
    try{
        await newUserSuv.save()
        res.status(201).json({"success":"UserSuv Created Successfully"})
    }catch(e){
        console.log(e)
        res.status(500).json({"err":"Error creating UserSuv"})
    }
}

const updateUserSuv= async (req,res)=>{
    await UserSuv.findOneAndUpdate({
        _id: req.body.id
      },{
          $set: {
            nbreQst: req.body.nbreQst
          }
      },{
          upsert: true
      },async function(err){
          if(err) {
              res.status(500).json({'error':"error reserving UserSuv"});
          } else {
                res.status(200).json({'success':"UserSuv reserved succssefully"});
            }
      });
}

const deleteUserSuv = async (req,res) => {
    UserSuv.findByIdAndRemove({
        _id: req.params.id
    },{useFindAndModify:false},function(err, UserSuv){
        if(err) {
            res.status(500).json({"error":'error deleting UserSuv'});
        } else {
            res.status(500).json({"success":'UserSuv deleted with success'});
        }
    });
}

module.exports ={
    createUserSuv,
    updateUserSuv,
    getAllUserSuvs,
    getUserSuvById,
    deleteUserSuv
};

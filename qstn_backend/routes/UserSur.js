const router = require("express").Router();
const {userAuth,checkRole} = require("../services/Auth");

const {
    createUserSuv,
    updateUserSuv,
    getAllUserSuvs,
    getUserSuvById,
    deleteUserSuv
} = require("../services/UserSur");
router.get('/',userAuth,async (req,res)=>{
    getAllUserSuvs(req,res);
});

router.post('/one', userAuth,function(req, res){
    getUserSuvById(req,res);
});

router.post("/",
userAuth,async (req,res)=>{
    await createUserSuv(req,res);
});


router.put("/",userAuth,async (req,res)=>{
    updateUserSuv(req,res);
})

router.delete('/:id',
userAuth, async (req, res)=>{
    await deleteUserSuv(req,res);
});

module.exports = router;
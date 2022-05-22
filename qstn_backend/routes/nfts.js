const router = require("express").Router();
const {userAuth,checkRole} = require("../services/Auth");

const {
    createNft,
    updateNft,
    getAllNfts,
    getNftById,
    deleteNft,
    reserveNft
} = require("../services/nfts");

let multer = require('multer');
let upload = multer({ dest: 'uploads/'});



router.get('/',async (req,res)=>{
    getAllNfts(req,res);
});

router.get('/:id', userAuth,function(req, res){
    getNftById(req,res);
});

router.post("/",
userAuth,
checkRole(["admin"]),upload.single("media"),async (req,res)=>{
    await createNft(req,res);
});


router.put("/reserve",async (req,res)=>{
    reserveNft(req,res);
})


router.put("/:id",
userAuth,
checkRole(["admin"]),upload.single("media"),async (req,res)=>{
    await updateNft(req,res);
});


router.delete('/:id',
userAuth,
checkRole(["admin"]), async (req, res)=>{
    await deleteNft(req,res);
});

module.exports = router;
var express = require("express")
router = express.Router();

router.get("/",function(req,res){
  console.log(global.admin)
  res.send(global.admin+"\n");
});

module.exports = router;

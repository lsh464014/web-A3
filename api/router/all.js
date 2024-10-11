const express = require('express')
const allFun = require("../router-handle/all-fun");
const router = express.Router();

router.get("/AllUser",allFun.getAllUser)
router.get("/AllCategory",allFun.getAllCategory)
router.get("/UserByOther",allFun.getUserByOther)
router.get("/UserById",allFun.getUserById)

router.post("/donationInsert",allFun.insertDonation)
router.post("/createFundraiser",allFun.createFundraiser)
router.delete("/fundraiserDelete",allFun.deleteFundraiser);
router.put("/updateFundraiser", allFun.updateFundraiser);


module.exports = router;
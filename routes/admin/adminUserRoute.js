const express = require("express")
const router = express.Router()
const {createUser, getUsers, getOneUser, updateOneUser,deleteOneUser} = require("../../controllers/admin/userManagement")

router.post("/create", createUser)
router.get("/", getUsers)
router.get("/:id", getOneUser)
router.put("/:id", updateOneUser)
router.delete("/:id",deleteOneUser)


module.exports = router

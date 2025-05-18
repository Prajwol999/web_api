const express = require("express")
const router = express.Router()
const {createUser,getUsers} = require("../../controllers/admin/userManagement")

router.post(
    "/create",
    createUser
)

router.get(
    "/",
    getUsers
)

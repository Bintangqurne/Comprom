const express = require('express')
const userController = require('../controllers/userController')
const { authentication } = require('../middleware/authentication')
const router = express.Router()
const multer = require('multer')
const postController = require('../controllers/postController')
const likeController = require('../controllers/likeController')
const PaymentController = require('../controllers/payment')

//! Oauth
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/google-login", userController.googleLogin)
router.get("/home", userController.gitHub)
router.use(authentication);

//! User 
router.get("/users", userController.user)
router.get("/users/me", userController.usersMe)
router.get("/users/:id", userController.userByPk)
router.put("/users/:id", userController.editUsers)

//! Midtrans
router.post("/payment/midtrans/token", PaymentController.getMidtransToken)
router.put("/payment/midtrans/success", PaymentController.updateSucces)

//! Postingan
router.post("/add", postController.add)
router.get("/post", postController.getData)
router.get("/mypost", postController.myData)
router.put('/post/:id', postController.updateData)
router.delete('/post/:id', postController.delete)

//! Like
router.post('/like/:PostId', likeController.addFavorit)
router.get('/like', likeController.getFavorit)

module.exports = router
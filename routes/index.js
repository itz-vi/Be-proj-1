const express = require('express');
const router = express.Router();
const userModel = require("./users")

router.get('/', function (req, res) {
  res.render('index');
});

//  --------------- Create user-----------------//
router.post('/create', async function (req, res) {
  const { name, email, image } = req.body;
  const createduser = await userModel.create({ name, email, image })
  res.redirect("/read")
});

//  --------------- Read user-----------------//
router.get('/read', async function (req, res) {
  const users = await userModel.find();
  res.render('read', { users });
});

//  --------------- Update user-----------------//rs
router.get('/edit/:userid', async function (req, res) {
  const user = await userModel.findOne({ _id: req.params.userid });
  res.render('edit', { user });
});

router.post('/update/:userid', async function (req, res) {
  const { name, email, image } = req.body;
  const user = await userModel.findOneAndUpdate({ _id: req.params.userid }, { name, email, image }, { new: true });
  res.redirect('/read');
});


//  --------------- Delete user-----------------//
router.get('/delete/:id', async function (req, res) {
  const users = await userModel.findOneAndDelete({ _id: req.params.id });
  res.redirect('/read');
});

module.exports = router;

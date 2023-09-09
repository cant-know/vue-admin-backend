const express  = require("express");
const router = express.Router();
const jwt  = require("jsonwebtoken");
const passport  = require("passport");
const keys  = require("../../config/keys");

const UserModel  = require("../../models/UserModel");

router.get('/test',(req, res) => {
  res.json('111')
})

// 注册接口
router.post("/register",(req, res) => {
  UserModel.findOne({email: req.body.email}).then((user) => {
    if(user){
      return res.status(400).json('邮箱已被占用')
    }else{
      const newUser = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        identity: req.body.identity
      })
      newUser.save().then((user) => {
        console.log('添加成功')
        res.json(user)
      })
    }
  })
})

// 登录接口
router.post('/login',(req, res) => {
  const email = req.body.email
  const password = req.body.password
  UserModel.findOne({email: email}).then((user) => {
    if(!user){
      return res.status(404).json('用户不存在')
    }
    if(user.password != password){
      return res.status(400).json('密码错误')
    }
    const rule ={id: UserModel.id,name: UserModel.name,identity: UserModel.identity}
    jwt.sign(rule, keys.secretOrKey, { expiresIn: 999999 },(err, token) => {
      if(err) return err;
      return res.json({
        status: 200,
        token:"Bearer " +  token
      })
    })
  })
})

// 登录验证接口
router.get('/current',passport.authenticate("jwt",{session: false}),(req, res) => {
  res.json('登录成坤')
})

module.exports = router
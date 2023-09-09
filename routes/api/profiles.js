const express  = require("express");
const router = express.Router()
const passport  = require("passport");

const ProfileModel = require('../../models/profileModel');
const profileModel = require("../../models/profileModel");

// 添加信息
router.post('/add',passport.authenticate("jwt",{session: false}),(req, res) => {
  const profile = {}
  Object.assign(profile,req.body)
  new ProfileModel(profile).save().then(profile => {
    res.json(profile)
  })
})

// 获取所有信息
router.get('/',passport.authenticate("jwt",{session: false}),(req, res) => {
  profileModel.find().then(profile => {
    if(profile){
      return res.json(profile)
    }
    res.status(404).json('未找到数据')
  }).catch(err => {
    res.status(404).json(err)
  })
})

// 获取单个信息
router.get('/:id',passport.authenticate("jwt",{session: false}),(req, res) => {
  profileModel.findOne({_id: req.params.id}).then(profile => {
    if(profile){
      return res.json(profile)
    }
    res.status(404).json('未找到数据')
  })
})

// 编辑单个信息
router.post('/edit/:id',passport.authenticate("jwt",{session: false}),(req, res) => {
  profileModel.findOne({_id: req.params.id}).then(profile => {
    Object.assign(profile,req.body)
    new profileModel(profile).save()
    res.json(profile)
  })
})

// 删除信息
router.get('/delete/:id',passport.authenticate("jwt",{session: false}),(req, res) => {
  profileModel.findOneAndRemove({_id: req.params.id}).then(profile => {
      res.json('删除成坤')
  })
})

module.exports = router
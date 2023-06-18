const fs = require('fs');
const user_data = require('../models/User');
const api_url = require('../util/Api_url');
const { ObjectId } = require('mongodb');
class UserController {
  // [GET] /
  getall(req, res, next) {
    user_data.find({})
      .maxTimeMS(5000)
      .then(result => {
        res.send(result);
      })
      .catch(error => {
        // handle error
      });
  }
  //[GET]/users/getuser
  getuser(req, res, next) {
    const _id = req.params.id;
    if (!_id) {
      res.status(400).send({ message: 'hãy cung cấp id để lấy được dữ liệu người dùng' });
    }
    user_data.findOne({ _id: _id })
      .then(result => {
        res.status(200).send({ message: 'thành công', result });
      })
  }
  // [POST] /users/login
  login(req, res, next) {
    const data = req.body;
    if (!data.email || !data.pass) {
      res.status(400).send({ message: 'Vui lòng cung cấp email và mật khẩu !!!!' });
      return;
    }
    console.log(Object.keys(data).length);
    if (Object.keys(data).length > 0) {
      user_data.findOne({ email: data.email })
        .then(result => {
          const _id_user = result._id;
          if (!result) {
            res.status(404).send({ message: 'email chưa tồn tại' });
          } else {
            if (result.pass != data.pass) {
              res.status(400).send({ message: 'mật khẩu chưa đúng!!' });
            } else {
              res.status(200).send({ message: 'đăng nhập thành công', _id_user });
            }
          }
        })
        .catch(err => {
          console.log(err);
          res.status(500).send({ message: 'lỗi server' });
        })
    } else {
      res.status(403).send({ message: 'lỗi' });
    }
  }

  // [POST] /users/signup
  signup(req, res, next) {
    console.log(req.body);
    if (!req.body) {
      res.send(req.body);
      return;
    }
    const data = req.body;
    if (Object.keys(data).length > 0) {
      user_data.findOne({ email: data.email })
        .then(result => {
          if (result) {
            res.status(400).send({ message: 'email đã tồn tại!' });
          } else {

            const user = {
              email: data.email,
              pass: data.pass
            }
            const user_v1 = new user_data(user);
            user_v1.save()
              .then(result => {
                const _id_user = result._id.toString();

                res.status(200).send({ message: 'tạo tài khoản thành công', _id_user });
              })
          }
        })
    } else {
      res.json('Error!');
    }
  }


  // [PUT] /users/:id
  update(req, res, next) {
    const _id = req.params.id;
    console.log(req.body);
    if (req.file === undefined) {
      const data = {
        name: req.body.name,
        date: req.body.date,
        phone_number: req.body.phone_number,
        avatar: 'https://c47c-118-69-3-158.ngrok-free.app/uploads/avatar_url.png'
      }
      user_data.updateOne({ _id: _id }, { $set: data })
        .then(() => res.status(200).send({ message: 'thành công', }));
    } else {
      fs.rename(req.file.path, 'uploads/' + req.file.originalname, function (err) {
        const link = '/uploads/' + req.file.originalname;
        const url = api_url.API_URL + link;
        const data = {
          name: req.body.name,
          date: req.body.date,
          phone_number: req.body.phone_number,
          avatar: url
        }
        user_data.updateOne({ _id: _id }, { $set: data })
          .then(() => res.status(200).send({ message: 'thành công', }));
      })
    }
  }
  // [PUT] /users/edit/:id
  edit(req, res, next) {
    const _id = req.params.id;
    console.log(req.body);
    if (req.file === undefined) {
      const data = {
        name: req.body.name,
        date: req.body.date,
        phone_number: req.body.phone_number,
        avatar: 'https://00b1-118-70-48-14.ngrok-free.app/uploads/avatar_url.png',
        address: req.body.address,
        story: req.body.story
      }
      user_data.updateOne({ _id: _id }, { $set: data })
        .then(() => res.status(200).send({ message: 'thành công', }));
    } else {
      fs.rename(req.file.path, 'uploads/' + req.file.originalname, function (err) {
        const link = '/uploads/' + req.file.originalname;
        const url = api_url.API_URL + link;
        const data = {
          name: req.body.name,
          date: req.body.date,
          phone_number: req.body.phone_number,
          avatar: url,
          address: req.body.address,
          story: req.body.story
        }
        user_data.updateOne({ _id: _id }, { $set: data })
          .then(() => res.status(200).send({ message: 'thành công', }));
      })
    }
  }

  // // [POST] /users/saveRecipes/:id
  //   saveRecipes(req,res,next){
  //     const _id_users = req.params.id;
  //     const data = req.body;
  //     user_data.findByIdAndUpdate(
  //       _id_users,
  //       { $push: { saveRecipes: data } },
  //       { new: true },
  //       )
  //       .then(() => res.status(200).send({ message:'lưu thành công',}));
  //   }

  // // [DELETE] /users/cancel_saveRecipes/:id
  //   cancel_saveRecipes(req,res,next){
  //     const _id_users = req.params.id;
  //     const data = req.body;
  //     user_data.findByIdAndUpdate(
  //       _id_users,
  //       { $pull: { saveRecipes: data } },
  //       { new: true },
  //       )
  //     .then(() => res.status(200).send({ message:'Hủy lưu thành công',}));
  //   }




}

module.exports = new UserController;
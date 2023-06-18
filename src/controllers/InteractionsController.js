const fs = require('fs');
const interaction_data = require('../models/Interactions');
const post_data = require('../models/Post');
const api_url = require('../util/Api_url');
const HoaDon = require('../models/HoaDon');
const HoaDonChiTiet = require('../models/HoaDonChiTiet');
class InteractionsController {

    LikePost(req, res, next) {
        const data = {
            _id_user: req.body._id_user,
            _id_post: req.body._id_post,
            action: "like",
            note: req.body.note
        }
        const interaction = new interaction_data(data);
        interaction.save()
            .then(() => res.status(200).send({ message: 'like thành công' }))
            .catch(err => {
                res.status(404).send(err);
            })
    }

    UnLikePost(req, res, next) {
        const _id_post = req.params.id_post;
        const _id_user = req.params.id_user;
        interaction_data.findOneAndDelete({ _id_post: _id_post, _id_user: _id_user, action: "like" })
            .then((result) => {
                res.status(200).send({ message: 'un like thành công', })
            })
            .catch((error) => {
                // Xử lý lỗi nếu có
                next(error);
            });
    }

    GetAllLike(req, res, next) {
        const _id_post = req.params.id_post;
        interaction_data
            .find({ _id_post: _id_post, action: "like" })
            .populate('_id_user', 'name avatar')
            .then((result) => {
                const user_comment_and_note = result.map((comment) => {
                    return {
                        name_user: comment._id_user.name,
                        avatar: comment._id_user.avatar,
                    };
                });
                res.status(200).send(user_comment_and_note);
            })
            .catch((error) => {
                // Xử lý lỗi nếu có
                next(error);
            });
    }



    CommentPost(req, res, next) {
        const data = {
            _id_user: req.body._id_user,
            _id_post: req.body._id_post,
            action: "comment",
            note: req.body.note
        }
        const interaction = new interaction_data(data);
        interaction.save()
            .then(() => res.status(200).send({ message: 'comment thành công' }))
            .catch(err => {
                res.status(404).send(err);
            })
    }

    getAllComment(req, res, next) {
        const _id_post = req.params.id_post;
        interaction_data
            .find({ _id_post: _id_post, action: "comment" })
            .populate('_id_user', 'name avatar')
            .then((result) => {
                const user_comment_and_note = result.map((comment) => {
                    return {
                        name_user: comment._id_user.name,
                        avatar: comment._id_user.avatar,
                        note: comment.note
                    };
                });
                res.status(200).send(user_comment_and_note);
            })
            .catch((error) => {
                // Xử lý lỗi nếu có
                next(error);
            });
    }

    DeleteComment(req, res, next) {
        const _id_post = req.params.id_post;
        const _id_user = req.params.id_user;
        post_data.findOne({ _id: _id_post, _id_author: _id_user })
            .then(result => {
                console.log(result);
                if (result === null) {
                    interaction_data.findOneAndDelete({ _id_post: _id_post, _id_user: _id_user, action: "comment" })
                        .then((result) => {
                            res.status(200).send({ message: 'xóa comment thành công', })
                        })
                        .catch((error) => {
                            // Xử lý lỗi nếu có
                            next(error);
                        });
                } else {
                    interaction_data.findOneAndDelete({ _id_post: _id_post, action: "comment" })
                        .then((result) => {
                            res.status(200).send({ message: 'xóa comment thành công', })
                        })
                        .catch((error) => {
                            // Xử lý lỗi nếu có
                            next(error);
                        });
                }
            })
    }

    TaoHoaDon(req, res, next) {
        const hoadonchitiets = new HoaDonChiTiet()
        hoadonchitiets.save()
            .then(result => {
                const data={
                    tenhoadon :req.body.tenhoadon,
                    _id_hoadonchitiet:result._id,
                }
                const hoadon = new HoaDon(data);
                hoadon.save()
                    .then(() => res.status(200).send({ message: 'like thành công' }))
                    .catch(err => {
                        res.status(404).send(err);
                    })
            })

    }
}

module.exports = new InteractionsController;
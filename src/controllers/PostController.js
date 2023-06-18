const fs = require('fs');
const post_data = require('../models/Post');
const api_url = require('../util/Api_url');
const user_data = require('../models/User')
class PostController {
    getPosts(req, res, next) {
        const _id = req.params.id_user;
        post_data.find({ _id_author: _id })
            .populate('_id_author', 'name avatar')
            .then(result => {
                const posts = result.map((post) => {
                    return {
                        _id:post._id,
                        title: post.title,
                        img_post: post.img,
                        content: post.content,
                        _id_author: post._id_author,
                    };
                });
                res.status(200).send({ message: 'Lấy bài viết thành công', posts });
            })
    }

    AddPost(req, res, next) {
        res.json(req.body);
        fs.rename(req.file.path, 'uploads/' + req.file.originalname, function (err) {
            const link = '/uploads/' + req.file.originalname;
            const url = api_url.API_URL + link;
            const data = {
                _id_author: req.body._id_author,
                title: req.body.title,
                img: url,
            }
            const post = new post_data(data);
            post.save()
                .then(() => res.status(200).send({ message: 'Thêm thành công', }));
        })
    }

    Delete(req, res, next) {
        const _id = req.params.id;
        post_data.delete({ _id: _id })
            .then(() => res.status(200).send({ message: 'Xóa thành công', }));
    }




}

module.exports = new PostController;



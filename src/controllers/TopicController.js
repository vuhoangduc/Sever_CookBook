const fs = require('fs');
const topic_data = require('../models/Topic');
const api_url = require('../util/Api_url');


class TopicController {
    getall(req, res, next) {
        topic_data.find({})
            .then(result => {
                res.json(result);
            })
    }

    addNew(req, res, next) {
        fs.rename(req.file.path, 'uploads/' + req.file.originalname, function (err) {
            const link = '/uploads/' + req.file.originalname;
            const url = api_url.API_URL + link;
            const data = {
                name: req.body.name,
                img:url
            }
            const topic = new topic_data(data);
            topic.save()
            .then(() => res.status(200).send({ message:'Thêm thành công',}));
        })
    }
}

module.exports = new TopicController;
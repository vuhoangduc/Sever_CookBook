const fs = require('fs');
const storage_data = require('../models/Storage');
const api_url = require('../util/Api_url');

class StoragesController {
    // [POST] /storages/saveRecipes
    saveRecipes(req, res, next) {
        const data = req.body;
        console.log(data);
        const storage = new storage_data(data);
        storage.save()
        .then(() => res.status(200).send({ message: 'lưu thành công', }));
    }

    // [DELETE] /storages/cancel_saveRecipes/:id
    cancel_saveRecipes(req, res, next) {
        const id_storage = req.params.id;
        const data = req.body;
        storage_data.findByIdAndDelete(id_storage)
        .then(() => res.status(200).send({ message: 'Hủy lưu thành công', }));
    }

}

module.exports = new StoragesController;
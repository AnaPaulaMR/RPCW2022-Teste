var Cidade = require('../models/cidade');

module.exports.listar = function () {
    return Cidade
        .find({}, {_id:1, nome:1, distrito:1})
        .exec();
}

module.exports.consultar = function (id) {
    return Cidade
        .findOne({_id: id})
        .exec();
}

module.exports.listarNomes = function () {
    return Cidade
        .find({}, {_id:0, nome:1})
        .sort({nome:1})
        .exec();
}

module.exports.consultarDistrito = function (d) {
    return Cidade
        .find({distrito: d}, {_id:1, nome:1})
        .exec();
}

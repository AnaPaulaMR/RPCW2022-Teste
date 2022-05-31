var Ligacao = require('../models/ligacao');

module.exports.consultarOrigem = function (id) {
    return Ligacao
        .findOne({origem: id}, {_id:1, destino:1})
        .exec();
}


module.exports.consultarDistancia = function (d) {
    return Ligacao
        .findOne({distancia: {$gte: d}}, {_id:1, origem:1, destino:1})
        .exec();
}
var express = require('express');
var router = express.Router();

var Cidade = require('../controllers/cidade');
var Ligacao = require('../controllers/ligacao');

router.get('/cidades', function(req, res,) {
  if (req.query['nomes'] !== undefined) {
    Cidade.listarNomes()
    .then(dados => {
      res.status(200).jsonp(dados);
    })
    .catch( e => {
      res.status(502).jsonp({erro: e})
    });
  }
  else if (req.query['distrito'] !== undefined) {
    Cidade.consultarDistrito(req.query['distrito'])
    .then(dados => {
      res.status(200).jsonp(dados);
    })
    .catch( e => {
      res.status(504).jsonp({erro: e})
    });
  }
  else {
    Cidade.listar()
    .then(dados => {
      res.status(200).jsonp(dados);
    })
    .catch( e => {
      res.status(500).jsonp({erro: e})
    });
  }
});

router.get('/cidades/:id', function(req, res,) {
  Cidade.consultar(req.params.id)
  .then(dados => {
    res.status(200).jsonp(dados);
  })
  .catch( e => {
    res.status(503).jsonp({erro: e})
  });
});

router.get('/distritos', function(req, res,) {
  Cidade.listar()
  .then( dados => {
    var porDistrito = {};

    dados.forEach( c => {
      var distrito = c.distrito;
      if (porDistrito[distrito] == undefined) {
        porDistrito[distrito] = {'nome': distrito, 'cidades': []};
      }
      porDistrito[distrito].cidades.push({'_id': c._id, 'nome': c.nome});
    });

    res.status(200).jsonp(porDistrito);
  })
  .catch( e => {
    res.status(505).jsonp({erro: e});
  });
});

router.get('/ligacoes', function(req, res,) {
  if (req.query['origem'] !== undefined) {
    Ligacao.consultarOrigem(req.query['origem'])
    .then( dados => {
      
      dados.forEach( l => {
        Cidade.consultar(l.destino)
        .then( nome => {
          l.nomedestino = nome;
        })
        .catch( e => {
          l.nomedestino = {erro: e};
        });
      });
      
      res.status(200).jsonp(dados);
    })
    .catch( e => {
      res.status(506).jsonp({erro: e});
    });
  }
  else if (req.query['dist'] !== undefined) {
    Ligacao.consultarDistancia(req.query['dist'])
    .then( dados => {
      
      dados.forEach( l => {
        Cidade.consultar(l.origem)
        .then( nome => {
          l.nomeorigem = nome;
        })
        .catch( e => {
          l.nomeorigem = {erro: e};
        });
        
        Cidade.consultar(l.destino)
        .then( nome => {
          l.nomedestino = nome;
        })
        .catch( e => {
          l.nomedestino = {erro: e};
        });
      });
      
      res.status(200).jsonp(dados);
    })
    .catch( e => {
      res.status(507).jsonp({erro: e});
    });
  }
});

module.exports = router;

var express = require('express');
var axios = require('axios');
var router = express.Router();

var token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTRlY2VhNmI1ZDVjMjQ3NmNmMDhiMSIsImxldmVsIjozLjUsImVudGlkYWRlIjoiZW50X0EzRVMiLCJlbWFpbCI6InJwY3cyMDIyQGdtYWlsLmNvbSIsImlhdCI6MTY1NDAxNzAzNiwiZXhwIjoxNjU0MDQ1ODM2fQ.hlaJmXTTLi2fQ2qH7Mt0paa1l-a20OsJ_30Prna4uVmiyaDWOly7oaVg_hZQF4DjawvhLjg4p-GQDGm_4afbAcm6gWlBPpDG_5K2FvVjtkEX1iMc5OkSnToTBfAd7q6k-crcWtnuB_j0hjILD33cacVhYOO1-97rUlMF_Yx9FhrloKxc2Im9YMRCSEQULZq8AIbKyChreHdoUT5hYB72YptOIeCf3t435Lzo-lrEwx1ju4uecRyQr3-OrM8Fam1IKEk9fCnurG_j3ZcikeHTVrEEf5K7NPq2_9eOQK8xTvb_NHaL84G32xbDI9nqv-deR-qHno_WrGSQiJKFkEWhIw"

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/classes', function(req, res, next) {
  axios.get('http://clav-api.di.uminho.pt/v2/classes?nivel=1&token=' + token)
  .then(response => {
    var list = response.data;
    res.render('classes', { data: list });
  })
  .catch(function (err) {
    res.render('error', { error: err });
  });
});


router.get('/classe/:id', function(req, res, ) {
  axios.get('http://clav-api.di.uminho.pt/v2/classes/c' + req.params.id + '?token=' + token)
    .then(response => {
      res.render('classe', { data: response});
    })
    .catch(function (err) {
      res.render('error', { error: err });
    });
});

module.exports = router;

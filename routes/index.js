var express = require('express');
var router = express.Router();
var mysql = require("mysql");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.all('/query', function(req, res, next) {
    var query = req.body.query.toLowerCase();
    console.log(query);
    if (query.indexOf("drop") != -1 || query.indexOf("insert") != -1 || query.indexOf("delete") != -1)
        res.end("We only support SELECT");
    else {
        connection.query(query, function(err, rows, fields) {
            if (err) throw err;
            /*var i,
                scores = [],
                score;
            for (i = 0; i < rows.length; i++){
                score = {
                    username : rows[i].username,
                    score : rows[i].score,
                    rank : i + 1
                };
                scores.push(score);
            }
            console.log(req.cookies);
            res.render("scores", {me : username, scores: scores});
            */
            res.json(rows);
        });
    }

});


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : "lab2"
});
connection.connect();


module.exports = router;

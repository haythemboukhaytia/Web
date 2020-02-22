var express = require("express");
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var  mysql = require('mysql');
var config = require('./db.js');

// create connection
var connection = mysql.createConnection(config);
// connect to database
connection.connect(function(error) {
  if (!error) {
      console.log('Connected');
  }
  else {
      console.log('Failed');
  }
});
app.use(cors());
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
// configuration
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World'));
// Create rest Api for abbrecher
app.get('/api/abbrecher',(req, res) => {
    let sql = "SELECT count(Student_id) AS studenten, semester FROM `schritt_1_2` GROUP by semester";
    let query = connection.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });
  // Create rest Api for absolventen
  app.get('/api/absolventen',(req, res) => {
    let sql = "SELECT COUNT(DISTINCT(Student_id)) as studenten, Semester FROM `schritt_2_1` GROUP BY Semester";
    let query = connection.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });
// Create rest Api for Noten: part 1
  app.get('/api/getNotenProPlanSemesterAndMat/:semesternummer/:mat',(req, res) => {
    let semesternummer = req.params.semesternummer;
    let mat = req.params.mat;

    let sql2 = "SELECT COUNT(Student_id) AS Studenten,Note,Titel FROM `diagramm3_2` WHERE Plansemester ='" + semesternummer + "' and Titel ='" + mat + "' GROUP BY Note"

    let query = connection.query(sql2, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

  // Create rest Api for Noten: part 2
  app.get('/api/getMatsWithSemesterNumberr/:semesternummer',(req, res) => {
    let semesternummer = req.params.semesternummer;
    let sql = "select DISTINCT(Titel) from `diagramm3_2` WHERE Plansemester =?";

    let query = connection.query(sql,semesternummer, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

  // Create rest Api for Pausenden
  app.get('/api/getPausenden/:Pausenummer',(req, res) => {
    let Pausenummer = req.params.Pausenummer;
    let sql = "SELECT COUNT(DISTINCT Student_id) AS studenten FROM `abschluss_mit_pausen` WHERE Pause= ?"
    let query = connection.query(sql,Pausenummer, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

  // Create rest Api for Fächer: abbrecher
  app.get('/api/getFachAbbrecher/:note',(req, res) => {
    let note = req.params.note;

    let sql3 = "SELECT COUNT(DISTINCT Student_id) as Studenten, Titel,Note FROM `test_2_2`  WHERE Note ='" + note + "' GROUP BY Titel"

    let query = connection.query(sql3, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

  //Create rest Api for Fächer: absolventen
  app.get('/api/getFachAbsolventen/:note',(req, res) => {
    let note = req.params.note;

    let sql4 = "SELECT COUNT(DISTINCT Student_id) as Studenten, Titel,Note FROM `test_1_2`  WHERE Note ='" + note + "' GROUP BY Titel"

    let query = connection.query(sql4, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });
  


//put the hostname & port
const hostname = 'localhost';
const port = 4000;
app.listen(port, hostname, () => {
  console.log(`Server running on http://${hostname}:${port}/`);
});
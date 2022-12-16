
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const path = require('path');
const fs = require('fs');
const multer = require("multer");
//bodyParser
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.json());

//allows multiple http request anywhere
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "./build/web")));

//Store enterprise image
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public");
    },
    filename: (req, file, cb) => {
      cb(null, "IMG_"+req.headers.nom_file+"."+file.originalname.split('.').pop());
      
    },
  });
  
  const upload = multer({ storage: storage });

  // STORE PROGRAM FILE
  app.post('/sendProgam', upload.single('image'), (req, res) => {

    // let program = {
    //   nom_entreprise : req.headers.nom_entreprise,
    //   nom_salle: req.headers.nom_salle,
    //   debut_metting : req.headers.debut_metting,
    //   title1: req.headers.title1,
    //   time1_debut : req.headers.time1_debut,
    //   time1_fin : req.headers.time1_fin,
    //   title2: req.headers.title2,
    //   time2_debut: req.headers.time2_debut,
    //   time2_fin: req.headers.time2_fin,
    //   title3: req.headers.title3,
    //   time3_debut: req.headers.time3_debut,
    //   time3_fin: req.headers.time3_fin,
    //   fin_meeting: req.headers.fin_meeting,
    //   extension_image: req.file.originalname.split('.').pop()
    // };
    const nom_file = req.headers.nom_file;
    console.log(nom_file);
    try{
        fs.writeFileSync("./public/"+nom_file+".cfg", JSON.stringify(nom_file))
      
        res.status(200).json({"message":"file created successfuly and image stored successfuly!!!"});
    } catch(err){
        console.log(err);
        res.status(500).json({"message":"making file failed!!!"});
    }
  }
  );

  app.post('/sendProgramBody', (req, res) => {
    const nom_file = req.body.nom_file;
    let data = req.body;
    console.log(data);
    try{
        fs.writeFileSync("./public/"+nom_file+".cfg", JSON.stringify(data))
    
        res.status(200).json({"message":"data appened in file successfuly!!!"});
      } catch(err){
        console.log(err);
        res.status(500).json({"message":"appending data failed!!!"});
      }

  });
  
  //STORE ADRESS FILE
  app.post('/sendAdress', (req, res) => {

  let adress = {
  port : req.body.port,
  adresse : req.body.adresse,
  };
  
  console.log(adress);
  try{
          fs.writeFileSync("./public/adress.cfg", JSON.stringify(adress));
          res.status(200).json({"message":"file created successfuly!!!"});
    } 
  catch(err){
    console.log(err);
    res.status(500).json({"message":"making file failed!!!"});
  }
  
  });


  //App listener
app.listen(8000, () => 
console.log("your server is on port 8000")
);
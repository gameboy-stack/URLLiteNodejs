const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
const mongoose = require('mongoose');

const dbURI = "mongodb+srv://YourUsername:YourPassword@YourClusterName.bnvaq.mongodb.net/YourDatabaseNamr?retryWrites=true&w=majority" // Your MongoDB Connection String

const rand6dGen = require("./rand6dGenerator/rand6d"); 
const ShortURL = require("./model/shorturl");

const app =  express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use("/static", express.static(path.join(__dirname, "public")));

app.set("view engine", "pug");

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })  //connecting to MongoDB
    .then(app.listen(8080))
    .catch(err => console.log(err));

app.get('/', (req,res) => {

    res.render("index",{year:(new Date()).getFullYear()});
});

app.post('/', async (req,res) => {
    
    const inputURL = req.body.urlinput;


    const savedURL = ; // some database fetch

    if(savedURL === null ){

        const rand6dReq = await rand6dGen.get6d(); // random String generator

        const savingShortURL = new ShortURL({

            actualUrl:inputURL,
            rand6d:rand6dReq
        });

        const result = await savingShortURL.save(); // inserting or updating document to collections

        const responseURL = String(req.hostname) + "/" + String(result.rand6d);
        res.render("index",{year:(new Date()).getFullYear(),URLLite:responseURL,givenURL:inputURL});          
    }
    else{
        const responseURL = String(req.hostname) + "/" + String(savedURL.rand6d);
        res.render("index",{year:(new Date()).getFullYear(),URLLite:responseURL,givenURL:inputURL});
    }
});


app.get('/:givenURL', async (req,res) => {

    var usedRand6dDb = ; // some database fetch
    const usedRand6d = usedRand6dDb.map((obj) => obj.rand6d)
    if(usedRand6d.includes(req.params.givenURL)){
        const requiredURL = ; // some database fetch
        res.redirect(String(requiredURL.actualUrl));
    }
    else{
        res.render("error",{year:(new Date()).getFullYear()})
    }
});



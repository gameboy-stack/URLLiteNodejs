const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
const cryptojs = require('crypto-js');
const mongoose = require('mongoose');

const dbURI = "mongodb+srv://testinguser:pass123@gameboycluster.bnvaq.mongodb.net/justtesting?retryWrites=true&w=majority"

const rand6dGen = require("./rand6dGenerator/rand6d");
const ShortURL = require("./model/shorturl");

const app =  express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use("/static", express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(app.listen(8080))
    .catch(err => console.log(err));


app.get('/', (req,res) => {

    res.render("index",{year:(new Date()).getFullYear()});
});

app.post('/', async (req,res) => {
    
    const inputURL = req.body.urlinput;
    const hashedURL = String(cryptojs.MD5(inputURL));
    // console.log(req.hostname)

    const savedURL = await ShortURL.findOne({_id:hashedURL});

    // console.log(savedURL);
    
    if(savedURL === null ){

        const rand6dReq = await rand6dGen.get6d();

        const savingShortURL = new ShortURL({
            _id:hashedURL,
            actualUrl:inputURL,
            rand6d:rand6dReq
        });

        const result = await savingShortURL.save();

        const responseURL = String(req.hostname) + "/" + String(result.rand6d);
        res.render("index",{year:(new Date()).getFullYear(),URLLite:responseURL,givenURL:inputURL});          
    }
    else{
        const responseURL = String(req.hostname) + "/" + String(savedURL.rand6d);
        res.render("index",{year:(new Date()).getFullYear(),URLLite:responseURL,givenURL:inputURL});
    }
});


app.get('/:givenURL', async (req,res) => {

    var usedRand6dDb = await ShortURL.find({})
    const usedRand6d = usedRand6dDb.map((obj) => obj.rand6d)
    // console.dir(req.protocol);
    // console.log(req.params.givenURL);
    // console.log(usedRand6d);
    // console.log(usedRand6d.includes(req.params.givenURL));
    if(usedRand6d.includes(req.params.givenURL)){
        const requiredURL = await ShortURL.findOne({rand6d:req.params.givenURL})
        res.redirect(String(requiredURL.actualUrl));
    }
    else{
        res.render("error",{year:(new Date()).getFullYear()})
    }
});



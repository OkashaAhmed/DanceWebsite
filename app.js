const express = require("express");
const path = require("path");
const app = express();
const port = 5000;

const bodyparser = require("body-parser");
const mongoose = require('mongoose');

//express stuff
app.use('/static',express.static('static'));
app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

//mongodb
mongoose.connect("mongodb://localhost/contactDance",
()=>{
  console.log("connected");
}, e => console.error(e)
);


const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String

});

const contactInfo = mongoose.model("contactInfo",contactSchema);

app.post('/contactSubmit',(req , res)=>{
    console.log(req.body.name);
    const info = new contactInfo(req.body);
    info.save().then(()=>{
        res.send("this item has been saved to the data base")
    }).catch(()=>{
        res.status(400).send("item was not saved to the database")
    });
    // res.status(200).render('contact.pug');
})



//pug specific configuration
app.set('view engine', 'pug');
app.set('views', path.join(__dirname,'views'));

//endpoints
app.get('/', (req , res)=>{
    
    const params= {
        
    }
    res.status(200).render('home.pug', params);
});

app.get("/contact",(req , res)=>{
    res.status(200).render('contact.pug');
});

app.get("/valo",(req , res)=>{
    res.status(200).render('valo.pug');
});

// start the server
app.listen(port,()=>{
    console.log(`the applictaion started successfully on port ${port}`);
});
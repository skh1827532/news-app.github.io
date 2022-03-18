const express = require("express");
const path = require("path");
var nodemailer=require('nodemailer');
var transporter=nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port:587,
    secure:false,
    requireTLS:true,
    auth:
    {
        user:'skh1827532@gmail.com',
        pass:'sk8646196'
    }
})
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myData',{useNewUrlParser:true,useUnifiedTopology:true})
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
const port = 3000;


const contactSchema = new mongoose.Schema({
    userName: String,
    email:String,
    address:String,
    phone:String,
    textArea:String
  
  
  });
  
const contact = mongoose.model('againForm', contactSchema);

// For serving static files
app.use('/static', express.static('static'))

// Set the template engine as pug
app.set('view engine', 'hbs')

// Set the views directory
app.set('views', path.join(__dirname, 'views'))


 
// Our pug demo endpoint
app.get("/", (req, res)=>{ 
    // res.status(200).render('views.pug');
    res.render('index')
});
app.get("/contact", (req, res)=>{ 
    // res.status(200).render('views.pug');
    res.render('contact')
});
app.get("/about", (req, res)=>{ 
    // res.status(200).render('views.pug');
    res.render('about')
});


app.post("/contact", (req, res) => {
    // res.status(200).render('views.pug');
    var myData=new contact(req.body);
    if(req.body.userName.length==0 || req.body.email.length==0 || req.body.address.length==0 || req.body.phone.length==0 || req.body.textArea.length==0){
      res.render('failure');
    }
    else{

      myData.save().then(()=>{
        // e.preventDefault();
        
        
        console.log('This item has been saved to database')
        
        
        res.render('success')
        
        
        
        
        var mailOptions={
          from:'skh1827532@gmail.com',
          to:`${req.body.email}`,
          subject:'EMAIL FROM NEWS COMPANY',
          text:`Thanks ${req.body.userName} for submitting your response. We shall try to look at your suggestions and improve our website`
        }
        
        
        transporter.sendMail(mailOptions,function(error,info){
          if(error){
            console.log(error)
          }
          else{
            console.log('Email has been sent',info.response)
          }
        })
        
        
        
     
        
        
      }).catch(()=>{
        console.log('could not be saved to database');
      })
      
    }
    });
    
    
    app.listen(port,()=>{
    console.log('Listening on the port',port);
})






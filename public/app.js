var express = require("express");
var expressSanitizer = require("express-sanitizer");
var mongoose = require("mongoose");
var app = express();
var bodyParser = require("body-parser");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var expressSession = require("express-session");
var passportLocalMongoose = require("passport-local-mongoose");
var methodoverride = require("method-override");
var stripe=require("stripe")("sk_test_u0rOMihm0dLebSuMS7YLDBBV");
var firebase = require("firebase");

var http = require('http');
app.use(methodoverride("_method"));
app.use(require("express-session")({
    secret:"logintomysite",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());


app.get("/",function(req,res){
    res.render("index.ejs");
});

app.get("/successful",function(req,res){

	res.render("successful.ejs")
})

app.post("/pay",function(req,res){

	var token=req.body.stripeToken;
	var camount=req.body.paidamount;
	var paid=stripe.charges.create({
		amount: camount,
		currency:"inr",
		source : token

	},function(error,paid){
		if(error && error.type==="StripCardError"){
				console.log("Invalid Credentials")
		}
	})
	console.log("Payment Successful!!")
    res.redirect("/successful");
});
app.listen(3000,function(){

      console.log("Server Running on port 3000");

    });
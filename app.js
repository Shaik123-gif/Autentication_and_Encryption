// Installing the required modules.

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"));

/* Bcrypt is the Cryptographic Hashing algorithm, we are using this algorithm to encrypt and decrypt the users passwords.
 Principle:
 (1) we are passing the password by adding some salt (Password+Salt) into a hash function to generate a hash.
 (2) Now we are going to perform the step 1 -->   10 (saltRounds) more times.
 In this way we are making the encrypted password more secure. 
*/

const bcrypt = require("bcrypt");
// No of rounds is 10
const saltRounds = 10;


//Connecting the mongodb to our local server.
// mongoose.connect('mongodb://localhost:27017/userdata', {useNewUrlParser: true,useUnifiedTopology: true});
mongoose.connect('mongodb+srv://admin-shaik:admin-shaik@cluster0.ua9b2.mongodb.net/userdata', {useNewUrlParser: true,useUnifiedTopology: true});

//creating the Schema for our database
const userSchema = new mongoose.Schema(
{
	email : String,
	password:String
});



//creating a table for our database
const User = mongoose.model('User',userSchema);





app.get("/",function(req,res)
{
	res.sendFile(__dirname + "public/index.html");
});


app.get("/register",function(req,res)
{
	res.sendFile(__dirname + "/registerform.html");
});

app.get("/signin",function(req,res)
{
	res.sendFile(__dirname + "/signinform.html");
});



// This Post method deals with Registration Form
app.post("/register",function(req,res)
{
	
	// Encrypting the password using bcrypt algorithm
	bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    	const users = new User(
		{
			email : req.body.email,
			password : hash
		});
		// we are storing the user's data in the database
		users.save(function(err)
		{
			if(err)
				console.log(err);
			else
				res.sendFile(__dirname + "/registrationsuccess.html");
		});
	});
});


// This Post method deals with Signin Form
app.post("/signin",function(req,res)
{
	const email = req.body.email;
	const password = req.body.password;
	// We are checking whether the user is having any account in our website.
	User.findOne({email:email},function(err,founduser)
	{
		if(founduser)
		{
			//if the user is found, we are checking his password is correct or wrong.
			//if it is a valid one, we are letting him.
			bcrypt.compare(password, founduser.password, function(err, result) {
				//we are comparing the password with the encrypted password in our database.
    				if(result == true)
    				{
    					res.render("success",{encrypt : founduser.password , email : email , pass : password});
    				}
					else
					{
						res.sendFile(__dirname + "/incorrectpass.html");
					}
			});
		}
		else
		{
			res.sendFile(__dirname + "/incorrectemail.html");
		}
	});
});


// The Local server is listening at port 3000
let port = process.env.PORT;
if(port == null || port == "")
{
	port = 3000;
}

app.listen(port,function()
{
	console.log("Server has started successfully");
});
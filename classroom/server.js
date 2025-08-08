const express = require('express');
const app=  express();
const users= require('./routes/user.js');
const posts= require('./routes/post.js');
const cookieParser = require('cookie-parser');
const flash = require("connect-flash");

const session = require('express-session');

//app.use(cookieParser("secretcode"));

// app.get("/getsignedcookie",(req,res)=>{
//     res.cookie("made-in","India",{signed:true});
//     res.send("Sent you a signed cookie!");
// });

// app.get("/verify", (req, res) => {
//     console.log(req.signedCookies);
//     res.send("verified");
// });

// app.get("/getcookies", (req, res) => {
//     res.cookie("greet","namste");
//     res.cookie("madeIn","India");
//     res.send("sent you some cookies!");
// });

// app.get("/", (req, res) => {
//     console.dir(req.cookies);
//     res.send("Hi, I am root!");
// });

// app.use("/users",users);
// app.use("/posts",posts);

//express session
app.use(session({
    secret:"mysupersecretstring",
    resave:false,  // it is use for avoid terminal warning
    saveUninitialized:true // iska bhi kam   wahi hai
}));

app.use(flash());  // it is use for the store and see one time msg

// app.get("/test", (req, res) => {
//     res.send("Testing session");
// });

// app.get("/reqcount", (req, res) => {
//     if(req.session.count) {
//         req.session.count++;
//     }else{
//     req.session.count = 1;
//     }
//     res.send(`you sent a request ${req.session.count}times`)
// });

app.get("/register", (req, res) => {
    let{name = "anonymous"} = req.query;
    req.session.name = name;
    console.log(req.session.name);
    req.flash("success", "Registration successful!");
    res.redirect("/hello");
});

app.get("/hello", (req, res) => {

    res.send(`Hello,${req.session.name}`);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
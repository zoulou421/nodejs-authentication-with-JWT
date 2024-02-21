const express=require('express');
const jwt=require('jsonwebtoken');

const app= express();
const port=(process.env.PORT||3000);

//welcome
app.get("/api",(req, res)=>{
    res.json({message:"Welcome to this API service!"})
});

//posts created
/*app.post('/api/posts/',verifyToken, (req, res)=>{
    jwt.verify(req.token,'secretket',(err, authData)=>{
        if(err){
            res.sendStatus(403);//forbidden
        }else{
            res.json({message:"Posts created...",authData});
        }
    })
});*/

//posts created v2
app.post("/api/posts/",verifyToken, (req,res)=>{
    jwt.verify(req.token, 'secretkey',(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({message:"Posts created....", authData});
        }
    })
});

//login with JWT
app.post('/api/login',(req, res)=> {
    const user = {
        id: "1",
        username: "Bonevy",
        email: "bonevybeby@formationkilo.com"
    };
    jwt.sign({user: user}, "secretkey", (err, token) => {
        res.json({
            token,
        });
    });
});


//verify token
function verifyToken(req,res, next) {
    const bearerHeader=req.headers['authorization'];
    if(bearerHeader !== "undefined"){
       // const bearerToken=bearerHeader.split(' ')[1];
        const bearerToken = bearerHeader && bearerHeader.split(' ')[1];
        req.token=bearerToken;
        next();
    }else {
        res.sendStatus(403);//forbidden
    }
}



app.listen(port,(req,res)=>{
    console.log("Server started at port "+port);
})
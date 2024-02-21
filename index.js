const express=require('express');
const jwt=require('jsonwebtoken');

const app= express();
const port=(process.env.PORT||3000);

//welcome
app.get("/api",(req, res)=>{
    res.json({message:"Welcome to this API service!"})
});

//posts created
app.post('/api/posts/', (req, res)=>{
    res.json({message:"Posts created..."})
});

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



app.listen(port,(req,res)=>{
    console.log("Server started at port "+port);
})
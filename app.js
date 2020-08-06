var express = require ('express');
var bodyparser =require('body-parser');
var db=require('./model/database');

var app = express();

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.get("/",(req,res,next)=>{
    res.json("You have entered a home site");
});

app.post("/postdata",async(req,res,next)=>{
    var name = req.body.name;
    var email = req.body.email;
    console.log(name);
    await db.execute('insert into project(name,email) values(?,?)',[name,email]);
    return res.json("ok");
});

app.patch("/patch_data",async(req,res,next)=>{
    var update_name = req.body.name;
    var email = req.body.email;
    var [data]=await db.execute('select email from project where email =?',[email])
    if(data.length > 0)
    {
        await db.execute('update project set name=? where email=?',[update_name,name]);
        return res.json({status:"ok"});
    }
    return res.json("User with email doesnot exist");
});

app.delete("/detele_data",async(req,res,next)=>{
    var email = req.body.email;
    var [check]=await db.execute('select email from project where email=?',[email]);
    if(check.length ===1)
    {
        await db.execute('delete from project where email=?',[email]);
        return res.json({status: "ok"});
    }
    return res.json("User cannot be deleted");
});


app.listen(2020);
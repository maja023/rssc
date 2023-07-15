const app=require('./server');
const wfpass=require("wifi-password");
app.get("/pass",(req,res)=>{
  wfpass().then(password => {
res.send(`${password}`)
  })
})

const port=100;
app.get('*', function(req, res){
    res.send("under working this page");
  });

app.listen(port,()=>{
    console.log(`the server is running at ${port}`);
})

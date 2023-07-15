const app=require('./server');
 

const port=100;
 



app.get('*', function(req, res){
    res.send("under working this page");
  });

app.listen(port,()=>{
    console.log(`the server is running at ${port}`);
})

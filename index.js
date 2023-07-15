const app=require('./server');
 
require('dotenv').config();
const port=process.env.PORT;
 



app.get('*', function(req, res){
    res.send("under working this page");
  });

app.listen(port,()=>{
    console.log(`the server is running at ${port}`);
})
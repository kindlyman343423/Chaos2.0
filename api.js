var express = require('express');
var app = express();

app.get('/',function(req, res){
   res.send('Hello world'); 
});

//create new transaction
// app.post('/transaction',function(req,res){

// });

// //mine or create a new block
// app.get('/mine',function(req, res){

// });

app.listen(3000,function(){
    console.log('Listening on port 3000...');
});
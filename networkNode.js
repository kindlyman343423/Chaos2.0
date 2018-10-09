
const express = require('express');
const bodyParser = require('body-parser'); 
const app = express();
const Blockchain = require('./blockchain');
const uuid = require('uuid/v1');
const port = process.argv[2];
const nodeAddress = uuid().split('-').join('');

const bitcoin = new Blockchain();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

app.get('/blockchain',(req,res)=>{
    res.send(bitcoin)
})

app.post('/transaction',(req,res)=>{
  const blockIndex =  bitcoin.createNewTransaction(req.body.amount,req.body.sender,req.body.recipient);
  res.json({note: `Transaction will be added in block ${blockIndex}.`})
})


app.get('/mine',(req,res)=>{
   const lastBlock = bitcoin.getLastBlock();
   const previousBlockHash = lastBlock['hash'];
   const currentBlockData = {
       transactions: bitcoin.pendingTransactions,
       index: lastBlock['index']+1
   };

   const nonce = bitcoin.proofOfWork(previousBlockHash,currentBlockData);
   const blockHash = bitcoin.hashBlock(previousBlockHash,currentBlockData,nonce);

   bitcoin.createNewTransaction(12.5,"00",nodeAddress);

   const newBlock = bitcoin.createNewBlock(nonce,previousBlockHash,blockHash);
    
   res.json({
       note: "New block mined successfully",
       block:newBlock
   })

})


app.listen(port,()=>{
    console.log(`It is working on port ${port}`)
})
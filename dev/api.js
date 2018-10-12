const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const uuid = require('uuid/v1');

const nodeAddress = uuid().split('-').join('');

const bitcoin = new Blockchain();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//for checking express running
// app.get('/',function(req, res){
//     res.send('Hello World')
// })

app.get('/blockchain',function(req, res){
    res.send(bitcoin);
});

app.post('/transaction',function(req, res){
    // console.log(req.body);
    // res.send(`The amount of the transaction is ${req.body.amount} bitcoin.`);
    const blockIndex = bitcoin.createNewTransaction(req.body.amount,req.body.sender,req.body.recipient);
    res.json({note: `Transaction will be added in block ${blockIndex}.`})
});

//mine and create a new block
app.get('/mine',function(req,res){
    const lastBlock = bitcoin.getLastBlock(); //getting last block
    const previousBlockHash = lastBlock['hash']; //getting previus hash
    const currentBlockData = {
        transactions: bitcoin.pendingTransactions,
        index: lastBlock['index']+1
    }
    const nonce = bitcoin.proofOfWork(previousBlockHash,currentBlockData);
    const blockHash = bitcoin.hashBlock(previousBlockHash,currentBlockData,nonce);

    bitcoin.createNewTransaction(12.5,"00",nodeAddress); //reward for mining

    const newBlock = bitcoin.createNewBlock(nonce,previousBlockHash,blockHash);
    res.json({
        note: "New block mined successfully",
        block: newBlock
    })
});

app.listen(3000,function(){
    console.log('Listening on port 3000');
})

const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();
console.log(bitcoin);
// bitcoin.createNewBlock(100,'SFDSD4344','232342SLDFS');

// bitcoin.createNewTransaction(200,'ALEXDFFGDF4344','JENNSDGG5445SS');
// bitcoin.createNewBlock(300,'SFDSD3344','232342SYDFS');              //mine a block

// //pending transactions
// bitcoin.createNewTransaction(300,'ALEXDFFGDF4344','JENNSDGG5445SS'); 
// bitcoin.createNewTransaction(400,'ALEXDFFGDF4344','JENNSDGG5445SS');
// bitcoin.createNewTransaction(500,'ALEXDFFGDF4344','JENNSDGG5445SS');
// bitcoin.createNewBlock(600,'SFSFF3343','4334TSFS');                 //mine a block
// console.log(bitcoin);
// console.log(bitcoin.chain[2]);

//  TESTING HASH METHOD
const previousBlockHash='PREVIOUSHASHKEY';
const currentBlockData = [
    {
        amount: 10,
        sender: 'SDGDSFGFD455',
        recipent: 'SGDGDDG45DFGDFG'
    },
    {
        amount: 20,
        sender: 'DFGDFGDFGDG34334',
        recipent: 'SGDFGSGDSG343'
    },
    {
        amount: 30,
        sender: 'DFGDFHDF34343',
        recipent: 'SDGDHTRH4554'
    }
];
// const nonce = 100;
// console.log(bitcoin.hashBlock(previousBlockHash,currentBlockData,nonce));

//TESTING PROOF OF DATA returns nonce
nonce = bitcoin.proofOfWork(previousBlockHash,currentBlockData);

console.log(bitcoin.hashBlock(previousBlockHash,currentBlockData,nonce));
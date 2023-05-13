import "bootstrap/dist/css/bootstrap.min.css"
import Data from "./Data";
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from "react";
import { ethers } from "ethers";
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader-es6'
const { Block } = require('./Blockchain');
const { Blockchain } = require('./Blockchain');



function Blockview() {
    let blockchain = new Blockchain();
    // eslint-disable-next-line
    {
        Data.map((item) => {
            return (
                blockchain.addBlock(new Block(item.id, item.timestamp, { data: item.data }))
            )
        })
    }


    const [text, setText] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [scanResultFile, setScanResultFile] = useState('');

    const generateQrCode = async () => {
        try {
            const response = await QRCode.toDataURL(text);
            setImageUrl(response);
        } catch (error) {
            console.log(error);
        }
    }

    //blockchain.addBlock(new Block("37cfe7f7", "12/07/2017", { data: 10 }));
    //blockchain = JSON.stringify(blockchain, null, 4);
    //console.log('is blockchain valid? ' + blockchain.isChainValid());

    //blockchain.chain[1].data = { data: 55 };
    //blockchain.chain[1].hash = blockchain.chain[1].calculateHash();
    //console.log('is blockchain valid? ' + blockchain.isChainValid().toString());
    //console.log('is blockchain valid? ' + blockchain.isChainValid());
    //console.log(JSON.stringify(blockchain, null, 4))

    return (
        <div>
            <div style={{ margin: "2rem" }}>
                <Link className="d-grid gap-2" to={"/messageApp"}>
                    <Button size="lg">Add to Blockchain</Button>
                </Link>
               <grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                    <div className="my-3">
                        <div className="my-3">
                        <input type="text" class="form-control" label="Enter Text Here" onChange={(e) => setText(e.target.value)} />
                        </div>
                        <button onClick={() => generateQrCode()} className="btn btn-primary submit-button focus:ring focus:outline-none w-full">Generate QRCode</button>
                    </div>

                    <br />
                    {imageUrl ? (
                        <a href={imageUrl} download>
                            <img src={imageUrl} alt="img" />
                        </a>) : null}
                </grid>
                
            </div> 

            {
                blockchain.chain.map(index => {


                    return (

                        <div class="col" style={{ margin: "4rem" }}>

                            <div class="card h-70 p-3">
                                <div class="card-body">
                                    <h3 class="card-title" >Block: {index.index}</h3>
                                    <p class="card-title">Hash: {index.hash.substring(0, 20)} </p>
                                    <p class="card-text">PreviousHash: {index.previousHash.substring(0, 20)}</p>
                                    <h4 class="mt-2">{index.data.data}</h4>
                                    <p class="mt-2">Timestamp: {index.timestamp}</p>
                                    <p class="mt-2">Is valid: {blockchain.isChainValid().toString()}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Blockview;


/* let lloydCoin = new Blockchain();
lloydCoin.addBlock(new Block(1, "10/07/2017", { amount: 4 }));
lloydCoin.addBlock(new Block(2, "12/07/2017", { amount: 10 }));

console.log('is blockchain valid? ' + lloydCoin.isChainValid());

lloydCoin.chain[1].data = { amount: 56 };
lloydCoin.chain[1].hash = lloydCoin.chain[1].calculateHash();

console.log('is blockchain valid? ' + lloydCoin.isChainValid());

console.log(JSON.stringify(lloydCoin, null, 4)); */







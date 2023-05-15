import "bootstrap/dist/css/bootstrap.min.css"
import Data from "./Data";
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { useState } from "react";
import QRCode from 'qrcode';
import { ethers } from "ethers";
import ErrorMessage from "../SignMessage/ErrorMessage";
import SuccessMessage from "../SignMessage/SuccessMessage";
const { Block } = require('./Blockchain');
const { Blockchain } = require('./Blockchain');


function Blockview() {
    let blockchain = new Blockchain();
    // eslint-disable-next-line
    {
        Data.map((item) => {
            return (
                blockchain.addBlock(new Block(item.id, item.timestamp, { data: item.data }, item.imgs))
            )
        })
    }

    const verifyMessage = async ({ message, address, signature }) => {
        try {
            const signerAddr = await ethers.utils.verifyMessage(message, signature);
            if (signerAddr !== address) {
                return false;
            }

            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    };

    const [text, setText] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState();
    const [successMsg, setSuccessMsg] = useState();

    const generateQrCode = async () => {
        try {
            const response = await QRCode.toDataURL(text);
            setImageUrl(response);
        } catch (error) {
            console.log(error);
        }
    }

    const handleVerification = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        let sign = data.get("message");
        var array = sign.split(",");

        setSuccessMsg();
        setError();
        const isValid = await verifyMessage({
            setError,
            message: array[0].toString(),
            address: array[1].toString(),
            signature: array[2].toString()
        });

        if (isValid) {
            setSuccessMsg("Signature is valid!");
        } else {
            setError("Invalid signature");
        }
    };



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
                                    <grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                                        <br />
                                        {index.imgs ? (
                                            <a href={index.imgs} download>
                                                <img src={index.imgs} alt="img" />
                                            </a>) : null}
                                    </grid>
                                    <p class="mt-2">Timestamp: {index.timestamp}</p>
                                    <p class="mt-2">Is valid: {blockchain.isChainValid().toString()}</p>
                                </div>
                            </div>                 
                        </div>
                    )
                })
            }

            <form className="m-4" onSubmit={handleVerification}>
                <div >
                    <h1 >
                        Verify signature
                    </h1>
                    <div>
                        <div className="my-3">
                            <textarea
                                type="text"
                                name="message"
                                placeholder="Message"
                                class="form-control"
                                rows="3"
                            />
                        </div>
                    </div>
                    <footer className="p-4">

                        <button
                            type="submit"
                            class="btn btn-primary"
                        >
                            Verify signature
                        </button>
                    </footer>
                    <div>
                        <ErrorMessage message={error} />
                        <SuccessMessage message={successMsg} />
                    </div>
                </div>
            </form>
            <hr></hr>
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







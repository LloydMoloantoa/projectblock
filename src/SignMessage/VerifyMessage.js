//npm install ethers@5.6.9
import { useState, useRef } from "react";
import { ethers } from "ethers";
import QrReader from 'react-qr-reader-es6'
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";

var array = [];

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

export default function VerifyMessage() {
  const [error, setError] = useState();
  const [successMsg, setSuccessMsg] = useState();
  const [scanResultFile, setScanResultFile] = useState('');
  const qrRef = useRef(null);

  const handleVerification = async (e) => {
    e.preventDefault();
    //const data = new FormData(e.target);
    //let sign = data.get("message");
    
   
      array = scanResultFile.toString().split(",");
    

    console.log(scanResultFile);
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

  const handleErrorFile = (error) => {
    console.log(error);
  }
  const handleScanFile = (result) => {
    if (result) {
      setScanResultFile(result);
    }
  }
  const onScanFile = () => {
    qrRef.current.openImageDialog();
  }

  return (
 <div>
    <grid item xl={4} lg={4} md={6} sm={12} xs={12}>
            <button type="submit" class="btn btn-primary" onClick={onScanFile}>Scan Qr Code</button>
            <QrReader
              ref={qrRef}
              delay={100}
              style={{ width: '10%' }}
              onError={handleErrorFile}
              onScan={handleScanFile}
              legacyMode
            />
            <p>Scanned Code:</p>
            <p>Message: {array[0]}</p>
            <p>Address: {array[1]}</p>
            <p>SignMessage: {array[2]}</p>
          </grid>

    <form className="m-4" onSubmit={handleVerification}>
      <div >
        
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
    </div>
  );
}

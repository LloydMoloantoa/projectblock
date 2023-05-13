import { useState} from "react";
import { ethers } from "ethers";
import QRCode from 'qrcode';

//import QrReader from 'react-qr-reader-es6'
//npm install ethers@5.6.9
import ErrorMessage from "./ErrorMessage";


const signMessage = async ({ setError, message }) => {
  try {
    console.log({ message });
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(message);
    const address = await signer.getAddress();

    return {
      message,
      signature,
      address
    };
  } catch (err) {
    setError(err.message);
  }
};

export default function SignMessage() {
  //const resultBox = useRef();
  const [signatures, setSignatures] = useState([]);
  const [error, setError] = useState();

 // const [scanResultFile, setScanResultFile] = useState('');
  //const qrRef = useRef(null);
  const [imageUrl, setImageUrl] = useState('');




  const handleSign = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    const sig = await signMessage({
      setError,
      message: data.get("message")
    });
    if (sig) {
      setSignatures([...signatures, sig]);      
    }
      try {
        const message = sig.message.toString();
        const address = sig.address.toString();
        const signature = sig.signature.toString();
        const response = await QRCode.toDataURL(message + "," + address + "," + signature);
        setImageUrl(response);
      } catch (error) {
        console.log(error);
      }    
  };

  


/*   const handleErrorFile = (error) => {
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

 */
  return (
    <form className="m-4" onSubmit={handleSign}>
      <div className="credit-card w-full shadow-lg mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Sign messages
          </h1>
          <div>
            <div>
              <textarea
                required
                type="text"
                name="message"
                placeholder="Message"
                class="form-control"
                rows="4"
              />
            </div>

          </div>
        </main>
        <footer className="p-4">
          <button
            type="submit"
            className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
            
          >
            Sign message
          </button>

          <grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                  <br />
                  {imageUrl ? (
                    <a href={imageUrl} download>
                      <img src={imageUrl} alt="img" />
                    </a>) : null}
                </grid>



        {/*   <grid item xl={4} lg={4} md={6} sm={12} xs={12}>
            <button onClick={onScanFile}>Scan Qr Code</button>
            <QrReader
              ref={qrRef}
              delay={100}
              style={{ width: '10%' }}
              onError={handleErrorFile}
              onScan={handleScanFile}
              legacyMode
            />
            <h3>Scanned Code: {scanResultFile}</h3>
          </grid>
 */}



          <ErrorMessage message={error} />
        </footer>
        {signatures.map((sig, idx) => {
          return (
            <div key={sig}>
             {/*  <div className="my-3">
                <p>
                  Message {idx + 1}: {sig.message}
                </p>
                <p>Signer: {sig.address}</p>
                <p>Signature: {sig.signature}</p>
              </div> */}
              <div>
                <p>{sig.message},{sig.address},</p>               
                <p>{sig.signature}</p>
              </div>

            </div>
          );
        })}


              
        
      </div>
    </form>
  );
}

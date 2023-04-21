//npm install ethers@5.6.9
import { useState} from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";



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

  const handleVerification = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setSuccessMsg();
    setError();
    const isValid = await verifyMessage({
      setError,
      message: data.get("message"),
      address: data.get("address"),
      signature: data.get("signature")
    });

    if (isValid) {
      setSuccessMsg("Signature is valid!");
    } else {
      setError("Invalid signature");
    }
  };

  return (


      <form className="m-4" onSubmit={handleVerification}>
        <div >
          <h1 >
            Verify signature
          </h1>
          <div>
            <div className="my-3">
              <textarea
                required
                type="text"
                name="message"
                placeholder="Message"
                class="form-control"
                rows="5"
              />
            </div>
            <div className="my-3">
              <textarea
                required
                type="text"
                name="signature"
                placeholder="Signature"
                class="form-control"
                rows="3"
              />
            </div>
            <div className="my-3">
              <input
                required
                type="text"
                name="address"
                class="form-control"
                placeholder="Signer address"
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
  );
}

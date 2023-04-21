import TransactApp from "../ethereum/TransactApp";
import VerifyMessage from "./VerifyMessage";

export default function verifyApp() {
  return (
    <div>
      <div >
        <TransactApp />
      </div>
      <div>
        <VerifyMessage />
      </div>
      <hr></hr>
    </div>
  );
}


import AddBlockchain from "../block/AddBlockchain";
import SignMessage from "./SignMessage";
//import VerifyMessage from "./VerifyMessage";


export default function MessageApp() {
  return (
    <div>
      <div >
        <SignMessage />
      </div>
      <div>
        <AddBlockchain/>
      </div>
    </div>
  );
}

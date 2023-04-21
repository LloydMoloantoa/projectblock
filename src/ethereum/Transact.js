import React, { useState } from "react";
import { ethers } from 'ethers';

const Transact = () => {

    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);

    const connectWallet = () => {
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(result => {
                    accountChanged([result[0]])
                })
        } else {
            setErrorMessage('Install MataMask!')
        }
    }

    const accountChanged = (accountName) => {
        setDefaultAccount(accountName);
        getUserBalance(accountName);
    }

    const getUserBalance = (accountAddress) => {
        window.ethereum.request({ method: 'eth_getBalance', params: [String(accountAddress), "latest"] })
            .then(balance => {
                setUserBalance(ethers.utils.formatEther(balance));
            })
    }

    async function sendTransaction(e) {
        let params = [{
            from: "0xc25730a4fa9b31d4a32b6e0969f1ad4dea51aa54",
            to: e.target.to_address.value,
            gas: Number(21000).toString(16),
            gasPrice: Number(2500000).toString(16),
            value: Number(e.target.product_form.value).toString(16)
        }]

        let result = await window.ethereum.request({ method: "eth_sendTransaction", params }).catch((err) => {
            console.log(err);
        })
    }



    return (
        <div>
                <h1>MataMask Wallet Connection </h1>
                <button class="btn btn-primary" onClick={connectWallet}>connect to Wallet</button>
                <h3>Address: {defaultAccount}</h3>
                <h3>Balance: {userBalance}</h3>

                <form onSubmit={sendTransaction}>
                    <h3>Enter TransactIon Address: </h3>
                    <input class="form-control" type="text" name="to_address" placeholder="Enter Address:" />
                    <h3>Enter Amount: </h3>
                    <input class="form-control" type="number" name="product_form" placeholder="Amount " id="product_form" />
                    <div className="my-3">
                    <input class="btn btn-primary" type="submit" value="Submit" />
                    </div>
                </form>
                {errorMessage}         
        </div>
    );

}

export default Transact;
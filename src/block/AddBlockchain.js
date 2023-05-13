import emailjs from '@emailjs/browser'
import React, { useState, useRef } from "react";
import { Link } from 'react-router-dom'
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import Data from "./Data";
import { v4 as uuid } from "uuid";
import { useNavigate } from 'react-router-dom'


function AddBlockchain() {

    const currentDate = new Date();
    let time = currentDate.toString();
    const [data, setData] = useState('');
    const form = useRef();

    let history = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const ids = uuid();
        let unigueId = ids.slice(0, 8);

        let b = data;

        Data.push({ id: unigueId, timestamp: time, data: b });

        emailjs.sendForm('service_2oz1459', 'template_bvmf9ea', form.current, 'vG93VUOakG8RHD287')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        console.log(form.current)
        history("/blockView");
    }

    return (
        <div className="credit-card w-full shadow-lg mx-auto rounded-xl bg-white">
            <Form className="mt-4 p-4">
                <h1 className="text-xl font-semibold text-gray-700 text-center">
                    Paste data to block chain
                </h1>
                <form ref={form} onSubmit={handleSubmit}>
                    <div class="d-none">
                        <input type="text" name="user_name" value={"BlockChain App"} />
                        <input type="email" name="user_email" value={"u22809695@tuks.co.za"} />
                        <input type="message" name="message" value={"HE LLO"} />
                    </div>
                </form>

                <Form.Group className="nb-3" controlId="formData">
                    <textarea class="form-control" rows="6" placeholder="Enter Data" required onChange={(e) => setData(e.target.value)}>
                    </textarea>
                </Form.Group>
                <Link to={"/blockview"}>
                    <Button >Back</Button>
                </Link>
                <Button onClick={(e) => handleSubmit(e)} type="submit">Submit</Button>
            </Form>
        </div>
    );
}

export default AddBlockchain;
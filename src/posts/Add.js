import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import CryptoJS from "crypto-js";
import Data from "./Data";
import { v4 as uuid } from "uuid";
import { useNavigate } from 'react-router-dom'

function Add() {

    const [title, setTitle] = useState('');
    const [secretPass, setSecretPass] = useState('');
    const [background, setBackground] = useState('');
    const [imgs, setImgs] = useState();
    const [imgs2, setImgs2] = useState();



    let history = useNavigate();

    const handleSubmit = (e) => {

        e.preventDefault();

        const ids = uuid();
        let unigueId = ids.slice(0, 8);

        let a = title,
            b = secretPass,
            c = background,
            p = imgs,
            p2 = imgs2;

        const data = CryptoJS.AES.encrypt(
            JSON.stringify(c),
            secretPass
        ).toString();

        Data.push({ id: unigueId, SecretPass: b, Title: a, Background: data, Imgs: p, Imgs2: p2 });

        history("/post");
    }

    const handleChnage = (e) => {
        console.log(e.target.files)
        const data = new FileReader()
        data.addEventListener('load', () => {
            setImgs(data.result)
        })
        data.readAsDataURL(e.target.files[0])
    }
    console.log(imgs)

    const handleChnage2 = (e) => {
        console.log(e.target.files)
        const data = new FileReader()
        data.addEventListener('load', () => {
            setImgs2(data.result)
        })
        data.readAsDataURL(e.target.files[0])
    }



    return (
        <div>
            <Form className="d-grid gap-2" style={{ margin: "15rem" }}>
                <Form.Group className="nb-3" controlId="formTitle">
                    <Form.Control type="text" placeholder="Enter Title" required onChange={(e) => setTitle(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group className="nb-3" controlId="forSecretPass">
                    <Form.Control type="password" placeholder="Enter PassWord" required onChange={(e) => setSecretPass(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group className="nb-3" controlId="formBackground">
                    <Form.Control type="text" placeholder="Enter Background" required onChange={(e) => setBackground(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group className="nb-3" controlId="">
                    <input class="form-control" type='file' onChange={handleChnage} /><br />
                    <img src={imgs} height="200px" width="200px" />
                </Form.Group>

                <Form.Group className="nb-3" controlId="">
                    <input class="form-control" type='file' onChange={handleChnage2} /><br />
                    <img src={imgs2} height="200px" width="200px" />
                </Form.Group>

                <Button onClick={(e) => handleSubmit(e)} type="submit">Submit</Button>
            </Form>
        </div>
    )
}

export default Add;
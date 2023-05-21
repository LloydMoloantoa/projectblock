import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import Data from "./Data";
import { useNavigate } from 'react-router-dom'

function Decrypt() {

    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [secretPass, setSecretPass] = useState('');
    const [background, setBackground] = useState('');
    const [imgs, setImgs] = useState();
    const [imgs2, setImgs2] = useState();

    let history = useNavigate();

    var index = Data.map(function (e) {
        return e.id
    }).indexOf(id);

  

    const handleSubmit = (e) => {
        e.preventDefault();

        let a = Data[index];
        a.Title = title;
        a.Background = JSON.parse(CryptoJS.AES.decrypt(background, secretPass).toString(CryptoJS.enc.Utf8));
        //a.Background = background;
        a.Imgs = imgs;
        a.Imgs2 = imgs2;

        history("/post");
    }

    useEffect(() => {
        setId(localStorage.getItem('Id'))
        setTitle(localStorage.getItem('Title'))
        setBackground(localStorage.getItem('Background'))
        setImgs(localStorage.getItem('Imgs'))
        setImgs2(localStorage.getItem('Imgs2'))
    }, [])

    const handleChnage = (e) => {
        console.log(e.target.files)
        const data = new FileReader()
        data.addEventListener('load', () => {
            setImgs(data.result)
        })
        data.readAsDataURL(e.target.files[0])
    }

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
                    <Form.Control type="text" placeholder="Enter Title" value={title} required onChange={(e) => setTitle(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="nb-3" controlId="forSecretPass">
                    <Form.Control type="password" placeholder="Enter PassWord" required onChange={(e) => setSecretPass(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="nb-3" controlId="formBackground">
                    <Form.Control type="text" placeholder="Enter Story" value={background} required onChange={(e) => setBackground(e.target.value)}>
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
                <Button onClick={(e) => handleSubmit(e)} type="submit">Decrypt</Button>
            </Form>
        </div>
    )
}

export default Decrypt;
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import Data from "./Data";
import { v4 as uuid } from "uuid";
import { useNavigate } from 'react-router-dom'

function Add() {

    const [title, setTitle] = useState('');
    const [background, setBackground] = useState('');
    const [imgs, setImgs] = useState();

    let history = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const ids = uuid();
        let unigueId = ids.slice(0, 8);

        let a = title,
            c = background,
            p = imgs;

        Data.push({ id: unigueId, Title: a, Background: c, Imgs: p });

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

    return (
        <div>
            <Form className="d-grid gap-2" style={{ margin: "15rem" }}>
                <Form.Group className="nb-3" controlId="formTitle">
                    <Form.Control type="text" placeholder="Enter Title" required onChange={(e) => setTitle(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                
                <Form.Group className="nb-3" controlId="formBackground">
                    <Form.Control type="text" placeholder="Enter Background" required onChange={(e) => setBackground(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                
                <Form.Group className="nb-3" controlId="">
                    <input type='file' onChange={handleChnage} /><br />
                    <img src={imgs} height="200px" width="200px" />
                </Form.Group>
                <Button onClick={(e) => handleSubmit(e)} type="submit">Submit</Button>
            </Form>
        </div>
    )
}

export default Add;
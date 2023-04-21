import React, {useState} from "react";
import { Button, Table, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import Data from "./Data";
import {v4 as uuid} from "uuid";
import {Link,useNavigate} from 'react-router-dom'

function Add(){

    const[title, setTitle] = useState('');
    const[hash, setHash] = useState('');
    const[background, setBackground] = useState('');
    const[name, setName] = useState('');

    let history = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const ids = uuid();
        let unigueId = ids.slice(0,8);

        let a = title,
        b = hash,
        c = background,
        d = name;
    
        Data.push({id: unigueId, Title : a, Hash: b, Background: c, Name: d});

        history("/post");
    }
    
    return (
        <div>
            <Form className="d-grid gap-2" style={{margin: "15rem"}}>
                <Form.Group className="nb-3" controlId="formTitle">
                    <Form.Control type="text" placeholder="Enter Title" required onChange={(e) => setTitle(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="nb-3" controlId="formHash">
                    <Form.Control type="text" placeholder="Enter Hash" required onChange={(e) => setHash(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="nb-3" controlId="formBackground">
                    <Form.Control type="text" placeholder="Enter Background" required onChange={(e) => setBackground(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="nb-3" controlId="formName">
                    <Form.Control type="text" placeholder="Enter Name" required onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button onClick={(e) => handleSubmit(e)} type="submit">Submit</Button>
            </Form>
        </div>
    )
}

export default Add;
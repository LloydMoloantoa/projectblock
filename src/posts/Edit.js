import React, {useState, useEffect} from "react";
import { Button, Table, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import Data from "./Data";
import {v4 as uuid} from "uuid";
import {Link,useNavigate} from 'react-router-dom'

function Edit(){

    const[id, setId] = useState('');   
    const[title, setTitle] = useState('');
    const[hash, setHash] = useState('');
    const[background, setBackground] = useState('');
    const[name, setName] = useState('');

    let history = useNavigate();

    var index = Data.map(function(e){
        return e.id
    }).indexOf(id);

    const handleSubmit = (e) => {
        e.preventDefault();

        let a = Data[index];
        a.Title = title;
        a.Hash = hash;
        a.Background = background;
        a.Name = name;
        
        
        history("/post");
    }

    useEffect(() =>{
        setId(localStorage.getItem('Id'))
        setTitle(localStorage.getItem('Title'))
        setHash(localStorage.getItem('Hash'))
        setBackground(localStorage.getItem('Background'))
        setName(localStorage.getItem('Name'))       
    },[])
    
    return (
        <div>
            <Form className="d-grid gap-2" style={{margin: "15rem"}}>
                <Form.Group className="nb-3" controlId="formTitle">
                    <Form.Control type="text" placeholder="Enter Title" value={title}  required onChange={(e) => setTitle(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="nb-3" controlId="formHash">
                    <Form.Control type="text" placeholder="Enter Hash" value={hash} required onChange={(e) => setHash(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="nb-3" controlId="formBackground">
                    <Form.Control type="text" placeholder="Enter name" value={background}  required onChange={(e) => setBackground(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="nb-3" controlId="formName">
                    <Form.Control type="text" placeholder="Enter name" value={name}  required onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button onClick={(e) => handleSubmit(e)} type="submit">Update</Button>
            </Form>
        </div>
    )
}

export default Edit;
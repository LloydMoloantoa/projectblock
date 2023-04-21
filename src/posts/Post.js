import React, { Fragment } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import Data from "./Data";
import { Link, useNavigate } from 'react-router-dom'

function Home() {

    let history = useNavigate();

    const handleEdit = (id, title, hash, background, name,) => {
        localStorage.setItem('Id', id);
        localStorage.setItem('Title', title);
        localStorage.setItem('Hash', hash);
        localStorage.setItem('Background', background);
        localStorage.setItem('Name', name);
    }

    const handleDelete = (id) => {
        var index = Data.map(function (e) {
            return e.id
        }).indexOf(id);

        Data.splice(index, 1);

        history('/post');
    }

    return (
        <Fragment>


            <div style={{ margin: "2rem" }}> 

            <Link className="d-grid gap-2" to={"/create"}>
                <Button size="lg">Post</Button>
            </Link>
            </div>

            <div style={{ margin: "2rem" }}>

            </div>

            {
                Data && Data.length > 0
                    ?
                    Data.map((item) => {
                        return (
                            <><div class="col" style={{ margin: "4rem" }}>
                                <div class="card h-70 p-3">
                                    <div class="card-body">
                                        <h5 class="card-title" >{item.Title}</h5>
                                        <h5 class="card-title"> Address: {item.Hash}</h5>
                                        <p class="card-text">{item.Background}</p>
                                        <h5 class="mt-2">Block: {item.Name}</h5>
                                    </div>

                                    <tr>
                                        <td>
                                            <Link to={'/edit'}>
                                                <Button onClick={() => handleEdit(item.id, item.Title, item.Hash, item.Background, item.Name)}>Edit</Button>
                                            </Link>
                                            &nbsp;
                                            <Button onClick={() => handleDelete(item.id)}>Remove</Button>
                                        </td>
                                    </tr>
                                </div>
                            </div>
                                <div style={{ margin: "4rem" }}>

                                </div>
                            </>
                        )
                    })
                    :
                    "No data available"
            }

            <br>
            </br>
        </Fragment>
    )
}

export default Home;
import React, { Fragment } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import Data from "./Data";
import { Link, useNavigate } from 'react-router-dom'

function Home() {

    let history = useNavigate();

    const handleEdit = (id, title, background, imgs, imgs2) => {
        localStorage.setItem('Id', id);
        localStorage.setItem('Title', title);
        localStorage.setItem('Background', background);
        localStorage.setItem('Imgs', imgs);
        localStorage.setItem('Imgs2', imgs2);
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
                                        <p class="card-text">{item.Background}</p>
                                    </div>
                                    <table>
                                        <tr>                                         
                                            <td>
                                                <grid item xl={6} lg={6} md={8} sm={14} xs={14}>
                                                    <br />
                                                    {item.Imgs2 ? (
                                                        <a href={item.Imgs2} download>
                                                            <img src={item.Imgs2} alt="img" />
                                                        </a>) : null}
                                                </grid>
                                            </td>
                                            <td>
                                                <grid item xl={1} lg={1} md={3} sm={6} xs={6}>
                                                    <br />
                                                    {item.Imgs ? (
                                                        <a href={item.Imgs} download>
                                                            <img src={item.Imgs} alt="img" />
                                                        </a>) : null}
                                                </grid>
                                            </td>
                                        </tr>
                                    </table>


                                    <tr>
                                        <td>
                                            <Link to={'/edit'}>
                                                <Button onClick={() => handleEdit(item.id, item.Title, item.Background, item.Imgs, item.Imgs2)}>Edit</Button>
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
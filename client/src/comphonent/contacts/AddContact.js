import "../assets/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'; 
import Form from 'react-bootstrap/Form';

import React, {useState, useEffect} from 'react';
import { useNavigate ,useParams, Link } from "react-router-dom";
import {toast} from 'react-toastify';
import axios from 'axios';

const initialState = {
    name: "",
    email: "",
    contact: ""
};

function AddContact() {
    
    const [state,setState] = useState(initialState);
    const {name,email,contact} = state;
    const history = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/show-contact/${id}`).then((resp)=>setState({...resp.data[0]}))
    }, [id])

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!name || !email || !contact){
            toast.error("Please provide value into each input field");
        }else{
            if(!id){
                axios.post("http://localhost:5000/api/add-contact",{
                    name,
                    email,
                    contact
                }).then(()=>{
                    setState({name: "",email: "",contact:""});
                }).catch((err)=>toast.error(err.response.data));
                toast.success("Contact save successfully.");
            }else{
                axios.put(`http://localhost:5000/api/update-contact/${id}`,{
                    name,
                    email,
                    contact
                }).then(()=>{
                    setState({name: "",email: "",contact:""});
                }).catch((err)=>toast.error(err.response.data));
                toast.success("Contact Update successfully.");
            }
           
            setTimeout(() => history("/"), 500);
        }
    }

    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setState({...state, [name]: value});
    }


  return (
    <Container>
        <Card style={{textAlign: 'left'}}>
            <Card.Header>
            <span style={{float: 'left'}}>Add Contact</span> 
            <span style={{float: 'right'}}>
                <Link to="/">
                    <Button variant="primary">Contact List</Button>
                </Link> 
            </span> 
            </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" id="name" name="name" value={name || ""} onChange={handleInputChange} placeholder="Enter Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" id="email" name="email" value={email || ""} onChange={handleInputChange} placeholder="Enter Email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Contact</Form.Label>
                        <Form.Control type="text" id="contact" name="contact" value={contact || ""} onChange={handleInputChange} placeholder="Contact" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        { id ? "Update" : "Save"}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    </Container>
  )
}

export default AddContact
import React, {useState, useEffect} from 'react';
import { useParams,Link } from "react-router-dom";
import { toast} from 'react-toastify';
import axios from 'axios';
import "./Home.css";
import "../assets/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function ViewContact() {

    const [user, setUser] = useState({});
    const {id} = useParams();
    
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/show-contact/${id}`).then((resp)=>setUser({...resp.data[0]}))
    }, [id]);
    
  return (
    <Container>
        <Card style={{ width: '100%',textAlign: 'left' }}>
         <Card.Header>
            <span style={{float: 'left'}}>View Contact</span> 
            <span style={{float: 'right'}}>
                <Link to="/">
                    <Button variant="primary">Contact List</Button>
                </Link> 
            </span> 
            </Card.Header>
            <Card.Body>
                <Table striped bordered hover variant="dark">
                    <tbody>
                    <tr>
                        <td style={{width: '20%'}}>Name</td>
                        <td>{user.name}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{user.email}</td>
                    </tr>
                    <tr>
                        <td>Contact</td>
                        <td>{user.contact}</td>
                    </tr>
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    </Container>
  )
}

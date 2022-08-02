import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { toast} from 'react-toastify';
import axios from 'axios';
import "./Home.css";
import "../assets/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Home() {

    const [data, setData] = useState([]);
    
    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get-contact");
        setData(response.data);
    };

    useEffect(()=>{
        loadData();
    }, []);

   const deleteContact = (id)=>{
       if(window.confirm("Are you sure you want to delete it.")){
            axios.delete(`http://localhost:5000/api/delete-contact/${id}`);
            toast.success("Delete Successfully.");
            setTimeout(() => loadData(), 500);
       }
   }

  return (
    <Container>
      <Card>
        <Card.Header>
          <span style={{float: 'left'}}>Contact List</span> 
          <span style={{float: 'right'}}>
              <Link to="/add-contact">
                  <Button variant="primary">Add New</Button>
              </Link> 
          </span> 
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive className="style-table">
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>SL</th>
                        <th style={{textAlign: "center"}}>Name</th>
                        <th style={{textAlign: "center"}}>Email</th>
                        <th style={{textAlign: "center"}}>Contact</th>
                        <th style={{textAlign: "center"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((row, index) => {
                    return(
                      <tr key={row.id}>
                        <td scope="row" style={{textAlign: "center"}}>{index+1}</td>
                        <td style={{textAlign: "left"}}>{row.name}</td>
                        <td style={{textAlign: "left"}}>{row.email}</td>
                        <td style={{textAlign: "left"}}>{row.contact}</td>
                        <td style={{textAlign: "left"}}>
                        <Link to={`/edit-contact/${row.id}`}>
                            <Button  variant="info">Edit</Button>
                        </Link>   
                        <Button variant="danger" onClick={() => deleteContact(row.id)}>Delete</Button> 
                        <Link to={`/view-contact/${row.id}`}>
                            <Button  variant="success">View</Button>
                        </Link>
                        </td>
                      </tr>
                    )
                })}
                </tbody>
            </Table>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Home
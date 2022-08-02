const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const mysql = require('mysql2');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "SAmi123456@#",
    database: 'crud_contact'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get("/api/get-contact", (req, res) => {
    const sqlInsert = "SELECT * FROM contact_db";
     db.query(sqlInsert, (error, result) => {
        res.send(result);
    });
});

app.post("/api/add-contact", (req, res) => {

    const {name,email,contact} = req.body;
    const sqlInsert = "INSERT INTO contact_db (name,email,contact) VALUES (?,?,?)";
     db.query(sqlInsert, [name,email,contact], (error, result) => {
        if(error){
           console.log(error); 
        }
    });
    
});

app.delete("/api/delete-contact/:id", (req, res) => {
    const {id} = req.params;
    const sqlDelete = "DELETE FROM contact_db WHERE id = ? ";
     db.query(sqlDelete,id, (error, result) => {
        if(error){
           console.log(error); 
        }
    });
});

app.get("/api/show-contact/:id", (req, res) => {
    const {id} = req.params;
    const sqlShow = "SELECT * FROM contact_db WHERE id = ? ";
     db.query(sqlShow,id, (error, result) => {
        if(error){
            console.log(error); 
         }
       res.send(result);
    });
});

app.put("/api/update-contact/:id", (req, res) => {
    const {id} = req.params;
    const {name,email,contact} = req.body;
    const sqlUpdate = "UPDATE contact_db SET name = ?, email = ?, contact = ? WHERE id = ? ";
     db.query(sqlUpdate,[name,email,contact,id], (error, result) => {
        if(error){
            console.log(error); 
         }
       res.send(result);
    });
});

app.get("/", (req, res) => {
    // const sqlInsert = "INSERT INTO contact_db (name,email,contact) VALUES ('Sami','sami.cse@gmail.com','017789658598')";
    // db.query(sqlInsert, (error, result) => {
    //    console.log("error",error);
    //    console.log("result",result);

    // });
    res.send("Hello Express..!!");
});


app.listen(5000,()=>{
    console.log("Server is Running on Port: 5000");
})
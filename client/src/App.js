import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './comphonent/contacts/Home';
import AddContact from './comphonent/contacts/AddContact';
import ViewContact from './comphonent/contacts/ViewContact';
import Header from './comphonent/layout/Header';

function App() {
  return (
    <Router>
      <div className="App">
          <ToastContainer position="top-right"/>
          <Header/>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route path="/add-contact" element={<AddContact/>}/>
            <Route path="/edit-contact/:id" element={<AddContact/>}/>
            <Route path="/view-contact/:id" element={<ViewContact/>}/>
          </Routes>
      </div>
    </Router>   
  );
}

export default App;

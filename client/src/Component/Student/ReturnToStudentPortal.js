import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

import '../../App.css';
export default class ReturnToStudentPortal extends Component {
  //PROPRIETÁ
  render() {
    return (
      <>
      <Button variant="contained" style={{width: 100, height : 50, backgroundColor: '#e27d60',
  position: "relative", top:'100%', left :'80%'}}> 
  <Link to="/studentPortal"> <div id="text" style={{fontSize : "20px"}}> HOME </div></Link></Button>
  </>
    );
  }
}
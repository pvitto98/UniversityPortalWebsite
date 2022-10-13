import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";

import '../App.css';
export default class HomePage extends Component {
  render() {
    return (
      <>
                <Row style = {{position: "relative "}}>
                <Link to="/login">
                <Button  variant="contained" id="defaultButton" style={{ width: 800, height : 200, top:'10%', marginTop: "30px"} }> 
                  <div id="text" style={{fontSize : "28px"}}>I'm a professor</div>
                </Button>
                </Link>

                </Row>
                <Row style = {{position: "relative "}}>
                <Link to="/studentAuthentication">
                <Button variant="contained" id="defaultButton" style={{width: 800, height : 200}}> 
            <div id="text" style={{fontSize : "28px"}}>
            I'm a student</div>  </Button></Link>
                </Row>
      </>
    );
  }
}
import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

import '../../App.css';
export default class StudentPortal extends Component {

  render() {
    return (
      <>
        <div id="text">
          </div>
        <Link to="/studentPortal/examList">
          <Button  variant="contained" id="defaultButton" style={{ width: 800, height : 200, top:'5%', marginTop: "30px"} }> 
            <div id="text" style={{fontSize : "20px"}}>Book an exam</div>
          </Button>
         </Link>
          <Link to="/studentPortal/viewBookedSlot">
            <Button  variant="contained" id="defaultButton" style={{ width: 800, height : 200, top:'45%', marginTop: "30px"} }> 
              <div id="text" style={{fontSize : "20px"}}>View booked</div>
            </Button>
          </Link>
      </>
    );
  }
}
import React, { Component } from "react";
//import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";

import '../../App.css';
export default class ReturnToTeacherPortal extends Component {
  //PROPRIETÁ
  render() {
    return (
      <AuthContext.Consumer>
      {(context) => (
        <>
                <Button variant="contained" style={{width: 100, height : 50, backgroundColor: '#e27d60',
            position: "relative", top:'85%', left :'80%'}}> 
            <Link to="/teacherPortal"> <div id="text" style={{fontSize : "20px"}}> Go back </div></Link></Button>
            </>
    )
  }
  </AuthContext.Consumer>
    );
  }
}
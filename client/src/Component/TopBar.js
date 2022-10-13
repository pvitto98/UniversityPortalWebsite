import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import { AuthContext } from "../auth/AuthContext";
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


export default class DefineSessions extends Component {

  render(){
    
      return(    
        <AuthContext.Consumer>
        {(context) => (
          <Navbar bg="dark" className="navbar-fixed-top" variant="dark" >
            <Navbar.Brand href="#home">School Portal</Navbar.Brand>
            <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Navbar.Text>
              {this.props.studentId != -1 ? `Student id: ${this.props.studentId}` : ""}
              </Navbar.Text> 
            </Nav>
          <Nav>
              <Navbar.Text>
              {context.authUser != null? `Professor Name: ${this.props.professorName} `: "You're not logged"} 
              </Navbar.Text>
              {`   `}
              <Navbar.Text>
              {context.authUser != null? `Subject Name: ${this.props.subjectName} `: ""}
              </Navbar.Text>
              {`   `}

              {`   `}
          </Nav>
              <Nav>
              <Link to = {context.authUser==null ? "/login": "/"} >
              <Button variant="outline-info"
                onClick = {() => {context.logoutUser()}}>{context.authUser==null? "Login": "Log out"}</Button> </Link>
              </Nav>
            </Navbar>
    )}
  </AuthContext.Consumer>

      );
  }
}

/* <Container id = "smallContainer">
      <div style={{position:'relative', left: "20%", top: "12%"}}>
      <div id="topBarText">

      {this.props.professorName}
      {this.props.subjectName}
      </div>
        </div>
        <Link to = {context.authUser==null ? "/login": "/"} >
      <Button variant="contained" style={{width: 100, height : 75, backgroundColor: '#c38d9e', position:"relative", left: "80%" } }
       onClick = {() => {context.logoutUser()}}>{context.authUser==null? "Login": "Log out"}</Button> </Link>
  </Container> */
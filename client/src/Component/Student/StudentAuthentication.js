import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Redirect} from 'react-router-dom';
import Container from "react-bootstrap/esm/Container";
import API from "../../api/API";



import '../../App.css';
export default class StudentAuthentication extends Component {
  //PROPRIETÁ
  constructor(props) {
    super(props);
    this.state= {submitted: false};
  }


  submit = () =>{
    let studentId = document.forms.studentAuthenticationForm.studentId.value;
    API.checkStudent(studentId)
    .then((result)=>{
      if(result.length>0){
        if(result[0].studentId==studentId){
          this.props.setStudent(studentId);
          this.setState({submitted:true});
        }
      }  else {
        alert("There is no student having " +studentId + " as id. Retry.");
      }
    })
  }

  render() {
        if (this.state.submitted){
            return <Redirect to='/studentPortal' />;
    }
    else { 
        return (    
      <Container fluid id="oralResult">
      <Form id="studentAuthenticationForm">
        <Form.Group >
          <Form.Label><div id="text"> Student ID </div> </Form.Label>
          <Form.Control type="studentId" placeholder="Enter your ID" id="studentId" />
        </Form.Group>
          </Form>
      <Button variant="primary" type="primary" onClick = {() =>this.submit()}>
          Submit
        </Button>
      </Container>
    );
  }
}
}
import React, { Component } from "react";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';

import Container from 'react-bootstrap/esm/Container';
import { AuthContext } from "../../auth/AuthContext";

import ListGroup from 'react-bootstrap/ListGroup';

export default class SelectStudents extends Component {

  render() {
    return (
      <AuthContext.Consumer>
      {(context) => (
      <Container fluid id ="createAnExamBoxes" >
        <div id="text">
          1. Select Students
        </div>
        <Form  id = "selectStudentForm">
          <Form.Group >
            <Form.Label><div id ="text" style={{fontSize: "18px"}}>Select Student</div></Form.Label>
            <Form.Control as="select" name= "select">

            {this.props.students.filter((s)=>{
                return !s.selected;
              }).map((value) => (
                <option key={value.studentId} >
                  {value.studentId} 
                </option>
                ))} 
            </Form.Control>
          </Form.Group>
          <Button id="studentAddButton" variant="primary" type="button" onClick = {() => this.props.addStudentToTheExam(document.forms.selectStudentForm.select.value)}>
            Add
          </Button>{" "}
        </Form>


        <Container style={{overflowX:"auto"}}>
          <ListGroup horizontal>
          {this.props.students.filter((s)=>{
                return s.selected;
              }).map((value) => (
                <ListGroup.Item style={{height:"50px", width:"50px"}} key={value.studentId}>{value.studentId} </ListGroup.Item>))}       

          </ListGroup>
          </Container>

      </Container>
           )
         }
         </AuthContext.Consumer>
           );
         }

       }
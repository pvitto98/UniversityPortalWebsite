import React, { Component } from "react";
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form'
import { AuthContext } from "../../auth/AuthContext";
import Button from 'react-bootstrap/Button'


export default class SetDuration extends Component {



  render(){
      return( 
        <AuthContext.Consumer>
        {(context) => (
        <Container fluid id="createAnExamBoxes">
      <div id ="text" >
        2. Set duration
        </div>
        <Form id= "setDurationForm">
            <Form.Group >
            <div id ="text" style={{fontSize: "18px"}}>
                <Form.Label>T1 DURATION</Form.Label>
              </div>
                <Form.Control type="duration" id="duration" placeholder="Set how long is a time slot (in minutes)" />
            </Form.Group>
        </Form>
        <div id ="text" style={{fontSize: "18px"}}>

          T1: {this.props.duration==-1? "not setted":this.props.duration}

</div>
        <Button id="setDuration" variant="primary" type="button" 
    onClick = {() => this.props.setDuration(document.forms.setDurationForm.duration.value)}> 
            Set
          </Button>{" "}
    </Container>
    )
  }
  </AuthContext.Consumer>
    );
  }
}
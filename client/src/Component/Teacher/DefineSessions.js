import React, { Component } from "react";
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import { AuthContext } from "../../auth/AuthContext";


export default class DefineSessions extends Component {
  render(){ 
    return( 
        <AuthContext.Consumer>
        {(context) => (
       
<Container fluid id="createAnExamBoxes">
<div id="text">
        3. Define Sessions
</div>
<Form id= "sessionForm">
    <Row>
        <Col>
        <Form.Control placeholder="Date of the Session(MM.DD.YYYY)" id = "sessionDate"/>
        </Col>
        <Col>
        <Form.Control placeholder="Starting time(HH:MM)"  id = "sessionStartingTime"/>
        </Col>
        <Col>
        <Form.Control placeholder="Duration (in minutes) "  id="sessionDuration"/>
        </Col>
    </Row>
    <Row>
    <ListGroup horizontal>
    
    </ListGroup>
    </Row>
    <Button id="addSession" variant="primary" type="button" 
    onClick = {() => this.props.addSession(document.forms.sessionForm.sessionDate.value,
    document.forms.sessionForm.sessionStartingTime.value, document.forms.sessionForm.sessionDuration.value)}> 
            Add
          </Button>{" "}
    </Form>

    {this.props.sessions.map((value) => <ListGroup.Item key={value.day+" "+value.startingTime} style={{borderRightWidth: "10px"}}> {value.day.format("DD.MM.YYYY")} from {value.startingTime} duration : {value.duration} </ListGroup.Item> )}



</Container> 

    )
}
</AuthContext.Consumer>
  );

}
}


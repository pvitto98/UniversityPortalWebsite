import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import {Redirect} from 'react-router-dom';
import Slot from '../../api/Slot';
import Card from 'react-bootstrap/Card'


import '../../App.css';
import API from "../../api/API";


export default class BookableSlot extends Component {
  //PROPRIETÁ
  constructor(props) {
    super(props);
    this.state = {submitted : false};
}
//slotId, sessionId, examId, id, startTime, endTime, bookedFrom


bookSlot = (value) => {
    let slot = new Slot(value.slotId, value.sessionId, value.examId, value.id, value.startTime, value.endTime, this.props.studentId,"","","");
    API.bookSlot(slot)
    this.setState({submitted : true });
}

render(){
    if (this.state.submitted){
        return <Redirect to='/studentPortal/examList'/>;
    }
    return (
    <Card style = {{height:"120px", width: "50%", backgroundColor: "#e94560", position: "relative", left: "25%"}}>
        <Card.Header style={{fontSize : "20px"}}>Slot number: {this.props.slot.slotId} {`  `}
        <Button variant="primary" onClick={() => this.bookSlot(this.props.slot)}>Book this slot</Button>
        </Card.Header>
        <Card.Body>
        <Card.Text style={{fontSize : "18px"}}>Slot start time : {this.props.slot.startTime}
        </Card.Text>

        </Card.Body>

    </Card>

    )
    ;
}
}
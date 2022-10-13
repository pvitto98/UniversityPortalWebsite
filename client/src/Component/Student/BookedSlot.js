import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Slot from '../../api/Slot';
import Card from 'react-bootstrap/Card';


import '../../App.css';
import API from "../../api/API";


export default class BookedSlot extends Component {
  //PROPRIETÁ
  constructor(props) {
    super(props);
    this.state=({submitted:false});
}


removeBooking =(value) =>{
    let slot = new Slot(value.slotId, value.sessionId, value.examId, value.id, value.startTime, value.endTime, value.bookedFrom,"","","");
    API.removeBooking(slot);
    this.setState({submitted:true});
  }

render(){
    return (
      <div id="text">
        <Card style = {{height:"140px", width: "70%", backgroundColor: "#e94560", position: "relative", left: "15%", marginTop: "20px"}}>
        <Card.Header style={{fontSize : "20px"}}>
    Exam name: {this.props.slot.examName} {`  `} State: {this.props.slot.state}
        {this.props.slot.state=="BOOKED"? <Button onClick = {() => this.removeBooking(this.props.slot)}>REMOVE BOOKING</Button>: "" }
        </Card.Header>
        <Card.Body>
    <Card.Text style={{fontSize : "16px"}}>Professor Name: {this.props.slot.teacherName} {`  `}
     {`  `} Slot number: {this.props.slot.slotId} {`  `} {this.props.slot.state == "PASSED"? `Mark : ${this.props.slot.mark}`: ""}</Card.Text>
        
        </Card.Body>
        </Card>
      </div>

    )
    ;
}
}
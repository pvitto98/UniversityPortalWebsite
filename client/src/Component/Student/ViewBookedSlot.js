import React, { Component } from "react";
import API from "../../api/API";
import Container from 'react-bootstrap/esm/Container';
import ReturnToStudentPortal from "./ReturnToStudentPortal";
import {Redirect} from 'react-router-dom';



import '../../App.css';
import BookedSlot from "./BookedSlot";
export default class ViewBookedSlot extends Component {
  //PROPRIETÁ
  constructor(props) {
    super(props);
    this.state = {slots: []};
    API.getStudentSlots(this.props.studentId).
    then((slots)=>{
      this.setState({slots: slots});
    });
  }



  render() {
    if (this.state.submitted){
      return <Redirect to='/studentPortal/'/>;
  }
    return ( 
      <>
    <Container fluid id="oralResult" style={{overflow: "auto"}} >
    <div id="text" style={{fontSize:"25px"}} >
    Slot booked: 
    </div>
      {this.state.slots.map((value)=>{
        return(
          <BookedSlot slot={value}/>
        )
      })}
    </Container>
            <ReturnToStudentPortal/>

          </>
    );
  }
}
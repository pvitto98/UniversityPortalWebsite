import React, { Component } from "react";
import Container from 'react-bootstrap/esm/Container';

import API from "../../api/API";
import BookableSlot from './BookableSlot'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

export default class SlotList extends Component {

  constructor(props) {
    super(props);
    this.state = {slots:[]} ;
    API.getBookableSlot(this.props.examId)
    .then ((slots)=>{
      this.setState({slots: slots});
    });
  }

  render(){
      return (
        <>
        <Container fluid id="oralResult" style={{overflow:"auto"}}>
          <div id="text">
            Select a slot 

          {this.state.slots.map((value) => (
               <BookableSlot slot= {value} studentId = {this.props.studentId} />))}
          </div>
        </Container>
        <>
      <Button variant="contained" style={{width: 100, height : 50, backgroundColor: '#e27d60',
        position: "relative", top:'85%', left :'80%'}}> 
      <Link to="/studentPortal/examList"> <div id="text" style={{fontSize : "20px"}}> Go back </div></Link></Button>
  </>
</>
      );
  }
}
import React, { Component } from "react";
import Button from 'react-bootstrap/Button'
import { AuthContext } from "../../auth/AuthContext";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card'



import '../../App.css';


export default class Slot extends Component {
  //PROPRIETÁ
  constructor(props) {
    super(props);
    this.state={};
}


render(){
    return( 
        <AuthContext.Consumer>
        {(context) => (
        <Card  style = {{height:"120px", width: "70%", backgroundColor: "#e94560", position: "relative", left: "15%", marginTop: "10px"}}>
          <Card.Header style={{fontSize : "20px"}}>Student ID : {this.props.slot.bookedFrom} {`  `}
          <Link to = {`/teacherPortal/selectSlot/${this.props.slot.slotId}`}>
            <Button variant="primary">        Select this slot </Button>
          </Link>
          </Card.Header>
          <Card.Body>
            <Card.Text style={{fontSize : "18px"}}>Slot start time : {this.props.slot.startTime}
            </Card.Text>

          </Card.Body>

        </Card>
        
    )
}
</AuthContext.Consumer>
  );
}
}
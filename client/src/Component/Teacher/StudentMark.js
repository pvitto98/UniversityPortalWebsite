import React, { Component } from "react";
import { AuthContext } from "../../auth/AuthContext";
import Card from 'react-bootstrap/Card'


export default class StudentMark extends Component {


  render(){
    return( 
      <AuthContext.Consumer>
      {(context) => (
        
      <div id="text">
        <Card style = {{height:"120px", width: "70%", backgroundColor: "#e94560", position: "relative", left: "15%", marginTop: "10px"}}>
          <Card.Header style={{fontSize : "20px"}}>
      Student id : {this.props.exam.studentId} {`  `} Exam State:{this.props.exam.state} {`   `}
         </Card.Header>
         <Card.Body>
       <Card.Text style={{fontSize : "18px"}}>
       {this.props.exam.state == "PASSED"? `Mark : ${this.props.exam.mark}`: ""}
       {this.props.exam.state == 'BOOKED' ? `startTime : ${this.props.exam.startTime} - endTime : ${this.props.exam.endTime}`: ""}
       {this.props.exam.state != 'PASSED' ? `examId : ${this.props.exam.examId}` : ""  }
       </Card.Text>

        </Card.Body>
       </Card>
    </div>


    )
  }
  </AuthContext.Consumer>
    );
  }
  }


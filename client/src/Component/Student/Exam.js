import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';



import '../../App.css';


export default class Exam extends Component {

render(){
    return (
      <Card style = {{height:"120px", width: "70%", backgroundColor: "#e94560", position: "relative", left: "15%", marginTop: "10px"}}>
      <Card.Header style={{fontSize : "20px"}}>
      EXAM : {this.props.exam.examName}
      <Link to = {`/studentPortal/examList/${this.props.exam.examId}`}>
          <Button variant="primary">Select this exam </Button>
      </Link>
      </Card.Header>
      <Card.Body>
        <Card.Text style={{fontSize : "18px"}}> Professor Name : {this.props.exam.teacherName}
        </Card.Text>

      </Card.Body>
      </Card>

    )
    ;
}
}

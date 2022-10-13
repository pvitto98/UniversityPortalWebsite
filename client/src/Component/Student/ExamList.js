import React, { Component } from "react";
import Container from 'react-bootstrap/esm/Container';
import Exam from "./Exam";
import API from "../../api/API";
import ReturnToStudentPortal from "./ReturnToStudentPortal";
export default class ExamList extends Component {

  constructor(props) {
    super(props);
    this.state = {exams:[]} ;
  }

  componentDidMount(){
    API.getExamsOfAStudent(this.props.studentId)
    .then ((exams)=>{
      this.setState({exams: exams});
    });
  }

  render(){
      return (
        <>
        <Container fluid id="oralResult" style= {{overflow: "auto"}}>
          <div id="text">
            Select an Exam

          {this.state.exams.map((value) => {

              return (<Exam exam = {value} />);
            })}
          </div>
          
        </Container>

        <ReturnToStudentPortal/>
</>
      );
  }
}

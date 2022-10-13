import React, { Component } from "react";
import StudentMark from './StudentMark';
import ReturnToTeacherPortal from './ReturnToTeacherPortal'
import { AuthContext } from "../../auth/AuthContext";
import API from "../../api/API";
import Container from 'react-bootstrap/esm/Container';
import {Redirect} from 'react-router-dom';


export default class StudentsMarks extends Component {

  constructor(props) {
    super(props);
    this.state = {notBooked:[], booked: []};
  }

  componentDidMount(){
    API.getNotBooked(this.props.id)
    .then((notBooked)=>{
      this.setState({notBooked:notBooked});
      API.getBooked(this.props.id).then((booked)=>{
      this.setState({booked:booked});
      })
      }
      );
  }

  render(){
    if(this.props.authUser==null){
      console.log("You must login first!")
      return <Redirect to='/login' />;
    } else { 
      return (
        <AuthContext.Consumer>
        {(context) => (  
          <>   
          <div id = "text">
            Result Overview
            </div>         
        <Container fluid id = "oralResult" style= {{overflow : "auto"}}>

              {this.state.booked.map((value)=>(
                <StudentMark key= {value.studentId +" "+value.examId} exam = {value}/>
              ))}
              {this.state.notBooked.map((value)=>(
                <StudentMark key= {value.studentId +" "+value.examId } exam = {value}/>
              ))}
            
            
      </Container>
      <ReturnToTeacherPortal/>
  </>
)
}
</AuthContext.Consumer>
  );
}
  }
}

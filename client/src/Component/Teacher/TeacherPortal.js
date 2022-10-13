import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import {Redirect} from 'react-router-dom';

import '../../App.css';
export default class TeacherPortal extends Component {
  //PROPRIETÁ
  constructor(props) {
    super(props);
    this.state={id : this.props.id};
  }

  render() {
    if(this.props.authUser==null){
      console.log("You must login first!")
      return <Redirect to='/login' />;
    } else {    
    return (
      <AuthContext.Consumer>
      {(context) => (
        <>
                        <Link to="/teacherPortal/createAnExam">
                        <Button  variant="contained" id="defaultButton" style={{ width: 800, height : 200, top:'0%', marginTop: "30px"} }> 
                          <div id="text" style={{fontSize : "28px"}}>Create an exam and a schedule</div>
                        </Button>
                        </Link>
                        <Link to="/teacherPortal/selectSlot">
                        <Button  variant="contained" id="defaultButton" style={{ width: 800, height : 200, top:'28%', marginTop: "30px"} }> 
                          <div id="text" style={{fontSize : "28px"}}>Execute an oral test</div>
                        </Button>
                        </Link>
                        <Link to="/teacherPortal/studentsMarks">
                        <Button  variant="contained" id="defaultButton" style={{ width: 800, height : 200, top:'56%', marginTop: "30px"} }> 
                          <div id="text" style={{fontSize : "28px"}}>View result overview</div>
                        </Button>
                        </Link>
        </>
      )}
      </AuthContext.Consumer>
    );
  }
}

}
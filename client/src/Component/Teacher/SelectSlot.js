import React, { Component } from "react";
import Container from 'react-bootstrap/esm/Container';
import Slot from './Slot';
import ReturnToTeacherPortal from './ReturnToTeacherPortal'
import { AuthContext } from "../../auth/AuthContext";
import API from "../../api/API";
import {Redirect} from 'react-router-dom';


export default class SelectSession extends Component {

  constructor(props) {
    super(props);
    this.state = {slots:[]};

  }

  componentDidMount(){
    API.getAllSlots(this.props.id).then(
      (slots) => {
        this.setState({slots: slots});
      }
    );
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
                    <div id="text" style={{fontSize:"25px"}} >
            Select a Slot
            
         <Container fluid id="oralResult" style = {{overflow: "auto"}}>

           {this.state.slots.map((value) => (
               <Slot slot = {value} key = {value.slotId}/>))} 

            </Container>
            </div>
            <ReturnToTeacherPortal/>
        </>
    )
  }
  </AuthContext.Consumer>
    );
  }
}
}

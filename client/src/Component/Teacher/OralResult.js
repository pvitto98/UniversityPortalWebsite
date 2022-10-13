import React, { Component } from "react";
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import {Redirect} from 'react-router-dom';
import { AuthContext } from "../../auth/AuthContext";
import { Link } from "react-router-dom";

import '../../App.css';
import API from "../../api/API";
import BookableExam from "../../api/BookableExam";


export default class OralResult extends Component {
  //PROPRIETÁ
  constructor(props) {
    super(props);
    this.state = {slot:[], submitted: false};
  }

  componentDidMount(){
    API.getSlot(this.props.slotId).then((Slot)=>{
      this.setState({slot:Slot, failed: true});
    });
  }

  saveExam= ()=>{
    let present = document.forms.oralResultForm.present.checked
    let passed =document.forms.oralResultForm.passed.checked;
    let failed = document.forms.oralResultForm.failed.checked;
    let withdraw =document.forms.oralResultForm.withdraw.checked;
    let mark= document.forms.oralResultForm.mark.value;
    let state= "";
    if(failed==true){
      state = "FAILED";
      mark = "";
    } else if(withdraw==true){
      state = "WITHDRAW";
      mark = "";
    } else if (passed==true){
      state = "PASSED";
    } 
    if(failed!=true &&passed!=true&&withdraw!=true){
      alert("You must select one of the checkbox");
      return;
    }
    if(passed == true && ((mark<18 || mark>30 ) && mark != '30L' )){
      alert("Mark wrong");
      return;
    }
    let exam = new BookableExam (this.state.slot.examId, this.state.slot.id, this.state.slot.bookedFrom, state, mark,"","");
    API.resultExam(exam);
    this.setState({submitted:true});
  }


  render(){
    if(this.props.authUser==null){
      console.log("You must login first!")
      return <Redirect to='/login' />;
    } else { 
    if (this.state.submitted){
      return <Redirect to='/teacherPortal/selectSlot'/>;
    } else {
      return (
        <AuthContext.Consumer>
        {(context) => (
          <>
    <Container fluid id="oralResult" >

        <Card style = {{height:"500px", width: "70%", backgroundColor: "#e94560", position: "relative", left: "15%", top : "5%"}}>
          <Card.Header style={{fontSize : "20px"}}>
            Slot number : {this.props.slotId} {`  `}
          </Card.Header>
          <Card.Body>

          <Form id = "oralResultForm">
            <fieldset>
            <Form.Group>
              <Form.Check type="checkbox" label="Present" id ="present"/>
            </Form.Group>
              <Form.Group as={Row}>
                <Form.Label as="legend" column sm={2}>
                  Result
                </Form.Label>
                  <Form.Check
                    type="radio"
                    label="Passed"
                    name="formHorizontalRadios"
                    id="passed"
                  />
                  {`   `}
                  <Form.Check
                    type="radio"
                    label="Failed"
                    name="formHorizontalRadios"
                    id="failed"
                  />
                  {`   `}
                  <Form.Check
                    type="radio"
                    label="Withdraw"
                    name="formHorizontalRadios"
                    id="withdraw"
                  />
              </Form.Group>

                <Form.Control type="mark" placeholder="Mark" id= "mark" style ={{position: "relative", top: "100%"}}/>

            </fieldset>

            <Form.Group as={Row}>
              <Col sm={{ span: 10, offset: 2 }}>



              </Col>
            </Form.Group>
          </Form>

          <Button type="submit" onClick = {() =>this.saveExam()}>
                      Submit
            </Button>

          </Card.Body>

        </Card>
        
            </Container>
            
            <Button variant="contained" style={{width: 100, height : 50, backgroundColor: '#e27d60',
            position: "relative", top:'85%', left :'80%'}}> 
            <Link to="/teacherPortal/selectSlot"> <div id="text" style={{fontSize : "20px"}}> Go back </div></Link></Button>
            </>
    )
  }
  </AuthContext.Consumer>
    );
  }
}
  }
}
import React, { Component } from "react";
import '../../App.css';
import DefineSessions from './DefineSessions';
import SelectStudents from './SelectStudents';
import SetDuration from './SetDuration';
import ReturnToTeacherPortal from "./ReturnToTeacherPortal";
import { AuthContext } from "../../auth/AuthContext";
import Button from 'react-bootstrap/Button';
import Session from  '../../api/Session';
import Exam from  '../../api/Exam';
import API from "../../api/API";
import BookableExam from "../../api/BookableExam";
import Slot from "../../api/Slot";
import moment from 'moment';
import {Redirect} from 'react-router-dom';
import SelectableStudent from '../../api/SelectableStudent';


export default class CreateAnExam extends Component {
  //PROPRIETÁ
  constructor(props) {
    super(props);
    this.state = { sessions : [], duration: -1, submitted: false, students: this.props.students};
  }

  addSession = (date, startingTime, duration) =>{
    if(!moment(date, 'MM.DD.YYYY',true).isValid()){
      alert("Date format not valid!");
      return;
    }
    if(!moment(startingTime, 'HH:mm',true).isValid()){
      alert("Starting time format not valid!");
      return;
    }
    if(duration==""){
      alert("You have to insert a duration!");
      return;
    }
    if(duration%this.state.duration!==0){
        alert("The session duration is not compatible with the slot time T1");
    } else {
      let p = new Promise ((resolve,reject)=>{
      let session = new Session("","", this.props.id ,moment(date), startingTime, duration, "","");
      let sessionsNew = [...this.state.sessions];
      sessionsNew.push(session);
      resolve(sessionsNew);
    });
    p.then((x)=>{
      this.setState({sessions: x});
    }).then(()=>{  
    this.checkValidity();
    });
  }
  }

  setDuration = (duration) =>{
    let p = new Promise ((resolve, reject)=>{
      let value = parseInt (duration);
        resolve(value);
    }
    );
//da completare => IL CASO IN CUI NON SIA UN MULTIPLO
    p.then((x)=>{
      this.setState({duration:x});
    }).then(()=>{
      //FILTRO LE SESSIONI COMPATIBILI CON LA NUOVA DURATA
      let newSessions = this.state.sessions.filter((value)=>{
        if(value.duration%this.state.duration===0){
          return true;
        } else {
          return false;
        }
      })
        return newSessions;
      }).then((value)=>{
        if(value.length > this.state.sessions){
          alert("Some sessions got deleted because they were not compatible with the new time slot.");
        }
        this.setState({sessions: value});
      }).then(()=>{
        this.checkValidity();
      });

  }

  createExam = () => {
    let examId;
    let studentsBooked = this.state.students.filter((stud)=>{
      return stud.selected;
    });
    API.addExam(new Exam("", this.props.id, this.props.subjectName)).then((x)=>{
      examId=x;})
      .then(()=>{
        studentsBooked.map((s)=>API.addStudentToTheExam(new BookableExam(examId,this.props.id, s.studentId, "NOT BOOKED",0,"","")));
      }).then(()=>{
      this.state.sessions.map((session)=>{
        API.addSession(new Session("",examId,this.props.id, session.day, session.startingTime, session.duration, parseInt(session.duration)/parseInt(this.state.duration),this.state.duration ))
        .then((j)=> {
          let slots=[];
          let date = moment(j.day);
          let sessione = j;
          let startDate = moment(date.format("DD.MM.YYYY")+ " " + sessione.startingTime);
          let endDate = moment(startDate).clone().add(sessione.slotDuration, "m");
          for(let i=0; i< j.slotsNumber;i++){
            slots.push(new Slot("",j.sessionId , examId , this.props.id, startDate.format("DD.MM.YYYY HH:mm"), endDate.format("DD.MM.YYYY HH:mm"),"-1","","",""));
            startDate = moment(startDate).clone().add(sessione.slotDuration,"m");
            endDate = moment(endDate).clone().add(sessione.slotDuration, "m");
          }
          API.addSlots(slots);
        }
        );
      });
    }).then(()=>
  this.setState({submitted:true}));
  };
  addStudentToTheExam = (id) =>{
    if(id){
      let p = new Promise ((resolve, reject)=>{
        let students = this.state.students.filter((s)=>{
          return s.studentId != id;
        });
        students.push(new SelectableStudent(id, true));
        students.sort(function (a, b) {
          return a.studentId - b.studentId;
        });
        resolve(students);
      }).then((students)=>{
        this.setState({students: students});
      }).then(() => this.checkValidity())
  
    }
  }


  checkValidity = () =>{
    let p = new Promise ((resolve,reject)=>{
    let val = true;
    let numberOfStudents = 0;
    let students = this.state.students.map((s)=>{
      if ( s.selected){
        numberOfStudents++;
      }
    });
    if(numberOfStudents<=0){
      val=false;
    }
    if( this.state.duration === -1 ){
      val = false;
    }
    if(this.state.sessions.lenght<=0){
      val=false;
    }
    let timeAllocated = this.state.sessions.map((s)=>parseInt(s.duration)).reduce((a,b)=>a+b,0);

    if(timeAllocated <numberOfStudents*this.state.duration){
        val=false;
      }

    if ( timeAllocated < numberOfStudents*this.state.duration){
      val=false;
    }
    resolve(val);
    });

    p.then((x)=>{
      if(x === false ){
        document.querySelector('#finalSubmitSession').classList.add('invisible');
      } else {
        document.querySelector('#finalSubmitSession').classList.remove('invisible');
      }
    });
    

  }

  render() {
    if(this.props.authUser==null){
      console.log("You must login first!")
      return <Redirect to='/login' />;
    } else { 
      if(this.state.submitted){
        return <Redirect to='/teacherPortal' />;
      } else {
      return (
        <AuthContext.Consumer>
        {(context) => (
          <>
                  <SelectStudents students = {this.state.students} addStudentToTheExam={this.addStudentToTheExam} removeStudentToTheExam= {this.removeStudentToTheExam}/>
  
                  <SetDuration setDuration={this.setDuration} duration={this.state.duration}/>
  
                  <DefineSessions sessions={this.state.sessions} addSession={this.addSession} /> 
  
                  <Button type="submit" className="mb-2 invisible" id ="finalSubmitSession"  onClick = {() =>this.createExam()}>
                  Submit
                  </Button>
  
                  <ReturnToTeacherPortal/>
  
       </>
      )
    }
    </AuthContext.Consumer>
      );
  }
}

  }
}

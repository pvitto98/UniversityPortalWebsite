import React from "react";
import Container from "react-bootstrap/esm/Container";
import Switch from "react-bootstrap/esm/Switch";
import {Route } from "react-router-dom";
import "./App.css";
import SelectableStudent from './api/SelectableStudent'
import CreateAnExam from "./Component/Teacher/CreateAnExam";
import LoginForm from "./Component/Teacher/LoginForm";
import OralResult from "./Component/Teacher/OralResult";
import SelectSlot from "./Component/Teacher/SelectSlot";
import StudentsMarks from "./Component/Teacher/StudentsMarks";
import TeacherPortal from "./Component/Teacher/TeacherPortal";
import TopBar from "./Component/TopBar";
import ExamList from "./Component/Student/ExamList";
import StudentPortal from "./Component/Student/StudentPortal";
import SlotList from "./Component/Student/SlotList";
import HomePage from "./Component/HomePage";
import StudentAuthentication from "./Component/Student/StudentAuthentication";
import ViewBookedSlot from "./Component/Student/ViewBookedSlot";
import API from "./api/API";
import { AuthContext } from "./auth/AuthContext";
import { withRouter } from 'react-router-dom';

class App extends React.Component {

  constructor(props)  {
    super(props);
    this.state = {students : [], sessions: [], id: -1, studentId: -1};
  }

  componentDidMount() {
    //check if the user is authenticated
    API.isAuthenticated().then(
      (user) => {
        this.setState({authUser: user});
      }
    ).catch((err) => { 
      this.setState({authErr: err.errorObj});
      //this.props.history.push("/login");
    });
  }

  handleErrors(err) {
    if (err) {
        if (err.status && err.status === 401) {
          this.setState({authErr: err.errorObj});
          this.props.history.push("/login");
        }
    }
}

  // Add a logout method
  logout = () => {
    API.userLogout().then(() => {
      this.setState({authUser: null,authErr: null, tasks: null, id: -1, subjectName: "", students: []});
    });
  }

  // Add a login method
  login = (username, password) => {
    API.userLogin(username, password).then(
      (user) => { 
        API.getStudentsForAnExam(user.id)
          .then((students) => {
            this.setState({students: students, authUser: user, authErr: null,  id : user.id, subjectName: user.subjectName});
            this.props.history.push("/teacherPortal");
          })
          .catch((errorObj) => {
            this.handleErrors(errorObj);
        });
      }
    ).catch(
      (errorObj) => {
        const err0 = errorObj.errors[0];
        this.setState({authErr: err0});
      }
    );
  }


    setStudent = (studentId) =>{
      this.setState({studentId:studentId});
    }

    removeStudentToTheExam = (id) =>{
      let students = this.state.students.filter((s)=>{
        return s.studentId !== id;
      });
      students.push(new SelectableStudent(id, false));
      students.sort(function (a, b) {
        return a.studentId - b.studentId;
      });
      this.setState({students: students});
   }

  
   


  render() {
    // compose value prop as object with user object and logout method
    const value = {
      authUser: this.state.authUser,
      authErr: this.state.authErr,
      loginUser: this.login,
      logoutUser: this.logout,
    };

  
    return (
      <AuthContext.Provider value={value}>

        <Container fluid id="bigContainer">
          <TopBar professorName={this.state.authUser==null ? "notLogged" : this.state.authUser.name} subjectName={this.state.authUser==null ? "notLogged" : this.state.authUser.subjectName} logged = {this.state.logged} studentId={this.state.studentId}/>
            <Switch>

              {/* Common routes */}

              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="/login">
                <LoginForm authUser = {this.state.authUser} authErr = {this.state.authErr}/>
              </Route>

              {/* Teacher routes */}

              <Route exact path="/teacherPortal">
                <TeacherPortal authUser = {this.state.authUser}/>
              </Route>

              <Route path="/teacherPortal/createAnExam">
                <CreateAnExam students={this.state.students} 
                removeStudentToTheExam= {this.removeStudentToTheExam} id={this.state.id} subjectName={this.state.subjectName} authUser = {this.state.authUser}/>
              </Route>

              <Route exact path="/teacherPortal/selectSlot">
                <SelectSlot id={this.state.id} authUser = {this.state.authUser}/>
              </Route>

              <Route path= '/teacherPortal/selectSlot/:slotId' render={(props) => {
              return (
                <OralResult slotId={props.match.params.slotId} id={this.state.id} authUser = {this.state.authUser} />
              );
            }}/>

              <Route path="/teacherPortal/studentsMarks">
                <StudentsMarks id={this.state.id} authUser = {this.state.authUser}/>
              </Route>

              {/* Student Routes */}
              
              <Route path="/studentAuthentication">
                <StudentAuthentication setStudent = {this.setStudent}/>
              </Route>

              <Route exact path="/studentPortal" >
                <StudentPortal studentId={this.state.studentId}/>
              </Route>

              <Route exact path="/studentPortal/examList">
                <ExamList studentId={this.state.studentId}/>
              </Route>

              <Route path="/studentPortal/examList/:examId" render={(props) => {
              return (
                <SlotList examId = {props.match.params.examId} studentId={this.state.studentId} />
              );
            }}/>

              <Route path="/studentPortal/viewBookedSlot">
                <ViewBookedSlot studentId={this.state.studentId}/>
              </Route>
              
            </Switch>
        </Container>
      </AuthContext.Provider>
    );
  }
}


export default withRouter(App);

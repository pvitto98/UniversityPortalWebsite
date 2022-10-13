
import SelectableStudent from './SelectableStudent';
import Slot from './Slot';
import BookableExam from './BookableExam';

const baseURL = "/api";

/* LOG IN/OUT API FUNCTIONS */
async function isAuthenticated(){
    let url = "/user";
    const response = await fetch(baseURL + url);
    const userJson = await response.json();
    if(response.ok){
        return userJson;
    } else {
        let err = {status: response.status, errObj:userJson};
        throw err;  // An object with the error coming from the server
    }
}

async function userLogin(username, password) {
    return new Promise((resolve, reject) => {
        fetch(baseURL + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: username, password: password}),
        }).then((response) => {
            if (response.ok) {
                response.json().then((user) => {
                    resolve(user);
                });
            } else {
                // analyze the cause of error
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

async function userLogout(username, password) {
    return new Promise((resolve, reject) => {
        fetch(baseURL + '/logout', {
            method: 'POST',
        }).then((response) => {
            if (response.ok) {
                resolve(null);
            } else {
                // analyze the cause of error
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        });
    });
}

/* App API FUNCTIONS */
async function getStudentsForAnExam(id){
    let url = "/students/";
    const response = await fetch (baseURL + url+ id);
    const studentsJson = await response.json();
    if(response.ok){
        let result = studentsJson.map((t)=> {
            let a = new SelectableStudent (t.studentId, false);
            return a;});
        return result;
    } else {
        let err = {status: response.status, errObj:studentsJson};
        throw err;  // An object with the error coming from the server
    }
} 


/* '/teacherPortal/createAnExam' (<CreateAnExam/>) API FUNCTIONS */
async function addExam(exam) {
    return new Promise((resolve, reject) => {
        fetch(baseURL + "/exams", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(exam),
        }).then( (response) => {
            if(response.ok) {
                response.json().then((x)=>{
                    resolve(x.examId);
                });
            } else {
                // analyze the cause of error
                response.json()
                .then( (obj) => {reject(obj);} ) // error msg in the response body
                .catch( (err) => {reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch( (err) => {reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

async function addStudentToTheExam(bookableExam) {
    return new Promise((resolve, reject) => {
        fetch(baseURL + "/bookableExams", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookableExam),
        }).then( (response) => {
            if(response.ok) {
                resolve(null);
            } else {
                // analyze the cause of error
                response.json()
                .then( (obj) => {reject(obj);} ) // error msg in the response body
                .catch( (err) => {reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        })
        .catch( (err) => {reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

async function addSession(session) {
    return new Promise((resolve, reject) => {
        fetch(baseURL + "/session", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(session),
        }).then( (response) => {
            if(response.ok) {
                response.json().then((x)=>{
                    resolve(x);
                });
            } else {
                // analyze the cause of error
                response.json()
                .then( (obj) => {reject(obj);} ) // error msg in the response body
                .catch( (err) => {reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        })
        .catch( (err) => {reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

async function addSlots(slots) {
    return new Promise((resolve, reject) => {
        fetch(baseURL + "/slots", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(slots),
        }).then( (response) => {
            if(response.ok) {
                response.json().then((x)=>{
                    resolve(x.slotId);
                });
            } else {
                // analyze the cause of error
                response.json()
                .then( (obj) => {reject(obj);} ) // error msg in the response body
                .catch( (err) => {reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        })
        .catch( (err) => {reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}


/* '/teacherPortal/selectSlot' (<SelectSlot/>) API FUNCTIONS */
async function getAllSlots(id) {
    let url = "/slots/"+ id;
        if(id==-1){
            return;
        }
    const response = await fetch(baseURL + url);
    const slotsJson = await response.json();
    if(response.ok){
        return slotsJson;
    } else {
        let err = {status: response.status, errObj:slotsJson};
        throw err;  // An object with the error coming from the server
    }
}


/* '/teacherPortal/selectSlot/:slotId' (<OralResult/>) API FUNCTIONS */
async function getSlot(slotId){
    let url = "/slot/"+slotId;
    const response = await fetch (baseURL + url);
    const slotJson = await response.json();
    if(response.ok){
        let result = new Slot(slotJson.slotId, slotJson.sessionId, slotJson.examId, slotJson.id, slotJson.startTime, slotJson.endTime,slotJson.bookedFrom,"","","");
        return result; 
        
    } else {
        let err = {status: response.status, errObj:slotJson};
        throw err;  // An object with the error coming from the server
    }
}

async function resultExam(exam) {
  
    return new Promise((resolve, reject) => {
        fetch(baseURL + "/examResult/", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(exam),
        }).then( (response) => {
            if(response.ok) {
            } else {
                // analyze the cause of error
                response.json()
                .then( (obj) => {reject(obj);} ) // error msg in the response body
                .catch( (err) => {reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch( (err) => {reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}


/* '/teacherPortal/studentsMarks' (<StudentsMarks/>) API FUNCTIONS */
async function getNotBooked(id) {
    let url = "/students/notBooked/"+ id;
    const response = await fetch(baseURL + url);
    const examsJson = await response.json();
    if(response.ok){
        return examsJson.map((t) =>{
           return new BookableExam(t.examId, t.id, t.studentId, t.state, t.mark,"","");
        } );
    } else {
        let err = {status: response.status, errObj:examsJson};
        throw err;  // An object with the error coming from the server
    }
}

async function getBooked(id) {
    let url = "/students/booked/"+ id;
    const response = await fetch(baseURL + url);
    const examsJson = await response.json();
    if(response.ok){
        return examsJson; 
    } else {
        let err = {status: response.status, errObj:examsJson};
        throw err;  // An object with the error coming from the server
    }
}



/* '/studentPortal/examList' (<ExamList/>) API FUNCTIONS */

async function getExamsOfAStudent(studentId) {
    let url = "/bookableExam/"+ studentId;
    const response = await fetch(baseURL + url);
    const examsJson = await response.json();
    if(response.ok){
        return examsJson.map((t) =>{
           return new BookableExam(t.examId, t.id, t.studentId, t.state, t.mark, t.examName,t.teacherName);
        } );
    } else {
        let err = {status: response.status, errObj:examsJson};
        throw err;  // An object with the error coming from the server
    }
}


async function getExamName(id) {
    let url = "/exams/"+id;
    const response = await fetch(baseURL + url);
    const examNameJson = await response.json();
    if(response.ok){
        return examNameJson;
    } else {
        let err = {status: response.status, errObj:examNameJson};
        throw err;  // An object with the error coming from the server
    }
}

/* '/studentPortal/examList/:examId' (<SlotList/>) API FUNCTIONS */
async function getBookableSlot(examId) {
    let url = "/bookableSlots/"+examId;
    const response = await fetch(baseURL + url);
    const slotsJson = await response.json();
    if(response.ok){
        return slotsJson;
    } else {
        let err = {status: response.status, errObj:slotsJson};
        throw err;  // An object with the error coming from the server
    }
}

/* '/studentPortal/examList/:examId' (<BookableSlot/>) API FUNCTIONS */
async function bookSlot(slot) {
    return new Promise((resolve, reject) => {
        fetch(baseURL + "/slots/book/", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(slot),
        }).then( (response) => {
            if(response.ok) {
            } else {
                // analyze the cause of error
                response.json()
                .then( (obj) => {reject(obj);} ) // error msg in the response body
                .catch( (err) => {reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch( (err) => {reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}


/* '/studentPortal/viewBookedSlot' (<ViewBookedSlot/>) API FUNCTIONS */
async function getStudentSlots(studentId) {
    let url = "/bookedSlots/"+studentId;
    const response = await fetch(baseURL + url);
    const slotsJson = await response.json();
    if(response.ok){
        return slotsJson;
    } else {
        let err = {status: response.status, errObj:slotsJson};
        throw err;  // An object with the error coming from the server
    }
}

/* '/studentPortal/viewBookedSlot' (<BookedSlot/>) API FUNCTIONS */
async function removeBooking(slot) {
    return new Promise((resolve, reject) => {
        fetch(baseURL + "/slots/removeBooking/", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(slot),
        }).then( (response) => {
            if(response.ok) {
            } else {
                // analyze the cause of error
                response.json()
                .then( (obj) => {reject(obj);} ) // error msg in the response body
                .catch( (err) => {reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch( (err) => {reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

/* '/studentAuthentication' (<StudentAuthentication/>) API FUNCTIONS */
async function checkStudent(studentId) {
    let url = "/checkStudent/"+studentId;
    const response = await fetch(baseURL + url);
    const studentJson = await response.json();
    if(response.ok){
        return studentJson;
    } else {
        let err = {status: response.status, errObj:studentJson};
        throw err;  // An object with the error coming from the server
    }
}


const API = { isAuthenticated, userLogin, userLogout, getStudentsForAnExam, addExam, 
    addStudentToTheExam, addSession, addSlots, getAllSlots, getSlot, resultExam, getExamsOfAStudent, getBookableSlot,
    bookSlot, getStudentSlots, removeBooking, getNotBooked, getBooked, checkStudent, getExamName} ;
export default API;
'use strict'

const db = require('./db');
const BookableExam = require('./bookableExam');
const Slot = require('./slot');

const createSlot = function (row) {
    return new Slot(row.slotId, row.sessionId, row.examId, row.id, row.startTime, row.endTime, row.bookedFrom,"","","");
}


//crea un esame e ritorna l'id
exports.createExam = function(exam) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO exams(id,subjectName) VALUES(?,?)';
        db.run(sql, [exam.id, exam.subjectName], function (err) {
            if(err){
                console.log(err);
                reject(err);
            }
            else{
                resolve(this.lastID);
            }
        });
    });
}


exports.createBookableExam = function(bookableExam) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO bookableExam(examId,id,studentId,state,mark) VALUES(?,?,?,?,?)';
        db.run(sql, [bookableExam.examId, bookableExam.id, bookableExam.studentId, bookableExam.state, bookableExam.mark], function (err) {
            if(err){
                console.log(err);
                reject(err);
            }
            else{
               resolve(this.lastID);
            }
        });
    });
}


exports.createSession = function(session) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO sessions(examId,id,day,startingTime, duration, slotsNumber, slotDuration) VALUES(?,?,?,?,?,?,?)';
        db.run(sql, [session.examId, session.id, session.day, session.startingTime, session.duration, session.slotsNumber, session.slotDuration], function (err) {
            if(err){
                console.log(err);
                reject(err);
            }
            else{
                let value = {"sessionId": this.lastID, "day": session.day, "startingTime": session.startingTime, "slotsNumber": session.slotsNumber, "slotDuration": session.slotDuration };
                resolve(value);
            }
        });
    });
}

exports.createSlots = function(slots) {
    return new Promise((resolve, reject) => {
        slots.map((slot)=>{
            const sql = 'INSERT INTO slots(sessionId, examId, id, startTime, endTime) VALUES(?,?,?,?,?)';
            db.run(sql, [slot.sessionId, slot.examId, slot.id, slot.startTime, slot.endTime], function (err) {
                if(err){
                    console.log(err);
                    reject(err);
                }
            });
        });
        resolve(null);
        })

}

exports.getSlots = function(id) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM slots,courseMember WHERE slots.id = ?  AND bookedFrom <> '-1' AND slots.bookedFrom == courseMember.studentId AND slots.id == courseMember.id AND passed == '0'";
        db.all(sql, [id], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                let slots = rows.map((row) =>{
                    return new Slot(row.slotId, row.sessionId, row.examId, row.id, row.startTime, row.endTime, row.bookedFrom, "", "","");});
                resolve(slots);
            }
        });
    });
}

exports.getSlot = function(slotId) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM slots WHERE slotId = ?";
        db.all(sql, [slotId], (err, rows) => {
            if (err) {
                reject(err);
            }
            else if(rows.length==0){
                resolve(undefined);
            } else {
                let slots= rows.map((row)=>new Slot(row.slotId, row.sessionId, row.examId, row.id, row.startTime, row.endTime, row.bookedFrom, "", "",""));
                resolve(slots[0]);
            }
               
            }
        );
    });
}

exports.resultExam = function(exam) {

    return new Promise((resolve, reject) => {
        
        const sql = 'UPDATE bookableExam SET state = ?, mark=? WHERE id== ? AND examId ==? AND studentId == ?';
        db.run(sql, [exam.state, exam.mark, exam.id, exam.examId, exam.studentId], function (err) {
            if(err){
                console.log(err);
                reject(err);
            }
        });
  
        const sql2 = 'UPDATE courseMember SET passed = 1 WHERE studentId = ? AND id = ?';
        if(exam.state == "PASSED" ){
            db.run(sql2, [exam.studentId, exam.id], function (err) {
                if(err){
                    console.log(err);
                    reject(err);
                }
                else{
                    resolve(this.lastID);
                }
            });
        }
    });
  }


exports.getMarks = function(id) {
    return new Promise((resolve, reject) => {
        const sql0 = "";
        db.all(sql0, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });

    });
}

exports.getNotBooked = function(id) {
    return new Promise((resolve, reject) => {
        const sql0 = "SELECT * FROM bookableExam WHERE id = ? AND state <> 'BOOKED'";
        db.all(sql0, [id], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                console.log(rows);
                resolve(rows);
            }
        });

    });
}

exports.getBooked = function(id) {
    return new Promise((resolve, reject) => {
        const sql0 = "SELECT * FROM bookableExam, slots WHERE bookableExam.state == 'BOOKED' AND bookableExam.id = ? AND bookableExam.studentId == slots.bookedFrom AND slots.examId == bookableExam.examId";
        db.all(sql0, [id], (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log(rows);
                resolve(rows);
            }
        });

    });
}

exports.getStudentsForAnExam = function(id) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT studentId FROM courseMember WHERE id = ? AND passed = 0";
        db.all(sql, [id], (err, rows) => {
            if (err){ 
                reject(err);
            }
            else if (rows.length == 0){
                resolve(undefined);
            }
            else{
                resolve(rows);
            }
        });
    });
}

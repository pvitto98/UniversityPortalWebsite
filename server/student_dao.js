'use strict'

const db = require('./db');
const Student = require('./student');
const Slot = require('./slot');
const BookableExam = require('./bookableExam');


exports.checkStudent = function(studentId) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM students WHERE studentId = ?";
        db.all(sql, [studentId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

exports.removeBooking = function(slot){
    return new Promise((resolve, reject) => {

        const sql1 = 'UPDATE slots SET bookedFrom = -1 WHERE slotId = ?'
        db.run(sql1, [slot.slotId], function (err) {
            if(err){
                console.log(err);
                reject(err);
            }
        });
        const sql2 = 'UPDATE bookableExam SET state= "NOT BOOKED" WHERE examId = ? AND studentId = ?'
        db.run(sql2, [slot.examId, slot.bookedFrom], function (err) {
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

exports.getStudentSlots = function(studentId) {
    return new Promise((resolve, reject) => {
        const sql0 = "SELECT * FROM bookableExam, slots, users WHERE bookableExam.studentId == ? AND slots.bookedFrom == ? AND bookableExam.examId == slots.examId AND bookableExam.state <> 'NOT BOOKED' AND users.id = slots.id";
        db.all(sql0, [studentId,studentId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                let slots= rows.map((row)=>new Slot(row.slotId, row.sessionId, row.examId, row.id, row.startTime, row.endTime, row.bookedFrom, row.subjectName, row.name, row.state));
                resolve(slots);
            }
        });

    });
}

exports.bookASlot = function(slot){
    return new Promise((resolve, reject) => {
        const sql1 = 'UPDATE slots SET bookedFrom = ? WHERE slotId = ?'
        db.run(sql1, [slot.bookedFrom, slot.slotId], function (err) {
            if(err){
                console.log(err);
                reject(err);
            }
        });
        const sql2 = 'UPDATE bookableExam SET state= "BOOKED" WHERE examId = ? AND studentId = ?'
        db.run(sql2, [slot.examId, slot.bookedFrom], function (err) {
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

exports.getBookableSlot = function(examId) {
    return new Promise((resolve, reject) => {
        const sql0 = "SELECT * FROM slots, users WHERE users.id = slots.id AND examId = ? AND bookedFrom=-1 ";
        db.all(sql0, [examId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                let slots= rows.map((row)=>new Slot(row.slotId, row.sessionId, row.examId, row.id, row.startTime, row.endTime, row.bookedFrom, row.subjectName, row.name,""));
                resolve(slots);
            }
        });

    });
}


exports.getExamsOfAStudent = function(studentId) {
    return new Promise((resolve, reject) => {
const sql = "SELECT * FROM bookableExam, users, courseMember WHERE bookableExam.studentId = ? AND state == 'NOT BOOKED' AND bookableExam.id == users.id AND bookableExam.id == courseMember.id AND bookableExam.studentId = courseMember.studentId AND passed == '0' AND examId IN (SELECT examId FROM slots WHERE slots.bookedFrom == -1 GROUP BY examId HAVING COUNT(*)>0)";
        db.all(sql, [studentId], (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                let exams = rows.map((row)=>new BookableExam(row.examId, row.id, row.studentId, row.state, row.mark, row.subjectName, row.name));
                resolve(exams);
            }
        });

    });
}
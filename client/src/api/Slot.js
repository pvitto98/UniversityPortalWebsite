class Slot {
    constructor(slotId, sessionId, examId, id, startTime, endTime, bookedFrom, examName, teacherName, state){
        if(slotId){
            this.slotId = slotId;
        }
        if(sessionId){
            this.sessionId = sessionId;
        }
        if(examId){
            this.examId = examId;
        }
        this.id = id;
        if(startTime !== undefined){
            this.startTime = startTime;
        }
        if(endTime !== undefined){
            this.endTime = endTime;
        }
        this.bookedFrom = bookedFrom;
        this.examName = examName;
        this.teacherName = teacherName;
        this.state = state;
    }
}

export default Slot;
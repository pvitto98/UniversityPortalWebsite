import moment from 'moment';
class Session {
    constructor(sessionId, examId, id, day, startingTime, duration, slotsNumber, slotDuration){
        if(sessionId){
            this.sessionId = sessionId;
        }
        if(examId){
            this.examId = examId;
        }
        this.id = id;
        if(day !== undefined){
            this.day = moment(day)
        }
        this.startingTime = startingTime;
        this.duration=duration;
        if(slotsNumber){
            this.slotsNumber = slotsNumber;
        }
        if(slotDuration){
            this.slotDuration = slotDuration;
        }
    }

}

export default Session;
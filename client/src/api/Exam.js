
class Exam{    
    constructor(examId, id, subjectName ) {
        
        if(examId)
            this.examId = examId;

        this.id = id;
        this.subjectName= subjectName;
    }
}

export default Exam;
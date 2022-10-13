class BookableExam{    
    constructor(examId, id, studentId, state, mark,examName, teacherName ) {
       
        this.examId = examId;
        this.id = id;
        this.studentId = studentId;
        this.state = state;
        this.mark = mark;
        this.examName = examName;
        this.teacherName= teacherName;
    }
}

export default BookableExam;
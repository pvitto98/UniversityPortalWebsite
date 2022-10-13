const express = require("express");
const userDao = require("./user_dao");
const examDao = require("./exam_dao");
const morgan = require("morgan"); // logging middleware
const jwt = require("express-jwt");
const jsonwebtoken = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const jwtSecret =
  "1234";
const expireTime = 300; //seconds
// Authorization error
const authErrorObj = {
  errors: [{ param: "Server", msg: "Authorization error" }],
};
const studentDao = require('./student_dao.js');

const PORT = 3001;
const app = new express();

// Set-up logging
app.use(morgan("tiny"));

// Process body content
app.use(express.json());

/* LOG IN/OUT API FUNCTIONS */
// Authentication endpoint
app.post("/api/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  userDao
    .getUser(username)
    .then((user) => {
      if (user === undefined) {
        res.status(404).send({
          errors: [{ param: "Server", msg: "Invalid e-mail" }],
        });
      } else {
        if (!userDao.checkPassword(user, password)) {
          res.status(401).send({
            errors: [{ param: "Server", msg: "Wrong password" }],
          });
        } else {
          //AUTHENTICATION SUCCESS
          const token = jsonwebtoken.sign({ user: user.id }, jwtSecret, {
            expiresIn: expireTime,
          });
          res.cookie("token", token, {
            httpOnly: true,
            sameSite: true,
            maxAge: 1000 * expireTime,
          });
          res.json({ id: user.id, name: user.name, email: user.email, subjectName: user.subjectName });
        }
      }
    })
    .catch(
      // Delay response when wrong user/pass is sent to avoid fast guessing attempts
      (err) => {
        new Promise((resolve) => {
          setTimeout(resolve, 1000);
        }).then(() => res.status(401).json(authErrorObj));
      }
    );
});

app.use(cookieParser());

app.post("/api/logout", (req, res) => {
  res.clearCookie("token").end();
});

///////FUNCTION WITHOUT AUTHENTICATION


/* '/studentPortal/examList' (<ExamList/>) API FUNCTIONS */
app.get('/api/bookableExam/:studentId', (req, res) => {
  studentDao.getExamsOfAStudent(req.params.studentId)
    .then((exams) => {
    res.json(exams);
}) .catch((err) => {
          res.status(500).json({
              errors: [{'param': 'Server', 'msg': err}],
          });
      });
});


/* '/studentPortal/examList/:examId' (<SlotList/>) API FUNCTIONS */
app.get('/api/bookableSlots/:examId', (req, res) => {
  studentDao.getBookableSlot(req.params.examId)
    .then((slots) => {
    res.json(slots);
}) .catch((err) => {
          res.status(500).json({
              errors: [{'param': 'Server', 'msg': err}],
          });
      });
});

/* '/studentPortal/examList/:examId' (<BookableSlot/>) API FUNCTIONS */
app.put('/api/slots/book/', (req,res) => {
  if(req.body.id<0){
      res.status(400).end();
  } else {
      const slot = req.body;
      studentDao.bookASlot(slot)
      .then((slotId) => {
        res.status(201).json({"slotId" : slotId});
      })
      .catch((err) => res.status(500).json({
        errors: [{'param': 'Server', 'msg': err}],
      }));
  }
});


/* '/studentPortal/viewBookedSlot' (<ViewBookedSlot/>) API FUNCTIONS */
app.get('/api/bookedSlots/:studentId', (req, res) => {
  studentDao.getStudentSlots(req.params.studentId)
    .then((slots) => {
    res.json(slots);
}) .catch((err) => {
          res.status(500).json({
              errors: [{'param': 'Server', 'msg': err}],
          });
      });
});

/* '/studentPortal/viewBookedSlot' (<BookedSlot/>) API FUNCTIONS */
app.put('/api/slots/removeBooking/', (req,res) => {
  if(req.body.id<0){
      res.status(400).end();
  } else {
      const slot = req.body;
      //PARTE USER
      studentDao.removeBooking(slot)
      .then((slotId) => {
        res.status(201).json({"slotId" : slotId});
      })
      .catch((err) => res.status(500).json({
        errors: [{'param': 'Server', 'msg': err}],
      }));
  }
});

/* '/studentAuthentication' (<StudentAuthentication/>) API FUNCTIONS */

app.get('/api/checkStudent/:studentId', (req, res) => {
  studentDao.checkStudent(req.params.studentId)
    .then((students) => {
    res.json(students);
}) .catch((err) => {
          res.status(500).json({
              errors: [{'param': 'Server', 'msg': err}],
          });
      });
});


// For the rest of the code, all APIs require authentication
app.use(
  jwt({
    secret: jwtSecret,
    getToken: (req) => req.cookies.token,
    algorithms: ['HS256']
  })
);

// To return a better object in case of errors
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json(authErrorObj);
  }
});

/* App API FUNCTIONS */
app.get('/api/students/:id',(req,res)=>{
  examDao.getStudentsForAnExam(req.params.id)
  .then((students)=>{
      if(!students){
          res.status(404).send();

      } else {
          res.json(students);
      }
  })
  .catch((err) => {
      res.status(500).json({
          errors: [{'param': 'Server', 'msg': err}],
      });
  });
});


/* '/teacherPortal/createAnExam' (<CreateAnExam/>) API FUNCTIONS */
app.post('/api/exams', (req,res) => {
  const exam = req.body;
  if(!exam){
      res.status(400).end();
  } else {
      examDao.createExam(exam)
          .then((examId) => {
            res.status(201).json({"examId" : examId});
          })
          .catch((err) => {
              console.log(err);
              res.status(500).json({errors: [{'param': 'Server', 'msg': err}],})
          });
  }
});


app.post('/api/bookableExams', (req,res) => {
  const bookableExam = req.body;
  if(!bookableExam){
      res.status(400).end();
  } else {
      examDao.createBookableExam(bookableExam)
      .then((examId) => {
        res.status(201);
      })
      .catch((err) => {
          res.status(500).json({errors: [{'param': 'Server', 'msg': err}],})
      });
  }
});

app.post('/api/session', (req,res) => {
  const session = req.body;
  if(!session){
      res.status(400).end();
  } else {
      examDao.createSession(session)
      .then((s) => {
        res.status(201).json(s);
      })
      .catch((err) => {
          res.status(500).json({errors: [{'param': 'Server', 'msg': err}],})
      });
  }
});

app.post('/api/slots', (req,res) => {
  const slots = req.body;
  if(!slots){
      res.status(400).end();
  } else {
      examDao.createSlots(slots)
      .then((slotId) => {
        res.status(201).json({"slotId" : slotId});
      })
      .catch((err) => {
          res.status(500).json({errors: [{'param': 'Server', 'msg': err}],})
      });
  }
});

/* '/teacherPortal/selectSlot' (<SelectSlot/>) API FUNCTIONS */
app.get('/api/slots/:id', (req, res) => {
  examDao.getSlots(req.params.id)
    .then((slots) => {
    res.json(slots);
}) .catch((err) => {
          res.status(500).json({
              errors: [{'param': 'Server', 'msg': err}],
          });
      });
});

/* '/teacherPortal/selectSlot/:slotId' (<OralResult/>) API FUNCTIONS */
app.get('/api/slot/:slotId', (req, res) => {
  examDao.getSlot(req.params.slotId)
    .then((slot) => {
    res.json(slot);
}) .catch((err) => {
          res.status(500).json({
              errors: [{'param': 'Server', 'msg': err}],
          });
      });
});

app.put('/api/examResult/', (req,res) => {
  if(req.body.id<0){
      res.status(400).end();
  } else {
      const exam = req.body;
      examDao.resultExam(exam)
      .then((result) => res.status(200).end())
      .catch((err) => res.status(500).json({
          errors: [{'param': 'Server', 'msg': err}],
      }));
  }
});

/* '/teacherPortal/studentsMarks' (<StudentsMarks/>) API FUNCTIONS */

app.get('/api/students/notBooked/:id', (req, res) => {
  examDao.getNotBooked(req.params.id)
    .then((exams) => {
    res.json(exams);
}) .catch((err) => {
          res.status(500).json({
              errors: [{'param': 'Server', 'msg': err}],
          });
      });
});

app.get('/api/students/booked/:id', (req, res) => {
  examDao.getBooked(req.params.id)
    .then((exams) => {
    res.json(exams);
}) .catch((err) => {
          res.status(500).json({
              errors: [{'param': 'Server', 'msg': err}],
          });
      });
});




// AUTHENTICATED REST API endpoints

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}/`)
);
